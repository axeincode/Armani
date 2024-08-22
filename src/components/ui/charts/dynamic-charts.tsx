"use client";
import dynamic from "next/dynamic";

export const CommonChartComponent = dynamic(() => import("./commonChart"), {
  ssr: false,
});
