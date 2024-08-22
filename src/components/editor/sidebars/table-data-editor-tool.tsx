import React, { useState } from "react";
import {
  useSelectedWidgetRepo,
  useObservable,
  useEditorObserveable,
} from "@/store";
import { useEditorWidgetObserveable } from "@/hooks/useEditorWidgetsObserveable";
import { useCurrentWidgetObserveable } from "@/hooks/useCurrentWidgetObserveable";
import { IconButton, Button, Typography } from "@material-tailwind/react";

export const TableForm = () => {
  return (
    <div className="flex flex-col">
      <Typography color="gray" variant="small">
        Add data inside the table by clicking on each column.
      </Typography>
    </div>
  );
};
