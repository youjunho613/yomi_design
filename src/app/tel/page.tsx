import Image from "next/image";
import { COMPANY } from "../company-info";

export default function Tel() {
  return (
    <div className="contents-center flex w-full">
      <Image src={"/contact_qrcode.png"} width={500} height={500} alt={COMPANY.phone} className="rounded-full" />
    </div>
  );
}
