/* eslint-disable @next/next/no-img-element */
"use client";
import React from "react";
import { PageTypes } from "@/types/editor.types";
import { DashboardViewComponent } from "@/components/ui/dashboard/dashboard-view";

export interface ViewDashboardPageProps {
  title: string;
  subtitle: string;
  pages: Record<string, PageTypes>;
  setPage: (page: number) => void;
  coverPhoto: string;
}

export const ViewDashboardPage = ({
  coverPhoto,
  title,
  subtitle,
  pages,
  setPage,
}: ViewDashboardPageProps) => {
  return (
    <>
      <DashboardViewComponent
        coverPhoto={coverPhoto}
        title={title}
        subtitle={subtitle}
        pages={pages}
        setPage={setPage}
      />
    </>
  );
};
