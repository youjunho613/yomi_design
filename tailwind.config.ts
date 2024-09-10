import { Config } from "tailwindcss/types/config";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        pretendard: ["var(--font-pretendard)", "sans-serif"],
        montserrat: ["var(--font-montserrat)", "sans-serif"],
      },
      boxShadow: {
        button: "#1f1f1f 5px 5px 0px 0px",
        custom1:
          "rgba(0, 0, 0, 0.09) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px",
        custom2: "rgba(136, 165, 191, 0.48) 6px 2px 16px 0px, rgba(255, 255, 255, 0.8) -6px -2px 16px 0px",
        custom3: "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px",
      },
      colors: {
        black: "#000000",
        black001: "#1a1a1a",
        black002: "#1f1f1f",
        gray001: "#B5B5B5",
        gray002: "#C9CACA",
        gray003: "#EFEFEF",
        main: "#fef4e8",
        sub: "#ea5456",
        subsoft: "#f28183",
      },
      borderWidth: {
        "3": "3px",
        "22": "22px",
      },
      spacing: {
        "5.5": "1.375rem",
        "7.5": "1.875rem",
        "13": "3.25rem",
        "15": "3.75rem",
        layout: "80%",
      },
      keyframes: {
        "before-typing": { "0%": { width: "0" }, "50%": { width: "0" } },
        "after-typing": { "0%": { width: "0" }, "50%": { width: "0" } },
        "blink-caret": { "50%": { borderColor: "transparent" } },
      },
      animation: {
        "before-typing": "before-typing 0.5s 1s steps(6), blink-caret 0.5s step-end alternate",
        "after-typing": "after-typing 1s 1s steps(6), blink-caret 0.5s step-end infinite alternate",
      },
    },
  },
};
export default config;
