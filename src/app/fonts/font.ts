import type { NextFont } from "next/dist/compiled/@next/font";
import localFont from "next/font/local";

export const pretendard: NextFont = localFont({
  src: [
    { path: "Pretendard-Regular.woff2", weight: "400", style: "normal" },
    { path: "Pretendard-Bold.woff2", weight: "700", style: "normal" },
  ],
});

export const montserrat: NextFont = localFont({
  src: [{ path: "Montserrat-Black.ttf", weight: "900", style: "normal" }],
});

export const aggro: NextFont = localFont({
  src: [{ path: "Aggro-Bold.ttf", weight: "700", style: "normal" }],
});
