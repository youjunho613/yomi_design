import company from "@/app/company-info";
import Image from "next/image";
import Link from "next/link";

export default function SocialBox() {
  return (
    <div className="flex gap-2.5">
      <Link href={`tel:${company.phone}`} target="_blank" className="main-button">
        <Image width={17} height={13} src="/phone.svg" alt="전화문의" />
        전화문의
      </Link>
      <Link href={company.kakaoTalk} target="_blank" className="main-button">
        <Image width={15} height={13} src="/kakao.svg" alt="카톡상담" />
        카톡상담
      </Link>
      <Link href={company.instagram} target="_blank" className="main-button">
        <Image width={13} height={13} src="/insta.svg" alt="인스타그램" />
        인스타그램
      </Link>
      <Link href={company.naverBlog} target="_blank" className="main-button">
        <Image width={15} height={13} src="/naver_blog.svg" alt="블로그" />
        블로그
      </Link>
    </div>
  );
}
