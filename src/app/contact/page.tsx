import EstimateForm from "@/components/contact/EstimateForm";
import Workflow from "@/components/contact/Workflow";
import DividerDot from "@/components/shared/DividerDot";
import Image from "next/image";

export default function page() {
  return (
    <div className="layout contents-center mt-[100px] h-full flex-col">
      <Image src={"/title/contact.svg"} alt="logo" width={480} height={137}></Image>
      <DividerDot />
      <Workflow />
      <div className="h-1 w-full bg-black" />
      <EstimateForm />
    </div>
    // <div className="contents-center layout mt-102 flex-col gap-20 md:w-10/12 xl:flex-row xl:items-start">
    //   <EstimateForm />
    // </div>
  );
}
