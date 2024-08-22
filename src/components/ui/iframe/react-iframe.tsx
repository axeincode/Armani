"use client";
import { get } from "lodash";
import React from "react";
import Iframe from "react-iframe";
export interface ReactIFrameProps {
  data?: any;
}

export const ReactIFrame = ({ data }: ReactIFrameProps) => {
  const videoData = get(data, "data", { id: 0, url: "" });

  return (
    <div className="flex flex-grow">
      <Iframe
        className="flex flex-grow relative"
        url={videoData.url || "https://www.youtube.com/watch?v=ysz5S6PUM-U"}
        width="100%"
        height="100%"
      />
    </div>
  );
};
