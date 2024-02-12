"use client";
import { useCallback } from "react";
import {
  IgrExcelXlsxModule,
  IgrExcelModule,
  IgrExcelCoreModule,
} from "igniteui-react-excel";
import { IgrSpreadsheetModule } from "igniteui-react-spreadsheet";
import { saveAs } from "file-saver";
import { Workbook } from "igniteui-react-excel";
import { WorkbookFormat } from "igniteui-react-excel";
import { WorkbookSaveOptions } from "igniteui-react-excel";
import { WorkbookLoadOptions } from "igniteui-react-excel";
import { updateDocument } from "@/lib/firebase/storage";
import { DocumentTypes } from "@/types/editor.types";
IgrExcelCoreModule.register();
IgrExcelModule.register();
IgrExcelXlsxModule.register();
IgrSpreadsheetModule.register();

function useExcelUtility() {
  const getExtension = useCallback((format: WorkbookFormat): string => {
    switch (format) {
      case WorkbookFormat.StrictOpenXml:
      case WorkbookFormat.Excel2007:
        return ".xlsx";
      case WorkbookFormat.Excel2007MacroEnabled:
        return ".xlsm";
      case WorkbookFormat.Excel2007MacroEnabledTemplate:
        return ".xltm";
      case WorkbookFormat.Excel2007Template:
        return ".xltx";
      case WorkbookFormat.Excel97To2003:
        return ".xls";
      case WorkbookFormat.Excel97To2003Template:
        return ".xlt";
    }
  }, []);

  const load = useCallback((file: File): Promise<Workbook> => {
    return new Promise<Workbook>((resolve, reject) => {
      readFileAsUint8Array(file).then(
        (a) => {
          Workbook.load(
            a,
            new WorkbookLoadOptions(),
            (w) => {
              resolve(w);
            },
            (e) => {
              reject(e);
            }
          );
        },
        (e) => {
          reject(e);
        }
      );
    });
  }, []);

  const loadFromUrl = useCallback((url: string): Promise<Workbook> => {
    return new Promise<Workbook>((resolve, reject) => {
      const req = new XMLHttpRequest();
      req.open("GET", url, true);
      req.responseType = "arraybuffer";
      req.onload = (d): void => {
        const data = new Uint8Array(req.response);
        Workbook.load(
          data,
          new WorkbookLoadOptions(),
          (w) => {
            resolve(w);
          },
          (e) => {
            reject(e);
          }
        );
      };
      req.send();
    });
  }, []);

  const save = useCallback(
    (
      workbook: Workbook,
      fileNameWithoutExtension: string,
      doc: DocumentTypes
    ): Promise<string> => {
      return new Promise<string>((resolve, reject) => {
        const opt = new WorkbookSaveOptions();
        opt.type = "blob";

        workbook.save(
          opt,
          (d) => {
            const fileExt = getExtension(workbook.currentFormat);
            const fileName = fileNameWithoutExtension + fileExt;
            // saveAs(d as Blob, fileName);
            updateDocument(doc.id, doc.name, d as Blob);
            resolve(fileName);
          },
          (e) => {
            reject(e);
          }
        );
      });
    },
    []
  );

  const readFileAsUint8Array = useCallback(
    (file: File): Promise<Uint8Array> => {
      return new Promise<Uint8Array>((resolve, reject) => {
        const fr = new FileReader();
        fr.onerror = (e): void => {
          reject(fr.error);
        };

        if (fr.readAsBinaryString) {
          fr.onload = (e): void => {
            const rs = (fr as any).resultString;
            const str: string = rs != null ? rs : fr.result;
            const result = new Uint8Array(str.length);
            for (let i = 0; i < str.length; i++) {
              result[i] = str.charCodeAt(i);
            }
            resolve(result);
          };
          fr.readAsBinaryString(file);
        } else {
          fr.onload = (e): void => {
            resolve(new Uint8Array(fr.result as ArrayBuffer));
          };
          fr.readAsArrayBuffer(file);
        }
      });
    },
    []
  );

  return {
    getExtension,
    load,
    loadFromUrl,
    save,
    readFileAsUint8Array,
  };
}

export default useExcelUtility;
