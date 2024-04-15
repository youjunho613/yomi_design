import Image from "next/image";
import Link from "next/link";

export default function Info() {
  return (
    <div className="contents-center flex-col gap-2.5">
      <Image src="/main_logo.svg" alt="로고 이미지" width={300} height={300} />
      <div className="contents-center flex-col gap-2.5 mt-9">
        <p className="text-lg text-center font-bold">상담 가능 시간</p>
        <div className="flex flex-col text-xs">
          <div className="flex gap-2.5 contents-center">
            <p>평　일</p>
            <p>10:00 - 19:00</p>
          </div>
          <div className="flex gap-2.5 contents-center">
            <p>토요일</p>
            <p>10:00 - 14:00</p>
          </div>
        </div>
        <p className="text-center">일요일 및 공휴일 휴무</p>
        <p className="mt-2.5 break-keep px-10">
          <Link href={"http://pf.kakao.com/_xoxfvgxj"}>
            카카오톡 채널 <span className="font-bold">요미디자인</span>
          </Link>
          으로 의뢰서 보내주시면 보다 빠른 견적 상담 가능합니다.
        </p>
      </div>
    </div>
  );
}
