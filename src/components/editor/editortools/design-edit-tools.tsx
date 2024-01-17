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

export const DesignEditTools = () => {
  const [color, setColor] = React.useState("#aabbcc");
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
            value={color}
            onChange={(color) => setColor(color)}
          />
        </div>
        <div className="flex flex-row justify-between px-2 items-center">
          <Typography variant="small" color="blue-gray" className="font-medium">
            Sidebar
          </Typography>
          <ColorPicker
            open={open}
            value={color}
            onChange={(color) => setColor(color)}
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
          <WebFontSelect font="Poppins" fontFaces={fontFaces} />
        </div>
        <div className="flex flex-row justify-between px-2 items-center">
          <Typography variant="small" color="blue-gray" className="font-medium">
            Shadow
          </Typography>
          <Switch defaultChecked crossOrigin={"true"} />
        </div>
      </div>
    </div>
  );
};
