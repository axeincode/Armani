"use client";
import { CommonChartComponent } from "@/components/ui/charts/dynamic-charts";
import { WidgetElement } from "@/types";
import { WidgetTypes } from "@/types/editor.types";
import {
  useSelectedWidgetRepo,
  useObservable,
  useEditorObserveable,
} from "@/store";
import { useEditorWidgetObserveable } from "@/hooks/useEditorWidgetsObserveable";
import { useCurrentWidgetObserveable } from "@/hooks/useCurrentWidgetObserveable";
import { find, get, isEmpty } from "lodash";

//add widget
export type BarWidgetProps = {
  data: WidgetTypes;
};
export const BarChartWidget: React.FC<BarWidgetProps> = (props) => {
  const { data } = props;
  const selectedWidgetObs$ = useSelectedWidgetRepo();
  const selectedWidgetState = useObservable(selectedWidgetObs$.getObservable());
  const editorWidgetState = useEditorWidgetObserveable(
    selectedWidgetState.widgetId
  );

  const series = get(data, "data.series", [
    {
      name: "Series 1",
      data: [30, 40, 45, 50, 49, 60, 70, 91],
    },
    {
      name: "Series 2",
      data: [10, 30, 35, 40, 39, 50, 60, 81],
    },
  ]);
  const categories = get(data, "data.categories", [
    "cat1",
    "cat2",
    "cat3",
    "cat4",
    "cat5",
    "cat6",
    "cat7",
    "cat8",
  ]);

  const options: any = {
    chart: {
      type: "bar",
      height: 350,
    },
    xaxis: {
      categories: categories,
    },
  };

  return (
    <CommonChartComponent
      data-widget={WidgetElement.CHART}
      data-widget-id={data.id}
      chartType="bar"
      chartOptions={options}
      series={series}
    />
  );
};
