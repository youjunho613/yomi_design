import Footer from "@/components/shared/Footer";
import Header from "@/components/shared/header/Header";
import ReactQueryProviders from "@/hook/useReactQuery";
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

export const metadata: Metadata = {
  title: "요미디자인",
  description: "아이덴티티와 디자인을 연결하다.",
  keywords: ["간판", "로고", "디자인", "사인물", "인쇄물"],
  authors: [{ name: "요미디자인", url: "https://yomi-design.com" }],
};

export const myFont = localFont({
  src: [
    {
      path: "/fonts/GmarketSansTTFLight.ttf",
      weight: "100",
      style: "normal",
    },
    {
      path: "/fonts/GmarketSansTTFMedium.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "/fonts/GmarketSansTTFBold.ttf",
      weight: "600",
      style: "normal",
    },
  ],
  display: "block",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className={myFont.className}>
        <ReactQueryProviders>
          <Header />
          <main>{children}</main>
          <Footer />
        </ReactQueryProviders>
      </body>
    </html>
  );
}
