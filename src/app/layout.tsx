import Vercel from "@/components/accessibility/Vercel";
import Footer from "@/components/shared/Footer";
import NewHeader from "@/components/shared/header/New-Header";
import ReactQueryProviders from "@/hook/useReactQuery";
import type { NextFont } from "next/dist/compiled/@next/font";
import localFont from "next/font/local";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import "./globals.css";

/*
import type { Metadata } from "next";


export const metadata: Metadata = {
  metadataBase: new URL("https://yomi-design.com"),
  title: "요미디자인",
  description: "아이덴티티와 디자인을 연결하다.",
  keywords: ["간판", "로고", "디자인", "사인물", "인쇄물"],
  authors: [{ name: "요미디자인", url: "https://yomi-design.com" }],
  alternates: { canonical: "/" },
  verification: {
    google: "Giim6G-Ft1Am7_ngrovrawbuHfQQzEhg30jOhKutyek",
    other: { "naver-site-verification": ["40a9d008f18e219e238c9285c9a689a80ef1d80c"] },
  },
  openGraph: {
    title: "요미디자인",
    description: "아이덴티티와 디자인을 연결하다.",
    images: [{ url: "/opengraph-image.png", alt: "About Yomi-design", width: 1200, height: 630 }],
    siteName: "요미디자인",
    locale: "ko_KR",
    type: "website",
  },
};
*/

export const pretendard: NextFont = localFont({
  src: [
    { path: "/fonts/Pretendard-Regular.woff2", weight: "400", style: "normal" },
    { path: "/fonts/Pretendard-Bold.woff2", weight: "700", style: "normal" },
  ],
});

export const montserrat: NextFont = localFont({
  src: [{ path: "/fonts/Montserrat-Black.ttf", weight: "900", style: "normal" }],
});

interface IProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: IProps) {
  return (
    <html lang="ko">
      <body>
        <ReactQueryProviders>
          <NewHeader />
          <main className={`${pretendard.className}`}>
            {children}
            <Vercel />
          </main>
          <Footer />
        </ReactQueryProviders>
        <div id="modal-root" />
        <ToastContainer pauseOnFocusLoss closeOnClick autoClose={2000} position="top-right" />
      </body>
    </html>
  );
}
