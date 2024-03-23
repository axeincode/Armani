"use client";
import { DynamicTable } from "@/components/dynamicTable";
import { WidgetElement } from "@/types";
import { WidgetTypes } from "@/types/editor.types";
import { useSelectedWidgetRepo, useObservable } from "@/store";
import { find } from "lodash";

export type TableWidgetProps = {
  data: WidgetTypes;
};

export const TableWidget: React.FC<TableWidgetProps> = (props) => {
  const { data } = props;
  const selectedWidgetObs$ = useSelectedWidgetRepo();
  const selectedWidgetState = useObservable(selectedWidgetObs$.getObservable());
  const widgetData =
    find(selectedWidgetState, (widget) => widget?.id === data.id) || {};
  return (
    <DynamicTable
      data-widget={WidgetElement.TABLE}
      data-widget-id={data.id}
      data={widgetData}
    />
  );
};
