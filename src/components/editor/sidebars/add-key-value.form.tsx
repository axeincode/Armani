import React, { useState } from "react";
import {
  useSelectedWidgetRepo,
  useObservable,
  useEditorObserveable,
} from "@/store";
import { useEditorWidgetObserveable } from "@/hooks/useEditorWidgetsObserveable";
import { useCurrentWidgetObserveable } from "@/hooks/useCurrentWidgetObserveable";
import { IconButton, Button } from "@material-tailwind/react";
import { XCircleIcon } from "@heroicons/react/24/solid";
import { LabelInput } from "@/components/ui/label-input";

export const DynamicForm = () => {
  const [formData, setFormData] = useState([{ key: "", value: "" }]);

  const editorObs$ = useEditorObserveable();
  const selectedWidgetObs$ = useSelectedWidgetRepo();
  const selectedWidgetState = useObservable(selectedWidgetObs$.getObservable());
  const currentWidgetState = useCurrentWidgetObserveable();
  const editorWidgetState = useEditorWidgetObserveable(
    selectedWidgetState.widgetId
  );

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

  const render = () => {
    editorObs$.updateWidget(currentWidgetState.widgetId, {
      ...editorWidgetState,
      data: [...formData],
    });
  };

  return (
    <div className="flex flex-col flex-1 overflow-x-hidden scrollbar-thin">
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
              onClick={render}
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
  );
};
