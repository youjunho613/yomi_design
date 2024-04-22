const document = {
  companyRegistrationNumber: "738-18-01884",
  outdoorAdvertisingRegistrationNumber: "제 2023-3150127-08-5-00006호",
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
  addressDetail: "파인스퀘어 2층 B동 204호",
  address_en: "22, Magokjungang 4-ro, Gangseo-gu, Seoul, Republic of Korea",
};

const company = {
  name: "요미디자인",
  name_em: "YOMI DESIGN",
  chief: "허지혜",
  chief_en: "Ji-Hye Heo",
  ...address,
  ...document,
  ...contact,
  copyRight: "ⓒ 2023. 요미디자인(YOMI DESIGN) all rights reserved.",
};

export default company;
