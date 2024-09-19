import Link from "next/link";

export default function LinkButtons() {
  return (
    <div className="contents-center mb-[25px] mt-[12px] gap-[5px] xl:mb-[50px] xl:gap-[10px]">
      <Link href={"/about"} className="link-button">
        소개
      </Link>
      <Link href={"/portfolio/signage"} className="link-button">
        포트폴리오
      </Link>
      <Link href={"/contact"} className="link-button">
        문의
      </Link>
    </div>
  );
}
