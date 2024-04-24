import SocialBox from "@/components/home/SocialBox";
import Image from "next/image";

export default function MainVisual() {
  return (
    <div className="contents-between flex-col gap-10 xl:flex-row-reverse">
      <picture>
        <source />
        <Image width={353} height={235} src="main_logo.svg" alt="로고" />
      </picture>
      <div className="flex flex-col justify-center gap-6">
        <Image width={530} height={143} src="/main_content.svg" alt="아이덴티티와 디자인을 연결하다" />
        <SocialBox />
      </div>
    </div>
  );
}
