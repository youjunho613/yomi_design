import Image from "next/image";
import DividerDot from "./DividerDot";

interface IProps {
  title: "about" | "signage" | "branding" | "contact";
}

export default function PageTitle({ title }: IProps) {
  switch (title) {
    case "about":
      return (
        <div className="contents-center w-full flex-col">
          <div className="relative aspect-[688/180] w-[53vw]">
            <Image src={"/title/about.svg"} alt={title} fill className="object-contain" />
          </div>
          <DividerDot />
        </div>
      );
    case "signage":
      return (
        <div className="contents-center w-full flex-col">
          <div className="relative aspect-[494/180] w-[38vw]">
            <Image src={"/title/signage.svg"} alt={title} fill className="object-contain" />
          </div>
          <DividerDot />
        </div>
      );
    case "branding":
      return (
        <div className="contents-center w-full flex-col">
          <div className="relative aspect-[574/180] w-[44vw]">
            <Image src={"/title/branding.svg"} alt={title} fill className="object-contain" />
          </div>
          <DividerDot />
        </div>
      );
    case "contact":
      return (
        <div className="contents-center w-full flex-col">
          <div className="relative aspect-[630/180] w-[49vw]">
            <Image src={"/title/contact.svg"} alt={title} fill className="object-contain" />
          </div>
          <DividerDot />
        </div>
      );

    default:
      return <></>;
  }
}
