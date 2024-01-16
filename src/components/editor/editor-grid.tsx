"use client";
import React from "react";
import { EditorSidebar } from "./editor-sidebar";
import { EditorMainArea } from "./editor-main-area";
import { EditorTopNav } from "./editor-top-nav";

export const EditorGrid = () => {
  return (
    <div className="flex flex-grow">
      <div className="flex flex-col flex-grow ">
        <EditorTopNav />
        <div className="flex flex-grow ">
          <EditorSidebar />
          <EditorMainArea />
        </div>
      </div>
    </div>
  );
};
