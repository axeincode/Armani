import React from "react";
import { motion } from "framer-motion";
import {
  Typography,
  IconButton,
  Switch,
  Button,
  Spinner,
} from "@material-tailwind/react";
import isEmpty from "lodash/isEmpty";
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
import {
  uploadDocumentToStorage,
  deleteDocumentReference,
} from "@/lib/firebase/storage";

import { useCurrentWidgetObserveable } from "@/hooks/useCurrentWidgetObserveable";
import { useEditorWidgetObserveable } from "@/hooks/useEditorWidgetsObserveable";
import { v4 } from "uuid";
import { first, map, startCase } from "lodash";
import { toast } from "react-toastify";
import { WidgetElement } from "@/types";
import { debounce, get } from "lodash";
import { DocumentTypeEnum } from "@/types/editor.types";

export type AddPdfWidgetSidebarProps = {};

export const AddPdfWidgetSidebar = ({}: AddPdfWidgetSidebarProps) => {
  // state
  const [data, setData] = React.useState({
    id: "",
    url: "",
    name: "",
    docType: "",
  });
  const [isUploading, setIsUploading] = React.useState(false);
  const editorObs$ = useEditorObserveable();
  const selectedWidgetObs$ = useSelectedWidgetRepo();
  const selectedWidgetState = useObservable(selectedWidgetObs$.getObservable());
  const currentWidgetState = useCurrentWidgetObserveable();
  const editorWidgetState = useEditorWidgetObserveable(
    selectedWidgetState.widgetId
  );
  const deckInfo = useEditorDecksObserveable();
  const excelData = get(editorWidgetState, "data", {
    id: "",
    url: "",
    name: "",
    docType: "",
  });

  React.useEffect(() => {
    if (excelData && excelData.url) {
      setData({
        id: excelData.id,
        url: excelData.url,
        name: excelData.name,
        docType: excelData.docType,
      });
    }
  }, [excelData]);

  const handleOnDocumentChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = (e.target && e.target.files && e.target.files[0]) || null;
    if (!file) return;
    setIsUploading(true);
    const uniqueDocumentId = v4();
    const imageUrl = await uploadDocumentToStorage(uniqueDocumentId, file);
    setIsUploading(false);
    if (file) {
      // get file extension
      const extension = file.name.split(".").pop();

      editorObs$.updateWidget(currentWidgetState.widgetId, {
        ...editorWidgetState,
        data: {
          id: uniqueDocumentId,
          name: file.name,
          url: imageUrl,
          docType: extension as DocumentTypeEnum,
        },
      });
    }
  };

  const handleOnDeleteDocument = async () => {
    try {
      await deleteDocumentReference(String(data.id), data.name);
      editorObs$.updateWidget(currentWidgetState.widgetId, {
        ...editorWidgetState,
        data: {},
      });
      toast.success("Document deleted!");
    } catch (err) {
      toast.error("Error deleting Document");
    }
  };

  return (
    <>
      {/** divider line */}
      <div className="flex h-[0.5px] w-full bg-gray-300 mb-2" />

      {editorWidgetState && (
        <>
          {editorWidgetState.data && (
            <div
              key={data.id}
              className="flex flex-row justify-between items-start gap-2 "
            >
              <Typography
                variant="small"
                color="blue-gray"
                className="text-sm w-10 lg:w-36 overflow-ellipsis overflow-hidden whitespace-nowrap"
              >
                {data.name}
              </Typography>
              <IconButton
                variant="text"
                size="sm"
                className="text-xs px-1 m-0 h-4 w-4 min-w-0"
                title="Delete Element"
                onClick={handleOnDeleteDocument}
              >
                <TrashIcon className="h-5 w-5 hover:text-red-800" />
              </IconButton>
            </div>
          )}
          {isEmpty(editorWidgetState.data) && (
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
                Add
              </Button>
              <input
                className="cursor-pointer absolute block py-2 px-4 w-full opacity-0 pin-r pin-t"
                type="file"
                name="documents[]"
                accept=".pdf"
                onChange={handleOnDocumentChange}
              />
            </div>
          )}
        </>
      )}
    </>
  );
};
