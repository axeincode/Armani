import "@/styles/globals.scss";
import ThemeProvider from "@/components/theme-provider";
import type { Metadata } from "next";
import { Ubuntu } from "next/font/google";
import Analytics from "@/components/analytics";
import { registerLicense } from "@syncfusion/ej2-base";

const ubuntu = Ubuntu({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

export const metadata: Metadata = {
  title: "Canari",
  description: "Canari Solutions",
};

// Registering Syncfusion license key
registerLicense(
  "Ngo9BigBOggjHTQxAR8/V1NBaF5cXmZCf1FpRmJGdld5fUVHYVZUTXxaS00DNHVRdkdnWXpfeHZXQ2dfWEFyX0Y="
);

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
