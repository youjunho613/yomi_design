export const docs = [
  { name: "사업자등록증", url: "/businessRegistration.jpg" },
  { name: "옥외광고사업등록증", url: "/outdoorAdvertising.jpg" },
  { name: "여성기업확인서", url: "/womenEnterprise.jpg" },
];

export interface IAbout {
  index: string;
  label: string;
  content: string;
  image: { src: string; alt: string; width: number; height: number }[];
}

export const ABOUT_CONTENT = [
  {
    index: "01",
    label: "design",
    content:
      "20 - 30대 청년들로 구성된 요미디자인은 트렌디한 젊은 감각으로 브랜드의 아이덴티티를 디자인과 연결하여 매장이 더욱 빛날 수 있게 작업해드립니다.",
    image: [
      { src: "/about/design-001.svg", alt: "01-1", width: 500, height: 500 },
      { src: "/about/design-002.svg", alt: "01-2", width: 500, height: 500 },
    ],
  },
  {
    index: "02",
    label: "expertise",
    content:
      "고객님의 브랜드를 위해 저희는 시각디자인 전문 디자이너가 디자인하며, 본사 소속 전문 시공팀이 직접 제작하고 시공해드립니다.",
    image: [
      { src: "/about/professional-001.svg", alt: "02-1", width: 500, height: 500 },
      { src: "/about/professional-002.svg", alt: "02-2", width: 500, height: 500 },
    ],
  },
  {
    index: "03",
    label: "reasonably",
    content:
      "합리적인 가격으로 수년간 겪은 다양한 경험과 노하우를 바탕으로 브랜드에 가장 적합한 사인물을 제안해 드릴 것을 약속드립니다.",
    image: [
      { src: "/about/reasonably-001.svg", alt: "03-1", width: 500, height: 500 },
      { src: "/about/reasonably-002.svg", alt: "03-2", width: 500, height: 500 },
    ],
  },
  {
    index: "04",
    label: "review",
    content: "클라이언트 분들의 높은 만족도로 소개까지 이어지는 간판전문업체 요미디자인입니다.",
    image: [
      { src: "/about/review-001.svg", alt: "04-1", width: 500, height: 500 },
      { src: "/about/review-002.svg", alt: "04-2", width: 500, height: 500 },
      { src: "/about/review-003.svg", alt: "04-3", width: 500, height: 500 },
      { src: "/about/review-004.svg", alt: "04-4", width: 500, height: 500 },
      { src: "/about/review-005.svg", alt: "04-5", width: 500, height: 500 },
      { src: "/about/review-006.svg", alt: "04-6", width: 500, height: 500 },
      { src: "/about/review-007.svg", alt: "04-7", width: 500, height: 500 },
    ],
  },
];
