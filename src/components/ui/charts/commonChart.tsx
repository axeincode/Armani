"use client";
import React from "react";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

//add this to commit
interface seriesType {
  type:
    | "line"
    | "area"
    | "bar"
    | "pie"
    | "donut"
    | "radialBar"
    | "scatter"
    | "bubble"
    | "heatmap"
    | "candlestick"
    | "boxPlot"
    | "radar"
    | "polarArea"
    | "rangeBar"
    | "rangeArea"
    | "treemap";
}
interface CommonChartProps {
  chartType: seriesType["type"];
  chartOptions: ApexOptions;
  series: ApexOptions["series"];
}

const CommonChartComponent: React.FC<CommonChartProps> = ({
  chartType,
  chartOptions,
  series,
}) => {
  return (
    <div>
      <ReactApexChart
        options={chartOptions}
        series={series}
        type={chartType}
        height={350}
      />
    </div>
  );
};

export default CommonChartComponent;
