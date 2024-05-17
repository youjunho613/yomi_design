"use client";

import { COMPANY } from "@/app/company-info";
import Image from "next/image";
import Link from "next/link";

export default function SocialBox() {
  const isMobile = /iPhone|iPad|iPod|Android/i.test(window.navigator.userAgent);

  return (
    <div className="contents-between gap-[6px]">
      {isMobile ? (
        <Link href={`tel:${COMPANY.phone}`} target="_blank" className="social-button">
          <div>
            <Image objectFit="cover" layout="fill" src="/social-phone.svg" alt="전화문의" />
          </div>
          전화문의
        </Link>
      ) : (
        <Link href={"/tel"} target="_blank" className="social-button">
          <div>
            <Image objectFit="cover" layout="fill" src="/social-phone.svg" alt="전화문의" />
          </div>
          전화문의
        </Link>
      )}

      <Link href={COMPANY.kakaoTalk} target="_blank" className="social-button">
        <div>
          <Image objectFit="cover" layout="fill" src="/social-kakao.svg" alt="카톡상담" />
        </div>
        카톡상담
      </Link>
      <Link href={COMPANY.instagram} target="_blank" className="social-button">
        <div>
          <Image objectFit="cover" layout="fill" src="/social-insta.svg" alt="인스타그램" />
        </div>
        인스타그램
      </Link>
      <Link href={COMPANY.naverBlog} target="_blank" className="social-button">
        <div>
          <Image objectFit="cover" layout="fill" src="/social-naver_blog.svg" alt="블로그" />
        </div>
        블로그
      </Link>
    </div>
  );
}
