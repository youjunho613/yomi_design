import { COMPANY } from "@/app/company-info";
import Image from "next/image";
import Link from "next/link";

export default function BottomNav() {
  return (
    <nav className="bottom-navigation">
      <ul>
        <li>
          <Link href={`tel:${COMPANY.phone}`} target="_blank">
            <Image src="/social-phone.svg" alt="전화문의" width={16} height={16} />
            <p>전화문의</p>
          </Link>
        </li>
        <li>
          <Link href={COMPANY.kakaoTalk} target="_blank">
            <Image src="/social-kakao.svg" alt="카톡상담" width={16} height={16} />
            <p>카톡상담</p>
          </Link>
        </li>
        <li>
          <Link href={COMPANY.instagram} target="_blank">
            <Image src="/social-insta.svg" alt="인스타그램" width={16} height={16} />
            <p>인스타그램</p>
          </Link>
        </li>
        <li>
          <Link href={COMPANY.naverBlog} target="_blank">
            <Image src="/social-naver_blog.svg" alt="블로그" width={16} height={16} />
            <p>블로그</p>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
