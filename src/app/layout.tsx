import "@/styles/globals.css";
import ThemeProvider from "@/components/theme-provider";
import type { Metadata } from "next";
import { Ubuntu } from "next/font/google";
import Analytics from "@/components/analytics";

const ubuntu = Ubuntu({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

export const metadata: Metadata = {
  title: "Canari",
  description: "Canari Solutions",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`flex flex-col h-full w-full ${ubuntu.className}`}>
        <ThemeProvider attribute="light" disableTransitionOnChange>
          {children}
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
