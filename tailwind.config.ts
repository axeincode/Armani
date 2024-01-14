import type { Config } from "tailwindcss";
const withMT = require("@material-tailwind/react/utils/withMT");

const config: Config = withMT({
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@tremor/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: ["class"],
  theme: {
    extend: {
      colors: {
        "gray-1": "var(--gray-1)",
        "gray-2": "var(--gray-2)",
        "gray-3": "var(--gray-3)",
        background: "var(--background-color)",
        foreground: "var(--foreground)",

        tremor: {
          background: {
            DEFAULT: "var(--background-color)",
          },
          border: {
            DEFAULT: "var(--gray-2)",
          },
          ring: {
            DEFAULT: "var(--gray-2)",
          },
          content: {
            subtle: "var(--gray-2)",
            DEFAULT: "var(--gray-1)",
            emphasis: "var(--foreground)",
          },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
});
export default config;
