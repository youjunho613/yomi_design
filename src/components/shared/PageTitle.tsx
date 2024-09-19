import Image from "next/image";
import DividerDot from "./DividerDot";

interface IProps {
  title: "about" | "signage" | "branding" | "contact";
}

const titleContent = {
  about: (
    <div className="relative aspect-[688/180] w-[53vw]">
      <Image src={"/title/about.svg"} alt={"about"} fill className="object-contain" />
    </div>
  ),
  signage: (
    <div className="relative aspect-[494/180] w-[38vw]">
      <Image src={"/title/signage.svg"} alt={"signage"} fill className="object-contain" />
    </div>
  ),
  branding: (
    <div className="relative aspect-[574/180] w-[44vw]">
      <Image src={"/title/branding.svg"} alt={"branding"} fill className="object-contain" />
    </div>
  ),
  contact: (
    <div className="relative aspect-[630/180] w-[49vw]">
      <Image src={"/title/contact.svg"} alt={"contact"} fill className="object-contain" />
    </div>
  ),
};

export default function PageTitle({ title }: IProps) {
  return (
    <div className="contents-center w-full flex-col">
      {titleContent[title]}
      <DividerDot />
    </div>
  );
}
