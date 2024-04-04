import { MAIN_CATEGORY, SUB_CATEGORY } from "@/app/category.constant";

export const NAV_SUB_CONTENT = {
  logo: [{ id: "logo", label: "전체", href: "/board/logo" }, ...SUB_CATEGORY.logo],
  sign: [{ id: "sign", label: "전체", href: "/board/sign" }, ...SUB_CATEGORY.sign],
  print: [{ id: "print", label: "전체", href: "/board/print" }, ...SUB_CATEGORY.print],
};

export const NAV_CONTENT = [
  { id: "introduce", label: "소개", href: "/introduce" },
  ...MAIN_CATEGORY,
  // { label: "진행방법", href: "/board/process" },
  { id: "estimate", label: "문의", href: "/estimate" },
];
