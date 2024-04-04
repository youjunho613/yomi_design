const FOOTER_CONTENT = [
  { label: "상호", content: "요미디자인" },
  { label: "대표", content: "허지혜" },
  { label: "사업자등록번호", content: "738 18 01884" },
  { label: "옥외광고사업등록번호", content: "00000000" },
  { label: "전화", content: "010 7225 0870" },
  { label: "메일", content: "yomi_design@naver.com" },
];

function Footer() {
  return (
    <footer className="relative b-0 flex flex-col justify-center gap-6 w-full px-[5vw] py-[3vh] bg-sub text-white">
      <div className="flex flex-col gap-0">
        <p>서울 강서구 마곡중앙4로 22 파인스퀘어 2층 B동 204호</p>
        <ul className="flex flex-wrap w-4/5">
          {FOOTER_CONTENT.map((item, index) => (
            <li className="flex break-keep text-inherit gap-1" key={index}>
              {index !== 0 && <span className="mx-2.5">|</span>}
              <label className="font-bold">{item.label}</label>
              <p className="font-normal">{item.content}</p>
            </li>
          ))}
        </ul>
      </div>
      <p>ⓒ 2023. 요미디자인(YOMI DESIGN) all rights reserved.</p>
    </footer>
  );
}

export default Footer;
