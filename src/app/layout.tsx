import Footer from "@/components/shared/Footer";
import Header from "@/components/shared/header/Header";
import ReactQueryProviders from "@/hook/useReactQuery";
import localFont from "next/font/local";
import { ReactNode } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./globals.css";

import type { Metadata } from "next";
import type { NextFont } from "next/dist/compiled/@next/font";

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

export const myFont: NextFont = localFont({
  src: "/fonts/PretendardVariable.woff2",
  display: "swap",
  variable: "--font-pretendard",
});

interface IProps {
  children: ReactNode;
}

export default function RootLayout({ children }: IProps) {
  return (
    <html lang="ko">
      <body className={`${myFont.className} contents-center min-h-screen flex-col bg-main pt-14`}>
        <ReactQueryProviders>
          <Header />
          <main className="layout my-14 min-h-fit grow-[1]">{children}</main>
          <Footer />
        </ReactQueryProviders>
        <div id="modal-root" />
        <ToastContainer pauseOnFocusLoss closeOnClick autoClose={2000} position="top-right" />
      </body>
    </html>
  );
}
