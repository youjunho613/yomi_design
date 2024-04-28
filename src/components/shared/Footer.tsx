import { COMPANY, FOOTER_CONTENT } from "@/app/company-info";

function Footer() {
  const fullAddress = `(${COMPANY.addressPostcode}) ${COMPANY.address} ${COMPANY.addressDetail}`;

  return (
    <footer className="footer relative shrink-0 grow-0 text-sm">
      <div className="flex flex-col px-10">
        <p>{fullAddress}</p>
        <ul className="flex flex-wrap">
          {FOOTER_CONTENT.map((item, index) => (
            <li className="footer-item" key={index}>
              <label className="font-bold">{item.label}</label>
              <p>{item.content}</p>
            </li>
          ))}
        </ul>
      </div>
      <p className="px-10">{COMPANY.copyRight}</p>
    </footer>
  );
}

export default Footer;
