import React from "react";
import { EditorSidebar } from "./editor-sidebar";
import { EditorMainArea } from "./editor-main-area";
import { EditorTopNav } from "./editor-top-nav";

export const EditorGrid = () => {
  return (
    <div className="flex flex-grow rounded border-solid border-4  border-gray-500">
      <div className="flex flex-col flex-grow rounded border-solid border-4  border-gray-700">
        <EditorTopNav />
        <div className="flex flex-grow rounded border-solid border-4  border-gray-500">
          <EditorSidebar />
          <EditorMainArea />
        </div>
      </div>
    </div>
  );
};
