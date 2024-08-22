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
import { first, map, startCase } from "lodash";
import { toast } from "react-toastify";
import { WidgetElement } from "@/types";

export type AddImageWidgetSidebarProps = {};

export const AddImageWidgetSidebar = ({}: AddImageWidgetSidebarProps) => {
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

  return (
    <>
      {/** divider line */}
      <div className="flex h-[0.5px] w-full bg-gray-300 mb-2" />

      {editorWidgetState && (
        <>
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
        </>
      )}
    </>
  );
};
