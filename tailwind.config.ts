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
        button: "1px 3px 0px 0px #000",
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
      backgroundPosition: {
        "check-15": "0 0, 15px 15px",
        "check-20": "0 0, 20px 20px",
        "check-30": "0 0, 30px 30px",
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
        infiniteSlide: { "0%": { transform: "translateX(0)" }, "100%": { transform: "translateX(-50%)" } },
      },
      animation: {
        "before-typing": "before-typing 0.5s 1s steps(6), blink-caret 0.5s step-end alternate",
        "after-typing": "after-typing 1s 1s steps(6), blink-caret 0.5s step-end infinite alternate",
        infiniteSlide: "infiniteSlide 20s linear infinite",
      },
    },
  },
};
export default config;
