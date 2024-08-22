"use client";
import React from "react";
import { Textarea, Typography } from "@material-tailwind/react";
import { get } from "lodash";
import { DynamicDocViewerManager } from "@/components/view/document-viewer/dynamic-docviewer";
import { DocumentTypeEnum } from "@/types/editor.types";
import isEmpty from "lodash/isEmpty";

export interface PdfWidgetProps {
  data?: any;
  isView?: boolean;
}
export const PdfWidget = ({ data, isView }: PdfWidgetProps) => {
  const spxData = get(data, "data", { id: "", name: "", url: "", docType: "" });

  return (
    <div className="flex flex-grow w-full">
      {(isEmpty(spxData) || spxData.docType !== DocumentTypeEnum.PDF) && (
        <>
          <Typography variant="h6">No Data</Typography>
        </>
      )}
      {spxData && spxData.docType === DocumentTypeEnum.PDF && (
        <DynamicDocViewerManager
          selectedDocument={spxData}
          handler={() => {}}
          open={true}
          isView={true}
        />
      )}
    </div>
  );
};
