import "@/styles/globals.css";
import ThemeProvider from "@/components/theme-provider";
import type { Metadata } from "next";
import { Ubuntu } from "next/font/google";
import Analytics from "@/components/analytics";
import ToastifyContainer from "@/components/toastify";

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
      <body className={`flex flex-col h-screen w-screen ${ubuntu.className}`}>
        <ThemeProvider attribute="light" disableTransitionOnChange>
          {children}
        </ThemeProvider>
        <Analytics />
        <ToastifyContainer />
      </body>
    </html>
  );
}
