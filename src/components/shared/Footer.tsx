"use client";

import company from "@/app/company-info";
import { copyToClipboard } from "@/utils/clipboard";
import { toast } from "react-toastify";

const FOOTER_CONTENT = [
  { label: "상호", content: company.name },
  { label: "대표", content: company.chief },
  { label: "사업자등록번호", content: company.companyRegistrationNumber },
  { label: "옥외광고사업등록번호", content: company.outdoorAdvertising },
  { label: "전화", content: company.phone },
  { label: "메일", content: company.email },
];

function Footer() {
  const copyHandler = () => {
    copyToClipboard(company.address);
    toast.info("주소가 복사되었습니다.", { position: "bottom-right" });
  };
  const fullAddress = `(${company.addressPostcode}) ${company.address} ${company.addressDetail}`;

  return (
    <footer className="footer relative shrink-0 grow-0 text-sm">
      <div className="flex flex-col px-10">
        <p>
          <button onClick={copyHandler}>{fullAddress}</button>
        </p>
        <ul className="flex flex-wrap">
          {FOOTER_CONTENT.map((item, index) => (
            <li className="footer-item" key={index}>
              <label className="font-bold">{item.label}</label>
              <p>{item.content}</p>
            </li>
          ))}
        </ul>
      </div>
      <p className="px-10">{company.copyRight}</p>
    </footer>
  );
}

export default Footer;
