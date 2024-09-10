import Link from "next/link";

export default function LinkButtons() {
  return (
    <div className="contents-center mb-[50px] mt-[12px] gap-[10px]">
      <Link href={"/about"} className="link-button">
        소개
      </Link>
      <Link href={""} className="link-button">
        포트폴리오
      </Link>
      <Link href={"/contact"} className="link-button">
        문의
      </Link>
    </div>
  );
}