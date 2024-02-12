"use client";
import dynamic from "next/dynamic";

export const DynamicWorkBookManager = dynamic(
  () => import("./view-workbook-manager"),
  {
    ssr: false,
  }
);
