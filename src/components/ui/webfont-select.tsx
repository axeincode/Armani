import React, { useEffect, useState } from "react";
import { useWebFontLoader } from "@/hooks/useWebFontLoader";
import { fontFaceTypes } from "./types/font-face-types";

type WebFontSelectProps = {
  font: string;
  fontFaces: fontFaceTypes[];
  value: string;
  onChange: (e: string) => void;
};

export const WebFontSelect = ({
  font,
  fontFaces,
  value = "none",
  onChange,
}: WebFontSelectProps) => {
  const { fontsLoaded, isLoading } = useWebFontLoader();

  return (
    <select
      id="countries"
      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      <option value="none">Font Type</option>
      {fontsLoaded &&
        fontFaces.map((font: fontFaceTypes) => (
          <option key={font.fontFamily} value={font.fontFamily}>
            {font.fontFamily}
          </option>
        ))}
    </select>
  );
};
