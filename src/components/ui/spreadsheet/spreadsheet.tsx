"use client";
import React from "react";
import { Textarea, Typography } from "@material-tailwind/react";
import { get } from "lodash";
import { DynamicWorkBookManager } from "@/components/view/excel-utils/DynamiExcelUtility";
import { DocumentTypeEnum } from "@/types/editor.types";
import isEmpty from "lodash/isEmpty";

export interface SpreadSheetWidgetProps {
  data?: any;
  isView?: boolean;
}
export const SpreadSheetWidget = ({ data, isView }: SpreadSheetWidgetProps) => {
  const spxData = get(data, "data", { id: "", name: "", url: "", docType: "" });

  return (
    <div className="flex flex-grow w-full">
      {(isEmpty(spxData) || spxData.docType !== DocumentTypeEnum.XLSX) && (
        <>
          <Typography variant="h6">No Data</Typography>
        </>
      )}
      {spxData && spxData.docType === DocumentTypeEnum.XLSX && (
        <DynamicWorkBookManager
          selectedDocument={spxData}
          handler={() => {}}
          open={true}
          isView={true}
        />
      )}
    </div>
  );
};
