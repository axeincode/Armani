import React from "react";
import { Textarea, Typography } from "@material-tailwind/react";
import { get, isEmpty } from "lodash";

export interface TextWidgetProps {
  data?: any;
  isView?: boolean;
}
export const TextWidget = ({ data, isView }: TextWidgetProps) => {
  const txtData = get(data, "data", { id: 0, text: "", title: "" });

  return (
    <div className="flex flex-col flex-grow w-full gap-2">
      {!isView && (
        <>
          {!isEmpty(txtData.title) && (
            <Typography
              variant="h6"
              color="blue-gray"
              data-id="INTERNAL_WIDGET"
              className="m-1"
            >
              {txtData.title || ""}
            </Typography>
          )}
          <Textarea className="flex flex-grow relative" value={txtData.text} />
        </>
      )}
      {isView && (
        <>
          {!isEmpty(txtData.title) && (
            <Typography
              variant="h6"
              color="blue-gray"
              data-id="INTERNAL_WIDGET"
              className="m-1"
            >
              {txtData.title || ""}
            </Typography>
          )}
          <Typography
            variant="small"
            color="blue-gray"
            data-id="INTERNAL_WIDGET"
            className="m-1"
          >
            {txtData.text || "..."}
          </Typography>
        </>
      )}
    </div>
  );
};
