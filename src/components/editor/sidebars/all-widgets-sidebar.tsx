import React from "react";
import {
  Typography,
  List,
  ListItem,
  ListItemSuffix,
  IconButton,
  Switch,
} from "@material-tailwind/react";
import { ChevronLeftIcon, PlusCircleIcon } from "@heroicons/react/24/solid";
import { useCurrentPageObserveable } from "@/hooks/useCurrentPageObserveable";
import { WidgetEnum } from "@/types";
import { v4 } from "uuid";
import { useEditorDecksObserveable, useEditorObserveable } from "@/store";
import { WidgetTypes } from "@/types/editor.types";
import ColorPicker from "@/components/ui/color-picker";
import { fontFaceTypes } from "@/components/ui/types/font-face-types";
import { WebFontSelect } from "@/components/ui/webfont-select";

export type AllWidgetsSidebarProps = {
  toggleDrawer: () => void;
};

export function AllWidgetsSidebar({ toggleDrawer }: AllWidgetsSidebarProps) {
  const [open, setOpen] = React.useState(0);
  const [openColor, setOpenColor] = React.useState(false);
  const currentPage$ = useCurrentPageObserveable();
  const editor$ = useEditorObserveable();
  const deckInfo = useEditorDecksObserveable();
  const [fontFaces, setFontFaces] = React.useState<fontFaceTypes[]>([]);

  React.useEffect(() => {
    const fetchFonts = async () => {
      const fontdata = await fetch("/assets/googlefonts.json");
      const fonts = await fontdata.json();
      const fontFaces = fonts.items.map((font: any) => {
        return {
          fontFamily: font.family,
          fontStyle: font.variants,
          fontWeight: font.variants,
        };
      });
      setFontFaces(fontFaces);
    };
    fetchFonts();
  }, []);

  console.log("currentPage$", currentPage$);
  const handleOpen = (value: number) => {
    setOpen(open === value ? 0 : value);
  };

  const handleOnBackgroundChange = (e: string) => {
    editor$.updateDeckInfo(deckInfo?.id, "background", e);
  };

  const handleOnNavbarColorChange = (e: string) => {
    editor$.updateDeckInfo(deckInfo?.id, "navbar", e);
  };

  const handleOnSidebarColorChange = (e: string) => {
    editor$.updateDeckInfo(deckInfo?.id, "sidebar", e);
  };

  const handleOnShadowChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    editor$.updateDeckInfo(deckInfo?.id, "shadow", Boolean(e.target.checked));
  };

  const handleOnFontChange = (e: string) => {
    editor$.updateDeckInfo(deckInfo?.id, "fontFamily", e);
  };

  const handleOnAddWidget = (widgetType: WidgetEnum) => {
    const pageId = currentPage$.pageId;
    switch (widgetType) {
      case WidgetEnum.CARD:
      case WidgetEnum.FRAME:
        const pageId = currentPage$.pageId;
        if (pageId) {
          const widgetdata: WidgetTypes = {
            type: widgetType,
            id: v4(),
            transformation: {
              x: 0,
              y: 0,
              width: 400,
              height: 400,
            },
            title: "Card Title",
            subtitle: "Card Subtitle",
            captionEnabled: false,
            captionTitle: "Caption Title",
            captionSubtitle: "Caption Subtitle",
            images: [],
            enableElements: false,
          };
          editor$.addWidget(pageId, widgetdata);
        }
        break;
      case WidgetEnum.TABLE:
        if (pageId) {
          const widgetdata: WidgetTypes = {
            type: WidgetEnum.TABLE,
            id: v4(),
            transformation: {
              x: 0,
              y: 0,
              width: 800,
              height: 800,
            },
            title: "Table Title",
            subtitle: "Table Subtitle",
            captionEnabled: false,
            captionTitle: "Table Title",
            captionSubtitle: "Table Subtitle",
            enableElements: false,
          };
          editor$.addWidget(pageId, widgetdata);
        }
        break;
      default:
        break;
    }
  };

  return (
    <>
      <div className="mb-2 p-2 flex justify-between">
        <Typography variant="h5" color="blue-gray">
          Design
        </Typography>
        <div className="h-5 w-5 min-w-0">
          <IconButton
            variant="outlined"
            size="sm"
            onClick={toggleDrawer}
            className="p-0 m-0 h-5 w-5 min-w-0 rounded-full"
            title="close"
          >
            <ChevronLeftIcon className="h-4 w-4" />
          </IconButton>
        </div>
      </div>
      <List className="min-w-[10px]">
        <ListItem onClick={() => handleOnAddWidget(WidgetEnum.FRAME)}>
          Frame
          <ListItemSuffix>
            <PlusCircleIcon className="h-5 w-5" />
          </ListItemSuffix>
        </ListItem>
        <ListItem>
          Background
          <ListItemSuffix>
            <ColorPicker
              open={openColor}
              value={deckInfo?.background || "#aabbcc"}
              onChange={(color) => handleOnBackgroundChange(color)}
            />
          </ListItemSuffix>
        </ListItem>
        <ListItem>
          Navbar
          <ListItemSuffix>
            <ColorPicker
              open={openColor}
              value={deckInfo?.navbar || "#aabbcc"}
              onChange={(color) => handleOnNavbarColorChange(color)}
            />
          </ListItemSuffix>
        </ListItem>
        <ListItem>
          Sidebar
          <ListItemSuffix>
            <ColorPicker
              open={openColor}
              value={deckInfo?.sidebar || "#aabbcc"}
              onChange={(color) => handleOnSidebarColorChange(color)}
            />
          </ListItemSuffix>
        </ListItem>
        <ListItem>
          Font
          <ListItemSuffix>
            <WebFontSelect
              font="Poppins"
              fontFaces={fontFaces}
              value={deckInfo?.fontFamily}
              onChange={handleOnFontChange}
            />
          </ListItemSuffix>
        </ListItem>
        <ListItem>
          Shadow
          <ListItemSuffix>
            <Switch
              checked={Boolean(deckInfo?.shadow)}
              onChange={handleOnShadowChange}
              crossOrigin={"true"}
            />
          </ListItemSuffix>
        </ListItem>
      </List>
    </>
  );
}
