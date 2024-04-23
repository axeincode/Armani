import React from "react";
import { Textarea, Typography } from "@material-tailwind/react";
import { get } from "lodash";

export interface TextWidgetProps {
  data?: any;
  isView?: boolean;
}
export const TextWidget = ({ data, isView }: TextWidgetProps) => {
  const txtData = get(data, "data", { id: 0, text: "" });

  return (
    <div className="flex flex-grow w-full">
      {!isView && (
        <Textarea className="flex flex-grow relative" value={txtData.text} />
      )}
      {isView && (
        <Typography
          variant="small"
          color="blue-gray"
          data-id="INTERNAL_WIDGET"
          className="m-1"
        >
          {txtData.text || "..."}
        </Typography>
      )}
    </div>
  );
};
