"use client";

import { COMPANY, FOOTER_CONTENT } from "@/app/company-info";
import { usePathname } from "next/navigation";

const timeDifference = Date.now() - Date.parse("2024/11/15");
const FULL_ADDRESS =
  timeDifference > 0
    ? `(${COMPANY.futureAddressPostcode}) ${COMPANY.futureAddress} ${COMPANY.futureAddressDetail}`
    : `(${COMPANY.addressPostcode}) ${COMPANY.address} ${COMPANY.addressDetail}`;

export default function Footer() {
  console.log();

  const pathname = usePathname();
  if (pathname === "/linktree") return;
  if (pathname.includes("/admin")) return;

  return (
    <footer>
      <ul>
        <li className="flex gap-2">
          <p>{FULL_ADDRESS}</p>
          {/* <Link href={`https://map.naver.com/p/entry/place/1267078094?c=15.00,0,0,0,dh`} target="_blank">
            네이버 지도
          </Link> */}
        </li>
        {FOOTER_CONTENT.map((item, index) => (
          <li key={index}>
            <span>
              <b>{item.label}</b>
            </span>
            <p>{item.content}</p>
          </li>
        ))}
      </ul>
      <p>{COMPANY.copyRight}</p>
    </footer>
  );
}
