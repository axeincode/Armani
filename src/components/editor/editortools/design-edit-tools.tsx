"use client";
import React from "react";
import {
  Typography,
  Input,
  Switch,
  Select,
  Option,
} from "@material-tailwind/react";
import ColorPicker from "../../ui/color-picker";
import { WebFontSelect } from "@/components/ui/webfont-select";
import { fontFaceTypes } from "@/components/ui/types/font-face-types";
import { useEditorDecksObserveable, useEditorObserveable } from "@/store";

export const DesignEditTools = () => {
  const editor$ = useEditorObserveable();
  const deckInfo = useEditorDecksObserveable();

  const [open, setOpen] = React.useState(false);
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

  const handleOnBackgroundChange = (e: string) => {
    editor$.updateDeckInfo(deckInfo?.id, "background", e);
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

  return (
    <div className="lg:w-52 flex overflow-hidden shadow-lg mr-1 bg-gray-100">
      <div className="flex flex-col flex-grow">
        <Typography variant="h6" color="gray">
          Design
        </Typography>
        <div className="flex flex-row justify-between px-2 items-center">
          <Typography variant="small" color="blue-gray" className="font-medium">
            Background
          </Typography>
          <ColorPicker
            open={open}
            value={deckInfo?.background || "#aabbcc"}
            onChange={(color) => handleOnBackgroundChange(color)}
          />
        </div>
        <div className="flex flex-row justify-between px-2 items-center">
          <Typography variant="small" color="blue-gray" className="font-medium">
            Sidebar
          </Typography>
          <ColorPicker
            open={open}
            value={deckInfo?.sidebar || "#aabbcc"}
            onChange={(color) => handleOnSidebarColorChange(color)}
          />
        </div>
        <div className="flex flex-row justify-between mt-1 px-2 items-start gap-2">
          <Typography
            variant="small"
            color="blue-gray"
            className="font-medium lg:w-8"
          >
            Font
          </Typography>
          <WebFontSelect
            font="Poppins"
            fontFaces={fontFaces}
            value={deckInfo?.fontFamily}
            onChange={handleOnFontChange}
          />
        </div>
        <div className="flex flex-row justify-between px-2 items-center">
          <Typography variant="small" color="blue-gray" className="font-medium">
            Shadow
          </Typography>
          <Switch
            value={deckInfo?.shadow}
            onChange={handleOnShadowChange}
            crossOrigin={"true"}
          />
        </div>
      </div>
    </div>
  );
};
