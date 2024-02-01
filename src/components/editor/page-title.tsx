import React from "react";
import { deckPageConfigs } from "@/constants/pages";
import { Typography } from "@material-tailwind/react";

type PageTitleProps = {
  page: number;
};

export const PageTitle = ({ page }: PageTitleProps) => {
  const pageInfo = deckPageConfigs.find((p) => p.pageIndex === page);
  return (
    <div className="flex justify-center items-center">
      <Typography
        variant="h5"
        color="gray"
        style={{
          fontFamily: "inherit",
        }}
      >
        {pageInfo?.title}
      </Typography>
    </div>
  );
};
