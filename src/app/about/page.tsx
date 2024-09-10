import { ABOUT_CONTENT } from "@/app/about/content";
import AboutContents from "@/components/about/AboutContent";
import DividerDot from "@/components/shared/DividerDot";
import Image from "next/image";

export default function page() {
  return (
    <div className="layout contents-center mt-[100px] select-none flex-col">
      <Image src={"/title/about.svg"} alt="logo" width={738} height={193}></Image>
      <DividerDot />
      <ul className="flex flex-col gap-[70px]">
        {ABOUT_CONTENT.map((item, index) => (
          <AboutContents item={item} index={index} />
        ))}
      </ul>
    </div>
  );
}
