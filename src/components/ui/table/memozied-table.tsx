import React from "react";
import { WidgetTypes } from "@/types/editor.types";
import { isEmpty, isEqual, get } from "lodash";
import {
  useSelectedWidgetRepo,
  useObservable,
  useEditorObserveable,
} from "@/store";
import { useEditorWidgetObserveable } from "@/hooks/useEditorWidgetsObserveable";
import { useCurrentWidgetObserveable } from "@/hooks/useCurrentWidgetObserveable";
import ReactTableWidget from "./react-table-widget";
import { makeData } from "./helper.utils";

export type ReactTableWidgetProps = {
  data: WidgetTypes;
  handleOnSaveTableData?: (data: any) => void;
};

const MemoziedTableWidget = (props: ReactTableWidgetProps) => {
  const { data: widgetData } = props;
  let tableData = get(widgetData, "tableData", []);
  const editorObs$ = useEditorObserveable();

  const selectedWidgetObs$ = useSelectedWidgetRepo();
  const selectedWidgetState = useObservable(selectedWidgetObs$.getObservable());
  const currentWidgetState = useCurrentWidgetObserveable();
  const editorWidgetState = useEditorWidgetObserveable(
    selectedWidgetState.widgetId
  );

  if (isEmpty(tableData)) {
    tableData = makeData() as unknown as any[];
  }

  const saveData = React.useCallback(
    (data: any) => {
      editorObs$.updateWidget(currentWidgetState.widgetId, {
        ...editorWidgetState,
        data: {
          tableData: data,
        },
      });
    },
    [currentWidgetState, editorWidgetState, editorObs$]
  );

  return (
    <ReactTableWidget
      data={tableData}
      handeOnSave={saveData}
      // Other props...
    />
  );
};

const areEqual = (prevProps: any, nextProps: any) => {
  return isEqual(prevProps.data, nextProps.data);
};

export default React.memo(MemoziedTableWidget, areEqual);
