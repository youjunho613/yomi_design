import SocialBox from "@/components/home/SocialBox";
import Image from "next/image";

export default function MainVisual() {
  return (
    <div className="contents-between w-layout flex-col  gap-[14px] lg:flex-row-reverse lg:items-end">
      <Image width={353} height={235} src="/home-logo.png" alt="로고" className="w-4/6 max-w-[353px]" />
      <div className="flex -translate-y-1 flex-col justify-center gap-[16px]">
        <Image
          width={530}
          height={143}
          src="/home-decs.png"
          alt="아이덴티티와 디자인을 연결하다"
          className="w-full max-w-[530px]"
        />
        <SocialBox />
      </div>
    </div>
  );
}
