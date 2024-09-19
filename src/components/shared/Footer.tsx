"use client";

import { COMPANY, FOOTER_CONTENT } from "@/app/company-info";
import { usePathname } from "next/navigation";

const FULL_ADDRESS = `(${COMPANY.addressPostcode}) ${COMPANY.address} ${COMPANY.addressDetail}`;

export default function Footer() {
  const pathname = usePathname();
  if (pathname === "/linktree") return;

  return (
    <footer>
      <ul>
        <li>{FULL_ADDRESS}</li>
        {FOOTER_CONTENT.map((item, index) => (
          <li key={index}>
            <label>{item.label}</label>
            <p>{item.content}</p>
          </li>
        ))}
      </ul>
      <p>{COMPANY.copyRight}</p>
    </footer>
  );
}
