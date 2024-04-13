import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  useSelectedWidgetRepo,
  useObservable,
  useEditorObserveable,
} from "@/store";
import { useEditorWidgetObserveable } from "@/hooks/useEditorWidgetsObserveable";
import { useCurrentWidgetObserveable } from "@/hooks/useCurrentWidgetObserveable";
import {
  Typography,
  IconButton,
  Switch,
  Button,
  Spinner,
} from "@material-tailwind/react";
import {
  CheckCircleIcon,
  XCircleIcon,
  ChevronLeftIcon,
  PlusCircleIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import { LabelInput } from "@/components/ui/label-input";
import { useCurrentPageObserveable } from "@/hooks/useCurrentPageObserveable";
import { useEditorPagesObserveable } from "@/hooks/useEditorPagesObserveable";
import { PageTypes, TabTypes } from "@/types/editor.types";
import { get, isEmpty } from "lodash";
import { v4 } from "uuid";

export const AddTabNames = () => {
  const [formData, setFormData] = useState<TabTypes[] | null>(null);
  const [enabled, setEnabled] = useState(true);
  const editorObs$ = useEditorObserveable();
  const currentPage$ = useCurrentPageObserveable();
  const pages$ = useEditorPagesObserveable();
  const selectedWidgetObs$ = useSelectedWidgetRepo();
  const selectedWidgetState = useObservable(selectedWidgetObs$.getObservable());
  const currentWidgetState = useCurrentWidgetObserveable();
  const editorWidgetState = useEditorWidgetObserveable(
    selectedWidgetState.widgetId
  );

  /// current pageInfo;
  const currentPageInfo$ = React.useMemo(() => {
    if (currentPage$.pageId) {
      return pages$[currentPage$.pageId];
    }
    return {} as unknown as PageTypes;
  }, [currentPage$, pages$]);

  const tabNames = React.useMemo(() => {
    const names = currentPageInfo$.tabs?.map((tab) => {
      return tab.name;
    });
    return names;
  }, [currentPageInfo$]);

  const isTabView = get(currentPageInfo$, "isTabView", false);
  const hasTabs = currentPageInfo$.tabs && currentPageInfo$.tabs.length > 0;

  React.useEffect(() => {
    const data = currentPageInfo$.tabs?.map((tab) => tab);
    setFormData(data as unknown as any);
  }, [currentPageInfo$]);

  const handleChange = (id: string, value: string) => {
    const newData =
      formData &&
      formData.map((tab, i) => {
        if (id === tab.id) {
          return { ...tab, name: value };
        }
        return tab;
      });
    if (!isEmpty(newData)) {
      setFormData(newData);
    }
  };

  const add = () => {
    const pageId = currentPage$.pageId;
    if (pageId) {
      const tabId = v4();
      editorObs$.addTab(pageId, tabId);
    }
  };

  const remove = (tabId: string) => {
    const pageId = currentPage$.pageId;
    if (pageId) {
      editorObs$.removeTabName(pageId, tabId);
    }
  };

  const handleOnSave = () => {
    const pageId = currentPage$.pageId;
    if (!isEmpty(formData) && pageId) {
      for (let i = 0; i < formData!.length; i++) {
        const tab = formData![i];
        editorObs$.addTabName(pageId, tab.id, tab.name);
      }
    }
  };

  const handleOnRemoveTab = () => {
    const pageId = currentPage$.pageId;
    if (pageId) editorObs$.deleteTab(pageId);
  };

  return (
    <div className="max-h-72 overflow-x-hidden scrollbar-thin pr-3 mt-2">
      <div className="flex gap-1 px-1 items-center justify-between">
        <Typography variant="h6" color="blue-gray" className="mr-1">
          <span>Tabs</span>
        </Typography>
        <div className="flex gap-1 items-center justify-between">
          <IconButton
            onClick={handleOnRemoveTab}
            size="sm"
            color="blue-gray"
            className="p-0 h-5 w-5"
            title="remove tab"
          >
            <XCircleIcon className="h-4 w-4" />
          </IconButton>
          <Switch
            crossOrigin={"true"}
            checked={Boolean(enabled)}
            onChange={(e) => setEnabled(!enabled)}
          />
        </div>
      </div>
      <div className="flex h-[0.5px] w-full bg-gray-300 mb-2" />
      {enabled && (
        <motion.div
          initial={{ height: 0 }}
          animate={{ height: "auto" }}
          transition={{ duration: 0.3 }}
          className="flex flex-col px-1"
        >
          <div className="flex flex-col gap-1 my-1 px-1">
            {formData &&
              formData.map((tab, index) => (
                <div key={index} className="flex flex-col mb-2">
                  <LabelInput
                    label="Key"
                    placeholder=""
                    value={tab.name || ""}
                    onChange={(value: any) => handleChange(tab.id, value)}
                  />

                  <div className="flex my-2 gap-2">
                    <IconButton
                      onClick={handleOnSave}
                      size="sm"
                      color="blue-gray"
                      className="p-0 h-6 w-6"
                      title="save"
                    >
                      <CheckCircleIcon className="h-4 w-4" />
                    </IconButton>
                    <IconButton
                      onClick={() => remove(tab.id)}
                      size="sm"
                      color="red"
                      className="p-0 h-6 w-6"
                      title="remove tab"
                    >
                      <XCircleIcon className="h-4 w-4" />
                    </IconButton>
                  </div>
                </div>
              ))}

            <div className="inline-flex overflow-hidden relative justify-between items-center gap-2 my-1 border-dotted border-2 border-gray-300 px-1">
              <Button
                variant="text"
                size="sm"
                color="blue"
                className="inline-flex items-center gap-2 text-xs px-0"
                onClick={add}
              >
                Add Tab
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};
