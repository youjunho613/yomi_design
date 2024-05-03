import SocialBox from "@/components/home/SocialBox";
import Image from "next/image";

export default function MainVisual() {
  return (
    <div className="contents-between flex-col gap-10 xl:flex-row-reverse">
      <Image width={353} height={235} src="/home-logo.png" alt="로고" className="w-full" />
      <div className="flex flex-col justify-center gap-6">
        <Image width={530} height={143} src="/home-decs.png" alt="아이덴티티와 디자인을 연결하다" className="w-full" />
        <SocialBox />
      </div>
    </div>
  );
}
