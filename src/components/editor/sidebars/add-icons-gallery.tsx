import React from "react";
import { Typography, Button, Spinner } from "@material-tailwind/react";
import { PlusCircleIcon } from "@heroicons/react/24/solid";
import {
  useEditorObserveable,
  useObservable,
  useSelectedWidgetRepo,
} from "@/store";
import { useCurrentWidgetObserveable } from "@/hooks/useCurrentWidgetObserveable";
import { useEditorWidgetObserveable } from "@/hooks/useEditorWidgetsObserveable";
import { get, debounce } from "lodash";
import { DialogIconsLoader } from "./dialog-icons-loader";
import ColorPicker from "@/components/ui/color-picker";

export type AddIconsGallerySidebarProps = {};

export const AddIconsGallerySidebar = ({}: AddIconsGallerySidebarProps) => {
  // state
  const [showUploader, setShowUploader] = React.useState(false);
  const [isUploading, setIsUploading] = React.useState(false);
  const selectedWidgetObs$ = useSelectedWidgetRepo();
  const selectedWidgetState = useObservable(selectedWidgetObs$.getObservable());
  const editorObs$ = useEditorObserveable();
  const editorWidgetState = useEditorWidgetObserveable(
    selectedWidgetState.widgetId
  );
  const currentWidgetState = useCurrentWidgetObserveable();

  const handleOnIconColorChange = (color: string) => {
    editorObs$.updateWidget(currentWidgetState.widgetId, {
      ...editorWidgetState,
      data: {
        ...editorWidgetState.data,
        color,
      },
    });
  };

  // debounce function to save icon color
  const debounceFn = debounce(handleOnIconColorChange, 1000);

  return (
    <>
      {/** divider line */}
      <div className="flex h-[0.5px] w-full bg-gray-300 mb-2" />
      <>
        <div className="flex flex-col gap-2">
          <div className="inline-flex overflow-hidden relative justify-between items-center gap-2 my-1 border-dotted border-2 border-gray-300 px-3">
            <Button
              variant="text"
              size="sm"
              color="blue-gray"
              fullWidth
              className="inline-flex items-center gap-2"
              onClick={() => setShowUploader(!showUploader)}
            >
              {isUploading && <Spinner className="h-5 w-5" />}
              {!isUploading && <PlusCircleIcon className="h-5 w-5" />}
              Add Icons
            </Button>
          </div>
          <div className="flex flex-row items-center">
            <Typography variant="small" color="gray" className="mr-4">
              Color
            </Typography>
            <ColorPicker
              open={false}
              value={
                get(editorWidgetState, "data.color", "#aabbcc") || "#aabbcc"
              }
              onChange={(color) => debounceFn(color)}
            />
          </div>
        </div>
        <DialogIconsLoader
          open={showUploader}
          handler={() => setShowUploader(false)}
        />
      </>
    </>
  );
};
