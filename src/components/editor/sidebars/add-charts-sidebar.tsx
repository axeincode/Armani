"use client";
import React from "react";
import {
  Typography,
  IconButton,
  Switch,
  Button,
  Spinner,
  Select,
  Option,
} from "@material-tailwind/react";
import {
  ChevronLeftIcon,
  PlusCircleIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import { deleteImageReference, updateDeckImage } from "@/lib/firebase/storage";
import { cn } from "@/lib/utils";
import { LabelInput } from "@/components/ui/label-input";
import {
  useEditorDecksObserveable,
  useEditorObserveable,
  useObservable,
  useSelectedWidgetRepo,
} from "@/store";
import { useCurrentWidgetObserveable } from "@/hooks/useCurrentWidgetObserveable";
import { useEditorWidgetObserveable } from "@/hooks/useEditorWidgetsObserveable";
import { v4 } from "uuid";
import { first, map, startCase, get } from "lodash";
import { toast } from "react-toastify";
import { WidgetElement } from "@/types";

export type AddChartWidgetSidebarProps = {
  toggleDrawer: () => void;
};

const ChartType = {
  Area: "Area",
  Bar: "Bar",
  Column: "Column",
  Line: "Line",
  Pie: "Pie",
};

export const AddChartWidgetSidebar = ({
  toggleDrawer,
}: AddChartWidgetSidebarProps) => {
  // state
  const [isUploading, setIsUploading] = React.useState(false);
  const editorObs$ = useEditorObserveable();
  const selectedWidgetObs$ = useSelectedWidgetRepo();
  const selectedWidgetState = useObservable(selectedWidgetObs$.getObservable());
  const currentWidgetState = useCurrentWidgetObserveable();
  const editorWidgetState = useEditorWidgetObserveable(
    selectedWidgetState.widgetId
  );
  const deckInfo = useEditorDecksObserveable();
  const chartType = get(editorWidgetState, "chartType", "none");
  const handleOnChartType = async (value: string) => {
    editorObs$.updateWidget(currentWidgetState.widgetId, {
      ...editorWidgetState,
      chartType: value,
    });
  };

  return (
    <>
      <div className="mb-2 flex justify-between">
        <Typography variant="h6" color="blue-gray">
          Add
        </Typography>
        <div className="h-5 w-5 min-w-0">
          <IconButton
            variant="outlined"
            size="sm"
            className="p-0 m-0 h-5 w-5 min-w-0 rounded-full"
            title="close"
            onClick={toggleDrawer}
          >
            <ChevronLeftIcon className="h-4 w-4" />
          </IconButton>
        </div>
      </div>
      {/** divider line */}
      <div className="flex h-[0.5px] w-full bg-gray-300 mb-2" />

      <div className="flex w-44">
        <Select
          label="Select Chart"
          className="text-blue-gray-500"
          value={chartType || "none"}
          onChange={(value) => handleOnChartType(value!)}
          containerProps={{
            className: "!min-w-[10px] text-blue-gray-500",
          }}
          labelProps={{ className: "text-blue-gray-500" }}
          data-value={chartType || "none"}
        >
          <Option value={"None"}>Select</Option>
          <Option value={"Area"}>Area</Option>
          <Option value={"Bar"}>Bar</Option>
          <Option value={"Column"}>Column</Option>
          <Option value={"Line"}>Line</Option>
          <Option value={"Pie"}>Pie</Option>
        </Select>
      </div>
    </>
  );
};
