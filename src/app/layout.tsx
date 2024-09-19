import Vercel from "@/components/accessibility/Vercel";
import Footer from "@/components/shared/Footer";
import Header from "@/components/shared/header/Header";
import ReactQueryProviders from "@/hook/useReactQuery";
import type { Metadata } from "next";
import { ToastContainer } from "react-toastify";
import { COMPANY } from "./company-info";
import { pretendard } from "./fonts/font";

import "react-toastify/dist/ReactToastify.css";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(COMPANY.url),
  title: COMPANY.name,
  description: COMPANY.description,
  keywords: ["간판", "로고", "디자인", "사인물", "인쇄물"],
  authors: [{ name: COMPANY.name, url: COMPANY.url }],
  alternates: { canonical: "/" },
  verification: {
    google: "Giim6G-Ft1Am7_ngrovrawbuHfQQzEhg30jOhKutyek",
    other: { "naver-site-verification": ["40a9d008f18e219e238c9285c9a689a80ef1d80c"] },
  },
  openGraph: {
    title: COMPANY.name,
    description: COMPANY.description,
    images: [{ url: "/opengraph-image.jpg", alt: "About Yomi-design", width: 1200, height: 630 }],
    siteName: COMPANY.name,
    locale: "ko_KR",
    type: "website",
  },
};

interface IProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: IProps) {
  return (
    <html lang="ko">
      <body>
        <ReactQueryProviders>
          <Header />
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
