import React from "react";
import { WidgetTypes } from "@/types/editor.types";
import { isEmpty, isEqual, get } from "lodash";
import {
  useSelectedWidgetRepo,
  useObservable,
  useEditorObserveable,
} from "@/store";
import { useEditorWidgetObserveable } from "@/hooks/useEditorWidgetsObserveable";
import { useCurrentWidgetObserveable } from "@/hooks/useCurrentWidgetObserveable";
import { makeData } from "./helper.utils";
import ReactTableViewWidget from "./react-table-view-widget";

export type ReactTableWidgetProps = {
  data: WidgetTypes;
};

const MemoziedTableWidget = (props: ReactTableWidgetProps) => {
  const { data: widgetData } = props;
  let tableData = get(widgetData, "data.tableData", []);

  console.log("table data given", tableData);

  if (isEmpty(tableData)) {
    tableData = makeData() as unknown as any[];
  }

  return (
    <ReactTableViewWidget
      data={tableData}
      // Other props...
    />
  );
};

const areEqual = (prevProps: any, nextProps: any) => {
  return isEqual(prevProps.data, nextProps.data);
};

export default React.memo(MemoziedTableWidget, areEqual);
