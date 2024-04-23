"use client";
import React from "react";
import { Spinner, Button } from "@material-tailwind/react";
import { IgrSpreadsheet } from "igniteui-react-spreadsheet";
import useExcelUtility from "./useExcelUtility";
import { DocumentTypes } from "@/types/editor.types";

export type ViewWorkBookManagerProps = {
  open: boolean;
  selectedDocument: DocumentTypes;
  handler: () => void;
  isView?: boolean;
};

const ViewWorkBookManager = ({
  open,
  selectedDocument,
  handler,
  isView,
}: ViewWorkBookManagerProps) => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [isError, setIsError] = React.useState(false);
  const spreadsheetRef = React.useRef<IgrSpreadsheet>(null);
  const ExcelUtility = useExcelUtility();

  React.useEffect(() => {
    if (spreadsheetRef.current && open) {
      const url = selectedDocument.url;
      setIsLoading(true);
      // const url =
      //   "https://static.infragistics.com/xplatform/excel/SalesData.xlsx";
      ExcelUtility.loadFromUrl(url)
        .then((workbook) => {
          if (spreadsheetRef.current?.workbook) {
            spreadsheetRef.current.workbook = workbook;
          }
        })
        .catch((error) => {
          setIsError(true);
          setIsLoading(false);
        });
      setIsLoading(false);
    }
  }, [selectedDocument, open, ExcelUtility, spreadsheetRef]);

  return (
    <div className="h-full w-full">
      {isLoading && (
        <div className="flex items-center justify-center h-12">
          <Spinner color="light-blue" className="h-12 w-12" />
        </div>
      )}
      {isError && (
        <div className="flex items-center justify-center h-12">
          <span>Failed to load workbook</span>
        </div>
      )}
      <IgrSpreadsheet
        ref={spreadsheetRef}
        height="calc(100% - 30px)"
        width="100%"
      />
      {!isView && (
        <>
          <div className="flex flex-grow gap-2 justify-end">
            <Button
              variant="text"
              color="red"
              onClick={handler}
              className="mr-1"
            >
              <span>Cancel</span>
            </Button>
            <Button
              variant="gradient"
              color="green"
              onClick={() => {
                if (spreadsheetRef.current?.workbook) {
                  ExcelUtility.save(
                    spreadsheetRef.current.workbook,
                    selectedDocument.name,
                    selectedDocument
                  );
                }
              }}
            >
              <span>Save</span>
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default ViewWorkBookManager;
