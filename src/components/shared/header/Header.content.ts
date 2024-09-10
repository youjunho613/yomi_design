import { SUB_CATEGORY } from "@/app/category.constant";

export const NAV_SUB_CONTENT = {
  logo: [{ id: "logo", label: "전체", href: "/board/logo" }, ...SUB_CATEGORY.logo],
  sign: [{ id: "sign", label: "전체", href: "/board/sign" }, ...SUB_CATEGORY.sign],
  // print: [{ id: "print", label: "전체", href: "/board/print" }, ...SUB_CATEGORY.print],
};

export const NAV_CONTENT = [
  { id: "about", label: "소개", href: "/about", subContent: [] },
  {
    id: "signage",
    label: "사이니지",
    href: "/portfolio/signage",
    subContent: [
      { id: "company", label: "기업" },
      { id: "education", label: "교육" },
      { id: "hospital", label: "병원" },
      { id: "restaurant", label: "음식점" },
      { id: "cafe", label: "카페" },
      { id: "health", label: "헬스" },
      { id: "beauty", label: "미용" },
      { id: "realEstate", label: "부동산" },
      { id: "etc", label: "기타" },
    ],
  },
  {
    id: "branding",
    label: "브랜딩",
    href: "/portfolio/branding",
    subContent: [
      { id: "company", label: "기업" },
      { id: "education", label: "교육" },
      { id: "hospital", label: "병원" },
      { id: "restaurant", label: "음식점" },
      { id: "cafe", label: "카페" },
      { id: "health", label: "헬스" },
      { id: "beauty", label: "미용" },
      { id: "realEstate", label: "부동산" },
      { id: "etc", label: "기타" },
    ],
  },
  { id: "contact", label: "문의", href: "/contact", subContent: [] },
];
