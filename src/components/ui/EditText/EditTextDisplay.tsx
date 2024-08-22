import React from "react";
import { Typography } from "@material-tailwind/react";

export type EditTextDisplayProps = {
  value?: any;
  variant?: any;
};

export const EditTextDisplay = (props: EditTextDisplayProps) => {
  return (
    <Typography
      variant={props.variant || "small"}
      color="blue-gray"
      data-id="INTERNAL_WIDGET"
      className="m-1 text-wrap z-50"
    >
      {props.value || ""}
    </Typography>
  );
};
