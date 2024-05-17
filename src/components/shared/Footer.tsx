import { COMPANY, FOOTER_CONTENT } from "@/app/company-info";

const FULL_ADDRESS = `(${COMPANY.addressPostcode}) ${COMPANY.address} ${COMPANY.addressDetail}`;

function Footer() {
  return (
    <footer>
      <ul>
        <li className="mb-4">{FULL_ADDRESS}</li>
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

export default Footer;
