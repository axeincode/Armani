"use client";
import { CommonChartComponent } from "@/components/ui/charts/dynamic-charts";
import { WidgetElement } from "@/types";
import { WidgetTypes } from "@/types/editor.types";
import { useSelectedWidgetRepo, useObservable } from "@/store";
import { get, isEmpty, map } from "lodash";

//add widget
export type PieWidgetProps = {
  data: WidgetTypes;
};
export const PieChartWidget: React.FC<PieWidgetProps> = (props) => {
  const { data } = props;
  const widgetData = get(data, "data", {});
  const keys = map(
    widgetData,
    (data: { key: string; value: string }) => data?.key
  );
  const seriesdata = map(widgetData, (data: { key: string; value: string }) =>
    parseInt(data?.value)
  );
  const options: any = {
    chart: {
      type: "pie",
      height: 550,
    },
    labels: !isEmpty(keys)
      ? keys
      : ["Category 1", "Category 2", "Category 3", "Category 4"],
  };

  const series: any = !isEmpty(seriesdata) ? seriesdata : [44, 55, 13, 33];
  return (
    <CommonChartComponent
      data-widget={WidgetElement.CHART}
      data-widget-id={data.id}
      chartType="pie"
      chartOptions={options}
      series={series}
    />
  );
};
