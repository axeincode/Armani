"use client";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemeProviderProps } from "next-themes/dist/types";
import { ThemeProvider as MTThemeProviver } from "@material-tailwind/react";

export default function ThemeProvider({
  children,
  ...props
}: ThemeProviderProps) {
  return (
    <MTThemeProviver>
      <NextThemesProvider {...props}>{children}</NextThemesProvider>
    </MTThemeProviver>
  );
}
