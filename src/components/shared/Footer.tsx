import { COMPANY, FOOTER_CONTENT } from "@/app/company-info";

function Footer() {
  const fullAddress = `(${COMPANY.addressPostcode}) ${COMPANY.address} ${COMPANY.addressDetail}`;

  return (
    <footer className="footer relative shrink-0 grow-0 text-[10px] sm:text-sm">
      <div className="layout flex flex-col">
        <p>{fullAddress}</p>
        <br />
        <ul className="flex flex-col flex-wrap xl:flex-row">
          {FOOTER_CONTENT.map((item, index) => (
            <li className="footer-item" key={index}>
              <label className="font-bold">{item.label}</label>
              <p>{item.content}</p>
            </li>
          ))}
        </ul>
      </div>
      <p className="layout">{COMPANY.copyRight}</p>
    </footer>
  );
}

export default Footer;
