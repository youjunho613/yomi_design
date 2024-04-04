import Image from "next/image";

export default function Info() {
  return (
    <div className="flex flex-col gap-2.5">
      <Image src="/main_logo.svg" alt="로고 이미지" width={300} height={300} />
      <div className="flex flex-col justify-center w-[140px] gap-2.5 mt-[35px]">
        <p className="text-lg text-center font-bold">상담 가능 시간</p>
        <div className="flex flex-col text-xs">
          <div className="flex gap-2.5">
            <p className="w-[40px]">
              평<span className="invisible tracking-tight">&nbsp;&nbsp;&nbsp;</span>일
            </p>
            <p className="w-[90px]">10:00 - 19:00</p>
          </div>
          <div className="flex gap-2.5">
            <p className="w-[40px]">토요일</p>
            <p className="w-[90px]">10:00 - 14:00</p>
          </div>
        </div>
        <p className="text-xs text-center">일요일 및 공휴일 휴무</p>
        <p className="text-[9px] mt-2.5 w-[125px]">
          카카오톡 채널 <b>요미디자인</b>으로 의뢰서 보내주시면 보다 빠른 견적 상담 가능합니다.
        </p>
      </div>
    </div>
  );
}
