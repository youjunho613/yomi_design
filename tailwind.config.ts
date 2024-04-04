import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      boxShadow: { button: "#1f1f1f 5px 5px 0px 0px" },
      colors: {
        black001: "#1a1a1a",
        black002: "#1f1f1f",
        main: "#fef4e8",
        sub: "#ea5456",
      },
    },
  },
  plugins: [],
};
export default config;
