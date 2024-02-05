import React from "react";
import { Typography } from "@material-tailwind/react";
import { useEditorPagesObserveable } from "@/hooks/useEditorPagesObserveable";
import { filter, first } from "lodash";
import { PageTypes } from "@/types/editor.types";

type PageTitleProps = {
  page: number;
};

export const PageTitle = ({ page }: PageTitleProps) => {
  // const pageInfo = deckPageConfigs.find((p) => p.pageIndex === page);
  const pages$ = useEditorPagesObserveable();
  const pageInfo = first(
    filter(pages$, (pageValue: PageTypes) => pageValue.pageNumber === page)
  );

  return (
    <div className="flex justify-center items-center">
      <Typography
        variant="h5"
        color="gray"
        style={{
          fontFamily: "inherit",
        }}
      >
        {pageInfo ? pageInfo.name || pageInfo?.title : ""}
      </Typography>
    </div>
  );
};
