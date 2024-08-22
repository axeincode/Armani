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
import { first, map } from "lodash";
import { toast } from "react-toastify";

export type CardWidgetEditorToolProps = {
  toggleDrawer: () => void;
};

export const CardWidgetEditorTool = ({
  toggleDrawer,
}: CardWidgetEditorToolProps) => {
  // state
  const [isUploading, setIsUploading] = React.useState(false);
  const [isDeleting, setisDeleting] = React.useState(false);

  const editorObs$ = useEditorObserveable();
  const selectedWidgetObs$ = useSelectedWidgetRepo();
  const selectedWidgetState = useObservable(selectedWidgetObs$.getObservable());
  const currentWidgetState = useCurrentWidgetObserveable();
  const editorWidgetState = useEditorWidgetObserveable(
    selectedWidgetState.widgetId
  );
  const deckInfo = useEditorDecksObserveable();

  const hasFileName = deckInfo?.logo?.name ? true : false;

  const handleOnFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = (e.target && e.target.files && e.target.files[0]) || null;
    if (!file) return;
    setIsUploading(true);
    const imageId = v4();
    const imageUrl = await updateDeckImage(imageId, file);
    setIsUploading(false);
    if (imageUrl) {
      const currentImages = editorWidgetState.images || [];
      editorObs$.updateWidget(currentWidgetState.widgetId, {
        ...editorWidgetState,
        images: [
          ...currentImages,
          {
            id: imageId,
            name: file.name,
            url: imageUrl,
          },
        ],
      });
    }
  };

  const handleOnDeleteImage = async (imageId: string, imageName: string) => {
    try {
      await deleteImageReference(imageId, imageName);
      const currentImages = editorWidgetState.images || [];
      const images = currentImages.filter((image) => {
        return image.id !== imageId;
      });
      editorObs$.updateWidget(currentWidgetState.widgetId, {
        ...editorWidgetState,
        images,
      });
      toast.success("Image deleted!");
    } catch (err) {
      toast.error("Error deleting image");
    }
  };

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

  const handleRemoveWidget = () => {
    if (!currentWidgetState.widgetId) return;
    editorObs$.deleteWidget(
      currentWidgetState.pageId,
      currentWidgetState.widgetId
    );
    selectedWidgetObs$.unSelect();
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
            </div>
            {editorWidgetState.images &&
              editorWidgetState.images.length > 0 &&
              map(editorWidgetState.images, (image) => {
                return (
                  <div
                    key={image.id}
                    className="flex flex-row justify-between items-start gap-2 "
                  >
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="text-sm w-10 lg:w-36 overflow-ellipsis overflow-hidden whitespace-nowrap"
                    >
                      {image.name}
                    </Typography>
                    <IconButton
                      variant="text"
                      size="sm"
                      className="text-xs px-1 m-0 h-4 w-4 min-w-0"
                      title="Delete Element"
                      onClick={() => handleOnDeleteImage(image.id, image.name)}
                    >
                      <TrashIcon className="h-5 w-5 hover:text-red-800" />
                    </IconButton>
                  </div>
                );
              })}
            <div className="inline-flex overflow-hidden relative justify-between items-center gap-2 my-1 border-dotted border-2 border-gray-300 px-3">
              <Button
                variant="text"
                size="sm"
                color="blue-gray"
                fullWidth
                className="inline-flex items-center gap-2"
              >
                {isUploading && <Spinner className="h-5 w-5" />}
                {!isUploading && <PlusCircleIcon className="h-5 w-5" />}
                Add image
              </Button>
              <input
                className="cursor-pointer absolute block py-2 px-4 w-full opacity-0 pin-r pin-t"
                type="file"
                name="documents[]"
                accept="image/*"
                onChange={handleOnFileChange}
              />
            </div>
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

      <div className="inline-flex overflow-hidden relative justify-between items-center my-1 px-1">
        <Button
          variant="filled"
          size="sm"
          color="red"
          fullWidth
          className=""
          onClick={handleRemoveWidget}
        >
          {isDeleting && <Spinner className="h-5 w-5" />}
          Delete
        </Button>
      </div>
    </>
  );
};
