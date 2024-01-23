"use client";
import { EditorGrid, EditorTools, Sidebar } from "@/components";
import React from "react";
import Link from "next/link";

export const EditorContainer = () => {
  return (
    <div className="flex flex-col flex-1 flex-grow w-full h-full">
      {/** header layout */}
      <EditorTools />
      {/** content layout */}
      <div className="flex flex-1">
        <Sidebar />
        <EditorGrid />
      </div>
      {/** footer layout */}
      <footer className="w-full p-2 flex flex-row gap-1 justify-center items-center border-t bg-gray-800">
        Powered by
        <Link
          href="https://canari.com"
          target="_blank"
          className="underline underline-offset-4 text-white"
        >
          Canari solutions
        </Link>
      </footer>
    </div>
  );
};
