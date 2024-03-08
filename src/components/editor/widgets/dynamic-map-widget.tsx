"use client";
import dynamic from "next/dynamic";

export const MapWidget = dynamic(() => import("./map-widget"), {
  ssr: false,
});
