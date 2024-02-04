import { WidgetTypes } from "@/types/editor.types";
import { useEditorObserveable } from "@/store";
import { find } from "lodash";

export type TableWidgetProps = {
  data: WidgetTypes;
};
export const TableWidget: React.FC<TableWidgetProps> = (props) => {
  const { data } = props;
  const { getObservable } = useEditorObserveable();
  const currentState = getObservable();
  const {
    entities: { widgets },
  } = currentState.getValue();
  const widgetData = find(widgets, (widget) => widget?.id === data.id);
  console.log(widgetData);
  return (
    <>
      <div></div>
    </>
  );
};
