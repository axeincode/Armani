import React from "react";
import { Button, IconButton, Typography } from "@material-tailwind/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

type EditorPaginationProps = {
  page: number;
  totalPages: number;
  setPage: (page: number) => void;
};

export const EditorPagination = ({
  page,
  totalPages,
  setPage,
}: EditorPaginationProps) => {
  return (
    <div className="h-8 flex items-center justify-center gap-1">
      <IconButton variant="text" size="sm" onClick={() => setPage(page - 1)}>
        <ChevronLeftIcon className="h-4 w-4" />
      </IconButton>
      <Typography variant="small" color="gray">
        {page}/{totalPages}
      </Typography>
      <IconButton variant="text" size="sm" onClick={() => setPage(page + 1)}>
        <ChevronRightIcon className="h-4 w-4" />
      </IconButton>
    </div>
  );
};
