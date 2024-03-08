import React, { useState } from "react";
import {
  useSelectedWidgetRepo,
  useObservable,
  useEditorObserveable,
} from "@/store";
import { useEditorWidgetObserveable } from "@/hooks/useEditorWidgetsObserveable";
import { useCurrentWidgetObserveable } from "@/hooks/useCurrentWidgetObserveable";
import { IconButton, Button } from "@material-tailwind/react";
import { LabelInput } from "@/components/ui/label-input";
import { map } from "lodash";
import { TrashIcon } from "@heroicons/react/24/solid";
import { cn } from "@/lib/utils";
export const TableForm = () => {
  const [tableName, setTableName] = useState("");
  const [columnName, setColumnName] = useState<string[]>([]);
  const [rowValue, setRowValue] = useState<string[][]>([]);

  const editorObs$ = useEditorObserveable();
  const selectedWidgetObs$ = useSelectedWidgetRepo();
  const selectedWidgetState = useObservable(selectedWidgetObs$.getObservable());
  const currentWidgetState = useCurrentWidgetObserveable();
  const editorWidgetState = useEditorWidgetObserveable(
    selectedWidgetState.widgetId
  );

  React.useEffect(() => {
    console.log("table effect running it");
    const data = editorWidgetState?.tableData;
    if (!data) return;
    // const { name, rows, columns } = data;
    // setTableName(name || "");
    // if (Array.isArray(rows)) {
    //   setRowValue(rows);
    // }
    // if (Array.isArray(columns)) {
    //   setColumnName(columns);
    // }
  }, [editorWidgetState]);

  const handleColumnChange = (value: string) => {
    setColumnName(value.split(","));
  };

  const handleRowChange = (index: number, value: string) => {
    const currentRows = rowValue;
    currentRows[index] = value.split(",");
    setRowValue([...currentRows]);
  };

  const handleAddRow = () => {
    setRowValue([...rowValue, []]);
  };

  const handleRemove = (index: number) => {
    const currentRows = rowValue;
    currentRows.splice(index, 1);
    setRowValue([...currentRows]);
  };

  const handleSaveData = () => {
    editorObs$.updateWidget(currentWidgetState.widgetId, {
      ...editorWidgetState,
      // tableData: {
      //   name: tableName,
      //   columns: columnName,
      //   rows: rowValue,
      // },
    });
  };

  return (
    <div className="flex flex-col">
      <LabelInput
        label="Name"
        placeholder="table name"
        value={tableName}
        onChange={(value: any) => setTableName(value)}
      />
      <LabelInput
        label="Column Names"
        placeholder="comma separate names"
        value={columnName.join(",")}
        onChange={(value: any) => handleColumnChange(value)}
      />
      <div
        className={cn(
          "flex flex-col gap-1 max-h-52 overflow-x-hidden scrollbar-thin scrollbar-thumb-gray-900 scrollbar-track-gray-900"
        )}
      >
        {/* {map(rowValue, (row: any, index: number) => (
          <div key={index} className="flex items-center mb-1 gap-1">
            <div>
              <LabelInput
                key={index}
                label="Row Value"
                placeholder=""
                value={row.join(",")}
                onChange={(value: any) => handleRowChange(index, value)}
              />
            </div>
            <IconButton
              variant="text"
              size="sm"
              className="text-xs px-1 m-0 h-4 w-4 min-w-0"
              title="Delete Element"
              onClick={() => handleRemove(index)}
            >
              <TrashIcon className="h-4 w-4 hover:text-red-800" />
            </IconButton>
          </div>
        ))} */}
      </div>
      <div className="flex overflow-hidden justify-between items-center my-1 border-dotted border-2 border-gray-300">
        <Button
          variant="text"
          size="sm"
          color="blue"
          fullWidth
          className="inline-flex items-center gap-2 text-xs px-0"
          onClick={handleAddRow}
        >
          Add Row
        </Button>
      </div>

      <div className="inline-flex overflow-hidden relative justify-between items-center my-1 border-dotted border-2 border-gray-300">
        <Button
          variant="text"
          size="sm"
          color="blue"
          fullWidth
          className="inline-flex items-center gap-2 text-xs px-0"
          onClick={handleSaveData}
        >
          Save
        </Button>
      </div>
    </div>
  );
};
