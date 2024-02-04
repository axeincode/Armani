"use client";
import React from "react";
import { DesignEditTools } from "./editortools/design-edit-tools";
import { BannerEditTools } from "./editortools/banner-edit-tools";
import { SectionEditTools } from "./editortools/sections-edit-tool";
import { DataRoomEditTools } from "./editortools/data-room-edit-tools";

// Import Swiper styles
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { ExtrasTools } from "./editortools/extras-tools";

export const EditorTools = () => {
  return (
    <div className="flex w-full h-32">
      <div className="flex flex-grow rounded border-solid border-2 border-gray-500 bg-black">
        {/** banner editor etc */}
        <BannerEditTools />
        {/** sidebar sections editing */}
        <SectionEditTools />
        {/** data room editing */}
        <DataRoomEditTools />
        <ExtrasTools />
      </div>
    </div>
  );
};
