import { isEmpty, get } from "lodash";
import React from "react";
import { InlineWidget } from "react-calendly";

export interface ReactCalendlyProps {
  data?: any;
}

export const ReactCalendly = ({ data }: ReactCalendlyProps) => {
  const dataUrl = get(data, "data.url", "");
  return (
    <div className="w-full h-fit relative">
      {dataUrl && !isEmpty(dataUrl) && <InlineWidget url={dataUrl || ""} />}
    </div>
  );
};

//./ https://calendly.com/irfan-dev08
