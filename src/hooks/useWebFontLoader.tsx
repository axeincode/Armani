"use client";
import filter from "lodash/filter";
import React, { useState, useEffect, useCallback } from "react";

export const useWebFontLoader = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [fontsLoaded, setFontsLoaded] = useState<string[]>([]);

  useEffect(() => {
    // dnamically improt webfons
    const WebFont = require("webfontloader");
    // load initial fonts
    const fontsReq = [
      "Poppins: 400,500,700",
      "PT Serif: 400,700",
      "Roboto Mono",
      "Droid Sans",
      "Droid Serif",
      "Montserrat Subrayada: 400,500,700,800",
      "Inter: 400,700,900",
    ];
    try {
      WebFont.load({
        google: {
          families: fontsReq,
        },
        loading: () => setIsLoading(true),
        active: () => {
          setFontsLoaded(fontsReq);
          setIsLoading(false);
        },
      });
    } catch (e) {
      console.error("Font Loading Failed:");
    }
  }, []);

  const loadWebFontCallback = useCallback(
    (fonts: string[], cb?: () => void) => {
      try {
        const WebFont = require("webfontloader");
        const fontsToLoad = filter(fonts, (f) => !fontsLoaded.includes(f));
        // @ts-ignore
        const uniqueFontsToLoad = [...new Set(fontsToLoad)];
        const loaded = fontsLoaded.concat(uniqueFontsToLoad);
        WebFont.load({
          google: {
            families: fontsToLoad,
          },
          loading: () => setIsLoading(true),
          active: () => {
            setFontsLoaded(loaded);
            setIsLoading(false);
            if (cb) {
              cb();
            }
          },
        });
      } catch (e) {
        if (cb) {
          cb();
        }
        console.warn("Font Loading Failed:");
      }
    },
    [fontsLoaded]
  );

  return {
    fontsLoaded,
    isLoading,
    loadWebFontCallback,
  };
};
