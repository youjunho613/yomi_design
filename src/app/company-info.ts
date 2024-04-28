const document = {
  companyRegistrationNumber: "738-18-01884",
  outdoorAdvertising: "제 2023-3150127-08-5-00006호",
};

const contact = {
  phone: "010-7225-0870",
  email: "yomi_design@naver.com",
  kakaoTalk: "http://pf.kakao.com/_xoxfvgxj",
  instagram: "https://www.instagram.com/yomi_design_/",
  naverBlog: "https://blog.naver.com/yomi_design",
};

const address = {
  addressPostcode: "07631",
  address: "서울 강서구 마곡중앙4로 22",
  addressDetail: "파인스퀘어 B동 204호",
  address_en: "22, Magokjungang 4-ro, Gangseo-gu, Seoul, Republic of Korea",
};

export const COMPANY = {
  name: "요미디자인",
  name_em: "YOMI DESIGN",
  chief: "허지혜",
  chief_en: "Ji-Hye Heo",
  ...address,
  ...document,
  ...contact,
  copyRight: "ⓒ 2023. 요미디자인(YOMI DESIGN) all rights reserved.",
};

export const FOOTER_CONTENT = [
  { label: "상호", content: COMPANY.name },
  { label: "대표", content: COMPANY.chief },
  { label: "사업자등록번호", content: COMPANY.companyRegistrationNumber },
  { label: "옥외광고사업등록번호", content: COMPANY.outdoorAdvertising },
  { label: "전화", content: COMPANY.phone },
  { label: "메일", content: COMPANY.email },
];
