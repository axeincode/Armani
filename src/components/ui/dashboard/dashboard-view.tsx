/* eslint-disable @next/next/no-img-element */
"use client";
import React from "react";
import {
  IconButton,
  Typography,
  Card,
  CardBody,
} from "@material-tailwind/react";
import { PageTypes } from "@/types/editor.types";
import { map } from "lodash";
import { DynamicHeroIcon } from "@/components/ui/DynamicHeroIcon";

export interface DashboardViewComponentProps {
  title: string;
  subtitle: string;
  pages: Record<string, PageTypes>;
  setPage: (page: number) => void;
  coverPhoto: string;
}

export const DashboardViewComponent = ({
  coverPhoto,
  title,
  subtitle,
  pages,
  setPage,
}: DashboardViewComponentProps) => {
  return (
    <div className="flex-col flex flex-grow">
      <div className="flex flex-col p-10">
        <div className="flex flex-col p-10 items-center">
          {!coverPhoto && (
            <>
              <Card className="h-24 lg:h-56 w-1/2">
                <CardBody>
                  <Typography>placeholder image</Typography>
                </CardBody>
              </Card>
            </>
          )}
          {coverPhoto && (
            <img
              className="h-24 lg:h-56 w-1/2 object-cover object-center"
              src={coverPhoto}
              alt="deck cover photo"
            />
          )}
        </div>
        <div className="flex flex-col gap-3">
          <Typography
            as="h1"
            variant="h1"
            className="mt-2 text-center font-normal"
          >
            {title || "Welcome to the Dashboard"}
          </Typography>
          <Typography as="h1" variant="h5" className="text-center font-normal">
            {subtitle || "Welcome to the Dashboard"}
          </Typography>
        </div>
      </div>
      <div className="flex flex-col md:flex-row items-center justify-center gap-3 bg-gray-100 border-2 border-solid border-gray-200">
        {map(pages, (page, key) => {
          return (
            <React.Fragment key={key}>
              {page.pageNumber > 0 && (
                <div key={key} className="flex flex-col items-center w-28 h-20">
                  <div className="flex flex-col items-center p-3 gap-2">
                    <IconButton
                      key={page.id}
                      size="sm"
                      onClick={() => setPage(page.pageNumber)}
                    >
                      <DynamicHeroIcon
                        className="h-6 w-6 text-white"
                        icon={page.iconName || "Squares2X2Icon"}
                      />
                    </IconButton>
                    <Typography
                      variant="small"
                      className="text-center font-normal text-xs"
                    >
                      {page.name}
                    </Typography>
                  </div>
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};
