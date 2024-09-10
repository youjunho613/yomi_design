import Image from "next/image";
import DividerDot from "./DividerDot";

interface IProps {
  title: "about" | "signage" | "branding" | "contact";
}

export default function PageTitle({ title }: IProps) {
  switch (title) {
    case "about":
      return (
        <>
          <Image src={"/title/about.svg"} alt={title} width={688} height={180} />
          <DividerDot />
        </>
      );
    case "signage":
      return (
        <>
          <Image src={"/title/signage.svg"} alt={title} width={494} height={180} />
          <DividerDot />
        </>
      );
    case "branding":
      return (
        <>
          <Image src={"/title/branding.svg"} alt={title} width={574} height={180} />
          <DividerDot />
        </>
      );
    case "contact":
      return (
        <>
          <Image src={"/title/contact.svg"} alt={title} width={630} height={180} />
          <DividerDot />
        </>
      );

    default:
      return <></>;
  }
}
