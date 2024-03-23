"use client";

import { WidgetElement } from "@/types";
import { WidgetTypes } from "@/types/editor.types";
import {
  useSelectedWidgetRepo,
  useObservable,
  useEditorObserveable,
} from "@/store";
import { useEditorWidgetObserveable } from "@/hooks/useEditorWidgetsObserveable";
import { useCurrentWidgetObserveable } from "@/hooks/useCurrentWidgetObserveable";
import { Map } from "@/components/maps";

export type MapWidgetProps = {
  data: WidgetTypes;
};

const MapWidget: React.FC<MapWidgetProps> = (props) => {
  const { data } = props;
  console.log("data:::", data);

  const editorObs$ = useEditorObserveable();

  const selectedWidgetObs$ = useSelectedWidgetRepo();
  const selectedWidgetState = useObservable(selectedWidgetObs$.getObservable());
  const currentWidgetState = useCurrentWidgetObserveable();
  const editorWidgetState = useEditorWidgetObserveable(
    selectedWidgetState.widgetId
  );

  const widgetData = editorWidgetState?.data?.[0] || {};

  const stateCallback = (value: Record<string, number>) => {
    editorObs$.updateWidget(currentWidgetState.widgetId, {
      ...editorWidgetState,
      data: [value],
    });
  };
  return (
    <Map
      data-widget={WidgetElement.MAP}
      data-widget-id={data.id}
      data={widgetData}
      callBack={stateCallback}
    />
  );
};

export default MapWidget;
