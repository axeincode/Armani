import React from "react";
import { RenderWidgetItem } from "./render-widget";
import { cn } from "@/lib/utils";

export const GridItemView = ({
  data,
  className,
  root,
  title,
  children,
  ...props
}: any) => {
  return (
    <div
      key={data.i}
      className={cn("flex flex-1 flex-col", className)}
      data-widgetid={data.i}
      {...props}
    >
      <RenderWidgetItem id={data.i} />
    </div>
  );
};
