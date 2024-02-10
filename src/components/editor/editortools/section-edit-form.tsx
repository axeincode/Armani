import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Typography,
  IconButton,
  Input,
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import { PageTypes } from "@/types/editor.types";
import { cn } from "@/lib/utils";
import { PlusCircleIcon, ArchiveBoxXMarkIcon } from "@heroicons/react/24/solid";
import { useEditorDecksObserveable, useEditorObserveable } from "@/store";
import { useEditorPagesObserveable } from "@/hooks/useEditorPagesObserveable";
import { DynamicHeroIcon } from "@/components/ui/DynamicHeroIcon";
import { map, reduce } from "lodash";
import { v4 } from "uuid";
import { produce } from "immer";

export type SectionEditFormProps = {
  page: PageTypes;
  onChange?: (pageId: string, name: string) => void;
  onIconChange?: (pageId: string, iconName: string) => void;
};

const PageIcons = [
  {
    id: 1,
    iconName: "Squares2X2Icon",
  },
  {
    id: 2,
    iconName: "QueueListIcon",
  },
  {
    id: 3,
    iconName: "BuildingOfficeIcon",
  },
  {
    id: 4,
    iconName: "BuildingLibraryIcon",
  },
  {
    id: 6,
    iconName: "BuildingOffice2Icon",
  },
  {
    id: 7,
    iconName: "BuildingStorefrontIcon",
  },
  {
    id: 8,
    iconName: "HomeModernIcon",
  },
  {
    id: 9,
    iconName: "HomeIcon",
  },
  {
    id: 10,
    iconName: "MapPinIcon",
  },
  {
    id: 11,
    iconName: "CubeTransparentIcon",
  },
  {
    id: 12,
    iconName: "ChartBarIcon",
  },
  {
    id: 13,
    iconName: "GlobeAsiaAustraliaIcon",
  },
  {
    id: 14,
    iconName: "UsersIcon",
  },
  {
    id: 15,
    iconName: "UserGroupIcon",
  },
  {
    id: 16,
    iconName: "AdjustmentsVerticalIcon",
  },
  {
    id: 17,
    iconName: "PresentationChartBarIcon",
  },
  {
    id: 18,
    iconName: "ChartBarSquareIcon",
  },
  {
    id: 19,
    iconName: "PresentationChartLineIcon",
  },
  {
    id: 20,
    iconName: "ArrowTrendingDownIcon",
  },
  {
    id: 21,
    iconName: "ArrowTrendingUpIcon",
  },
  {
    id: 21,
    iconName: "ArrowsPointingOutIcon",
  },
];

export const SectionEditForm = ({
  page,
  onChange,
  onIconChange,
}: SectionEditFormProps) => {
  const [pageInfo, setPageInfo] = React.useState<PageTypes>(page);

  React.useEffect(() => {
    setPageInfo(page);
  }, [page]);

  const onNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPageInfo(
      produce(pageInfo, (draft) => {
        draft.name = e.target.value;
      })
    );
  };

  const onLocalIconChange = (e: React.MouseEvent<HTMLButtonElement>) => {
    setPageInfo(
      produce(pageInfo, (draft) => {
        draft.iconName = e.currentTarget.value;
      })
    );
    if (onIconChange) {
      onIconChange(page.id, e.currentTarget.value);
    }
  };

  const onBlur = () => {
    if (onChange) {
      onChange(page.id, pageInfo.name || "");
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="w-36">
        <Input
          size="md"
          label="name"
          value={pageInfo.name || ""}
          id={pageInfo.id}
          onChange={onNameChange}
          crossOrigin={"true"}
          className="text-xs"
          onBlur={onBlur}
        />
      </div>
      <div className="flex flex-row gap-2 flex-wrap">
        {map(PageIcons, ({ id, iconName }) => {
          return (
            <IconButton
              size="sm"
              key={iconName}
              variant="text"
              className="p-0 m-0 h-5 w-5 min-w-0 rounded-full"
              id={pageInfo.id}
              data-testid="icon-button"
              value={iconName}
              onClick={onLocalIconChange}
            >
              <DynamicHeroIcon
                key={id}
                className={cn(
                  "h-4 w-4",
                  iconName === pageInfo.iconName && "bg-blue-700 text-white"
                )}
                icon={iconName}
              />
            </IconButton>
          );
        })}
      </div>
    </div>
  );
};
