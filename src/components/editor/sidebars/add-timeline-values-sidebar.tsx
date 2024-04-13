import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Typography,
  IconButton,
  Switch,
  Button,
  Spinner,
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
import { first, map, startCase } from "lodash";
import { toast } from "react-toastify";
import { WidgetElement } from "@/types";

export type AddTimelineWidgetSidebarProps = {};

export const AddTimelineWidgetSidebar = ({}: AddTimelineWidgetSidebarProps) => {
  // state
  const editorObs$ = useEditorObserveable();
  const selectedWidgetObs$ = useSelectedWidgetRepo();
  const selectedWidgetState = useObservable(selectedWidgetObs$.getObservable());
  const currentWidgetState = useCurrentWidgetObserveable();
  const editorWidgetState = useEditorWidgetObserveable(
    selectedWidgetState.widgetId
  );
  const deckInfo = useEditorDecksObserveable();
  // states;
  const [formData, setFormData] = useState([{ key: "", value: "" }]);

  React.useEffect(() => {
    const data = editorWidgetState?.data || [{ key: "", value: "" }];
    setFormData(data as unknown as any);
  }, [editorWidgetState]);

  const handleChange = (index: any, key: string, value: string) => {
    const newFormData = [...formData];
    newFormData[index] = { ...newFormData[index], [key]: value };
    setFormData(newFormData);
  };

  const addPair = () => {
    setFormData([...formData, { key: "", value: "" }]);
  };

  const removePair = (index: number) => {
    const newFormData = [...formData];
    newFormData.splice(index, 1);
    setFormData(newFormData);
  };

  const saveData = () => {
    editorObs$.updateWidget(currentWidgetState.widgetId, {
      ...editorWidgetState,
      data: [...formData],
    });
  };

  return (
    <>
      <div className="flex flex-col">
        {formData.map((pair, index) => (
          <div key={index} className="flex flex-col mb-4">
            <LabelInput
              label="Key"
              placeholder=""
              value={pair.key}
              onChange={(value: any) => handleChange(index, "key", value)}
            />

            <LabelInput
              label="Value"
              placeholder=""
              value={pair.value}
              onChange={(value: any) => handleChange(index, "value", value)}
            />

            <div className="flex my-2 gap-2">
              <Button
                variant="outlined"
                size="sm"
                color="blue"
                className="inline-flex items-center gap-2"
                onClick={saveData}
              >
                Save
              </Button>

              <Button
                variant="outlined"
                size="sm"
                color="blue"
                className="inline-flex items-center gap-2"
                onClick={() => removePair(index)}
              >
                Cancel
              </Button>
            </div>
          </div>
        ))}

        <div className="inline-flex overflow-hidden relative justify-between items-center gap-2 my-1 border-dotted border-2 border-gray-300 px-1">
          <Button
            variant="text"
            size="sm"
            color="blue"
            className="inline-flex items-center gap-2 text-xs px-0"
            onClick={addPair}
          >
            Add Another
          </Button>
        </div>
      </div>
    </>
  );
};
