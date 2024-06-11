import Link from "next/link";
import { COMPANY } from "../company-info";

export default function Page() {
  return (
    <div className="flex flex-col gap-2">
      <ul className="flex flex-col gap-2 border border-black">
        <li>
          <Link href={`tel:${COMPANY.phone}`}>
            <p>전화 문의</p>
          </Link>
        </li>
        <li>
          <Link href={COMPANY.kakaoTalk}>
            <p>카카오톡 문의</p>
          </Link>
        </li>
        <li>
          <Link href={"/"}>
            <p>홈페이지</p>
          </Link>
        </li>
        <li>
          <Link href={COMPANY.instagram}>
            <p>인스타그램</p>
          </Link>
        </li>
        <li>
          <Link href={COMPANY.naverBlog}>
            <p>네이버 블로그</p>
          </Link>
        </li>
      </ul>
      <div className="border border-black">
        <p>영업시간 : {COMPANY.businessHours}</p>
        <p>{COMPANY.businessDay}</p>
      </div>
    </div>
  );
}
