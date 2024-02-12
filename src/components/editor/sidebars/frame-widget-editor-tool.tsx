import React from "react";
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

export type FrameWidgetEditorToolProps = {
  toggleDrawer: () => void;
};

export const FrameWidgetEditorTool = ({
  toggleDrawer,
}: FrameWidgetEditorToolProps) => {
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
  console.log("editorWidgetState", editorWidgetState);

  const handleOnTitleChange = (value: string) => {
    if (!currentWidgetState.widgetId) return;
    editorObs$.updateWidget(currentWidgetState.widgetId, {
      ...editorWidgetState,
      title: value,
    });
  };

  const handleOnSubtitleChange = (value: string) => {
    if (!currentWidgetState.widgetId) return;
    editorObs$.updateWidget(currentWidgetState.widgetId, {
      ...editorWidgetState,
      subtitle: value,
    });
  };

  const handleOnCaptionTitleChange = (value: string) => {
    if (!currentWidgetState.widgetId) return;
    editorObs$.updateWidget(currentWidgetState.widgetId, {
      ...editorWidgetState,
      captionTitle: value,
    });
  };

  const handleOnCaptionSubtitleChange = (value: string) => {
    if (!currentWidgetState.widgetId) return;
    editorObs$.updateWidget(currentWidgetState.widgetId, {
      ...editorWidgetState,
      captionSubtitle: value,
    });
  };

  const handleHasCaption = (value: boolean) => {
    if (!currentWidgetState.widgetId) return;
    editorObs$.updateWidget(currentWidgetState.widgetId, {
      ...editorWidgetState,
      captionEnabled: value,
    });
  };

  const handleHasElement = (value: boolean) => {
    if (!currentWidgetState.widgetId) return;
    editorObs$.updateWidget(currentWidgetState.widgetId, {
      ...editorWidgetState,
      enableElements: value,
    });
  };

  const handleOnUpdateWidgetElement = (widgetElementType: WidgetElement) => {
    if (!currentWidgetState.widgetId) return;
    editorObs$.updateWidget(currentWidgetState.widgetId, {
      ...editorWidgetState,
      elementType: widgetElementType,
    });
  };

  return (
    <>
      <div className="mb-2 flex justify-between">
        <Typography variant="h6" color="blue-gray">
          Frame
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

      {editorWidgetState && (
        <>
          <div className="flex flex-col gap-1 my-4 px-1">
            <LabelInput
              label="Title"
              placeholder="Title"
              value={editorWidgetState.title || ""}
              onChange={handleOnTitleChange}
            />
          </div>
          <div className="flex flex-col gap-1 mb-2 px-1">
            <LabelInput
              label="Subtitle"
              placeholder="Subtitle"
              value={editorWidgetState.subtitle || ""}
              onChange={handleOnSubtitleChange}
            />
          </div>

          <div className="flex flex-col gap-1 my-4 px-1">
            <div className="flex justify-between">
              <Typography variant="h6" color="blue-gray" className="mb-0">
                {"Elements"}
              </Typography>

              <Switch
                crossOrigin={"true"}
                checked={!!editorWidgetState.enableElements}
                onChange={(e) => handleHasElement(e.target.checked)}
              />
            </div>
            {editorWidgetState && !!editorWidgetState.enableElements && (
              <div className="h-60 overflow-auto scrollbar px-2">
                {Object.values(WidgetElement).map((widget) => {
                  return (
                    <div
                      className="flex flex-row justify-between items-start gap-2 "
                      key={widget}
                    >
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="text-xs w-10 lg:w-28 overflow-ellipsis overflow-hidden whitespace-nowrap"
                      >
                        {startCase(widget)}
                      </Typography>
                      <IconButton
                        variant="text"
                        size="sm"
                        className="text-xs px-1 m-0 h-4 w-4 min-w-0"
                        title="Add Element"
                        onClick={() => handleOnUpdateWidgetElement(widget)}
                      >
                        <PlusCircleIcon className="h-4 w-4" />
                      </IconButton>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
          <div className="flex gap-1 my-4 px-1">
            <Typography variant="h6" color="blue-gray" className="w-16">
              Caption
            </Typography>
            <Switch
              crossOrigin={"true"}
              checked={editorWidgetState.captionEnabled}
              onChange={(e) => handleHasCaption(e.target.checked)}
            />
          </div>
        </>
      )}
      {editorWidgetState && !!editorWidgetState.captionEnabled && (
        <motion.div
          initial={{ height: 0 }}
          animate={{ height: "auto" }}
          transition={{ duration: 0.3 }}
          className="flex flex-col px-1"
        >
          <div className="flex flex-col gap-1 mb-2">
            <LabelInput
              label="Caption Title"
              placeholder="Title"
              value={editorWidgetState.captionTitle || ""}
              onChange={handleOnCaptionTitleChange}
            />
          </div>
          <div className="flex flex-col gap-1 mb-2">
            <LabelInput
              label="Caption Subtitle"
              placeholder="Subtitle"
              value={editorWidgetState.captionSubtitle || ""}
              onChange={handleOnCaptionSubtitleChange}
            />
          </div>
        </motion.div>
      )}
    </>
  );
};
