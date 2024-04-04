import Image from "next/image";
import Link from "next/link";

export default function SocialBox() {
  return (
    <div className="flex gap-2.5">
      <Link href={"tel:010-7225-0870"} target="_blank" className="main-button">
        <Image width={17} height={13} src="/phone.svg" alt="전화문의" />
        전화문의
      </Link>
      <button className="main-button">
        <Image width={15} height={13} src="/kakao.svg" alt="카톡상담" />
        카톡상담
      </button>
      <Link href={"https://www.instagram.com/yomi_design_/"} target="_blank" className="main-button">
        <Image width={13} height={13} src="/insta.svg" alt="인스타그램" />
        인스타그램
      </Link>
      <Link href={"https://blog.naver.com/yomi_design"} target="_blank" className="main-button">
        <Image width={15} height={13} src="/naver_blog.svg" alt="블로그" />
        블로그
      </Link>
    </div>
  );
}
