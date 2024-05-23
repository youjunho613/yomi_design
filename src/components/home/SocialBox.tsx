"use client";

import { COMPANY } from "@/app/company-info";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";

export default function SocialBox() {
  // let isMobile = false;
  // if (typeof window !== "undefined") {
  //   isMobile = /iPhone|iPad|iPod|Android/i.test(window.navigator.userAgent);
  // }
  const isMobile = useRef(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      isMobile.current = /iPhone|iPad|iPod|Android/i.test(window.navigator.userAgent);
      console.log("isMobile.current :", isMobile.current);
    }
  }, []);

  return (
    <div className="contents-between gap-[6px]">
      {isMobile ? (
        <Link href={`tel:${COMPANY.phone}`} target="_blank" className="social-button">
          <div>
            <Image src="/social-phone.svg" alt="전화문의" width={16} height={16} />
          </div>
          <span>전화문의</span>
        </Link>
      ) : (
        <Link href={"/tel"} target="_blank" className="social-button">
          <div>
            <Image src="/social-phone.svg" alt="전화문의" width={16} height={16} />
          </div>
          <span>전화문의</span>
        </Link>
      )}

      <Link href={COMPANY.kakaoTalk} target="_blank" className="social-button">
        <div>
          <Image src="/social-kakao.svg" alt="카톡상담" width={16} height={16} />
        </div>
        <span>카톡상담</span>
      </Link>
      <Link href={COMPANY.instagram} target="_blank" className="social-button">
        <div>
          <Image src="/social-insta.svg" alt="인스타그램" width={16} height={16} />
        </div>
        <span>인스타그램</span>
      </Link>
      <Link href={COMPANY.naverBlog} target="_blank" className="social-button">
        <div>
          <Image src="/social-naver_blog.svg" alt="블로그" width={16} height={16} />
        </div>
        <span>블로그</span>
      </Link>
    </div>
  );
}
