"use client";
import dynamic from "next/dynamic";

export const DynamicDocViewerManager = dynamic(
  () => import("./document-viewer"),
  {
    ssr: false,
  }
);
