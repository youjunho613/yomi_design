"use client";

import { COMPANY } from "@/app/company-info";
import Image from "next/image";
import Link from "next/link";

export default function SocialBox() {
  return (
    <div className="contents-between w-full max-w-[530px] gap-[6px]">
      <Link href={`tel:${COMPANY.phone}`} target="_blank" className="social-button">
        <div>
          <Image src="/social-phone.svg" alt="전화문의" width={16} height={16} />
        </div>
        <span>전화문의</span>
      </Link>

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
