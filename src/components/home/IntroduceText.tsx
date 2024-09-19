import { aggro } from "@/app/fonts/font";
import Image from "next/image";

export default function IntroduceText() {
  return (
    <div className="contents-center layout select-none flex-col">
      <div className="relative aspect-[300/121] w-[52.7%] lg:w-[300px]">
        <Image src={"/home-logo.svg"} alt="logo" fill className="object-contain" />
      </div>
      <h2 className={`${aggro.className} mt-3 text-[8.3vw] leading-[100%] lg:text-[60px] xl:mt-5`}>
        간판은? 요미디자인!
      </h2>
      <p className="text-center text-[3.5vw] leading-[120%] lg:text-[20px]">
        매장의 얼굴 = 간판
        <br />
        디자인부터 제작, 시공까지 한번에 요미디자인에서 진행해 보세요.
      </p>
    </div>
  );
}
