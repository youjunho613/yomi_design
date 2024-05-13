"use client";

import { COMPANY } from "@/app/company-info";
import Image from "next/image";
import Link from "next/link";
import { isMobile } from "react-device-detect";

export default function SocialBox() {
  return (
    <div className="contents-center flex-nowrap gap-1.5 text-[7px] md:justify-start md:gap-2.5 md:text-sm">
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
