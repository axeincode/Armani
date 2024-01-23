"use client";
import React from "react";
import { EditorTargetsContainer } from "./editor-targets-container";
import { deckPageConfigs as pageConfigs } from "@/constants/pages";

type EditorPagesProps = {
  page: number;
  setRef: (el: HTMLDivElement) => void;
};

export const EditorPages = ({ page, setRef }: EditorPagesProps) => {
  // work on page data and then update editor targets container with page data;
  const pageData = pageConfigs.find((p) => p.pageIndex === page);
  return (
    <>
      <EditorTargetsContainer setRef={setRef} data={pageData} />
    </>
  );
};
