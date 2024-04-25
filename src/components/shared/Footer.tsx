"use client";

import company from "@/app/company-info";
import { copyToClipboard } from "@/utils/clipboard";

const FOOTER_CONTENT = [
  { label: "상호", content: company.name },
  { label: "대표", content: company.chief },
  { label: "사업자등록번호", content: company.companyRegistrationNumber },
  { label: "옥외광고사업등록번호", content: company.outdoorAdvertising },
  { label: "전화", content: company.phone },
  { label: "메일", content: company.email },
];

function Footer() {
  return (
    <footer className="footer relative shrink-0 grow-0 text-sm">
      <div className="flex flex-col">
        <p
          className="cursor-pointer"
          onClick={() => copyToClipboard(company.address)}
        >{`(${company.addressPostcode}) ${company.address} ${company.addressDetail}`}</p>
        <ul className="flex flex-wrap">
          {FOOTER_CONTENT.map((item, index) => (
            <li className="footer-item" key={index}>
              <label className="font-bold">{item.label}</label>
              <p>{item.content}</p>
            </li>
          ))}
        </ul>
      </div>
      <p>{company.copyRight}</p>
    </footer>
  );
}

export default Footer;
