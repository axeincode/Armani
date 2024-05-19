import React from "react";
import { LabelInput } from "@/components/ui/label-input";
import {
  useEditorObserveable,
  useObservable,
  useSelectedWidgetRepo,
} from "@/store";
import { useCurrentWidgetObserveable } from "@/hooks/useCurrentWidgetObserveable";
import { useEditorWidgetObserveable } from "@/hooks/useEditorWidgetsObserveable";
import { v4 } from "uuid";
import { debounce, get } from "lodash";

export type AddParagraphSidebarProps = {
  label?: string;
};

export const AddParagraphSidebar = ({ label }: AddParagraphSidebarProps) => {
  // state
  const editorObs$ = useEditorObserveable();
  const selectedWidgetObs$ = useSelectedWidgetRepo();
  const selectedWidgetState = useObservable(selectedWidgetObs$.getObservable());
  const currentWidgetState = useCurrentWidgetObserveable();
  const editorWidgetState = useEditorWidgetObserveable(
    selectedWidgetState.widgetId
  );

  const textData = get(editorWidgetState, "data", {
    id: 0,
    title: "",
    text: "",
  });

  const handleOnTitleChange = React.useCallback(
    debounce((value: string) => {
      const textid = get(textData, "id", null);
      const getId = textid ? textid : v4();
      const data = {
        ...textData,
        id: getId,
        title: value,
      };
      editorObs$.updateWidget(currentWidgetState.widgetId, {
        ...editorWidgetState,
        data: data,
      });
    }, 5),
    [editorObs$, editorWidgetState, currentWidgetState, textData]
  );

  return (
    <>
      {/** divider line */}
      <div className="flex h-[0.5px] w-full bg-gray-300 mb-2" />

      {editorWidgetState && (
        <>
          <div className="flex flex-col mb-4 gap-2">
            <div className="text-sm font-semibold text-gray-500">
              <LabelInput
                label={"Title"}
                placeholder=""
                value={textData?.title || ""}
                onChange={(value: any) => {
                  handleOnTitleChange(value);
                }}
              />
            </div>
          </div>
        </>
      )}
    </>
  );
};
