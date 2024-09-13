import { aggro } from "@/app/fonts/font";
import Image from "next/image";

export default function IntroduceText() {
  return (
    <div className="contents-center flex-col">
      <div className="relative aspect-[300/121] w-[52.7%] lg:w-[300px]">
        <Image src={"/home-logo.svg"} alt="logo" fill className="object-contain" />
      </div>
      <h2 className={`${aggro.className} text-[8.3vw] lg:text-[60px]`}>간판은? 요미디자인!</h2>
      <p className="text-center text-[3.5vw] lg:text-[20px]">
        매장의 얼굴 = 간판, 디자인부터 제작, 시공까지 한 번에 요미디자인에서 진행해 보세요.
      </p>
    </div>
  );
}
