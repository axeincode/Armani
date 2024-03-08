import React, { useState } from "react";
import {
  useSelectedWidgetRepo,
  useObservable,
  useEditorObserveable,
} from "@/store";
import {
  Typography,
  IconButton,
  Switch,
  Button,
  Spinner,
} from "@material-tailwind/react";
import { useEditorWidgetObserveable } from "@/hooks/useEditorWidgetsObserveable";
import { useCurrentWidgetObserveable } from "@/hooks/useCurrentWidgetObserveable";
import { XCircleIcon } from "@heroicons/react/24/solid";
import { get, map, set } from "lodash";
import { LabelInput } from "@/components/ui/label-input";

export const DynamicBarForm = () => {
  const [formData, setFormData] = useState([{ key: "", value: "" }]);
  const [categories, setCategories] = useState("");

  const editorObs$ = useEditorObserveable();
  const selectedWidgetObs$ = useSelectedWidgetRepo();
  const selectedWidgetState = useObservable(selectedWidgetObs$.getObservable());
  const currentWidgetState = useCurrentWidgetObserveable();
  const editorWidgetState = useEditorWidgetObserveable(
    selectedWidgetState.widgetId
  );

  React.useEffect(() => {
    const data = get(editorWidgetState, "data.series", [
      { name: "", data: [] },
    ]);
    const categories = get(editorWidgetState, "data.categories", []);
    const formattedData = map(data, (d: any) => {
      return { key: d.name, value: d.data.join(",") };
    });
    setFormData(formattedData as unknown as any);
    setCategories(categories.join(","));
  }, [editorWidgetState]);

  const handleChange = (index: any, key: string, value: string) => {
    const newFormData = [...formData];
    newFormData[index] = { ...newFormData[index], [key]: value };
    setFormData(newFormData);
  };

  const handleCategoriesChange = (value: string) => {
    setCategories(value);
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
    const categoriesArray = categories.split(",");
    const newFormData = map(formData, (data: any) => {
      return { name: data?.key, data: data?.value.split(",") };
    });
    editorObs$.updateWidget(currentWidgetState.widgetId, {
      ...editorWidgetState,
      data: {
        series: [...newFormData],
        categories: categoriesArray,
      },
    });
  };

  return (
    <div className="max-h-72 overflow-x-hidden scrollbar-thin scrollbar-thumb-gray-800 scrollbar-track-gray-300">
      <div className="flex flex-col my-2">
        <LabelInput
          label="Categories"
          placeholder="comma separated categories"
          value={categories}
          onChange={(value: any) => handleCategoriesChange(value)}
        />
      </div>
      {map(formData, (pair, index) => (
        <div key={index} className="flex flex-col mb-4">
          <LabelInput
            label="Series name"
            placeholder="Series name"
            value={pair.key}
            onChange={(value: any) => handleChange(index, "key", value)}
          />

          <LabelInput
            label="Series values"
            placeholder="comma separated value"
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
          Add Another series
        </Button>
      </div>
    </div>
  );
};
