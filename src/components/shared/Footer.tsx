"use client";

import company from "@/app/company-info";
import { copyToClipboard } from "@/utils/clipboard";

const FOOTER_CONTENT = [
  { label: "상호", content: company.name },
  { label: "대표", content: company.chief },
  { label: "사업자등록번호", content: company.companyRegistrationNumber },
  {
    label: "옥외광고사업등록번호",
    content: company.outdoorAdvertisingRegistrationNumber,
  },
  { label: "전화", content: company.phone },
  { label: "메일", content: company.email },
];

function Footer() {
  return (
    <footer className="contents-center relative w-full flex-col gap-6 bg-sub text-2xl text-main sm:text-lg md:text-base lg:text-sm">
      <div className="flex flex-col gap-0">
        <p
          className="cursor-pointer"
          onClick={() => copyToClipboard(company.address)}
        >{`(${company.addressPostcode}) ${company.address} ${company.addressDetail}`}</p>
        <ul className="flex flex-wrap">
          {FOOTER_CONTENT.map((item, index) => (
            <li className="flex gap-1 break-keep text-inherit" key={index}>
              {index !== 0 && <span className="mx-2.5 align-middle">|</span>}
              <label className="align-middle font-bold">{item.label}</label>
              <p className="align-middle">{item.content}</p>
            </li>
          ))}
        </ul>
      </div>
      <p>{company.copyRight}</p>
    </footer>
  );
}

export default Footer;
