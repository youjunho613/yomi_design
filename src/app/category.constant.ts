export type TMainSignType = "logo" | "sign";

interface IMainCategory {
  id: TMainSignType;
  label: string;
  href: `/board/${TMainSignType}`;
}

export type TSubCategory = Record<
  TMainSignType,
  {
    id: TSubSignType;
    label: string;
    href: `/board/${TMainSignType}/${TSubSignType}`;
  }[]
>;

export type TSubSignType = TLogo | TSign;

// type TLogoCategory = "텍스트" | "워드마크형" | "심볼형" | "엠블럼형" | "캐릭터형";
// type TSignCategory = "채널" | "갈바" | "후렉스(플렉스)" | "스카시" | "아크릴" | "돌출" | "지주" | "네온" | "입간판";
// type TPrintCategory ="시트지"| "현수막/배너"| "명함"| "스티커"| "포스터/전단지"| "리플렛/팜플렛"| "대봉투/소봉투";
export type TLogo = "text" | "wordmark" | "symbol" | "emblem" | "character";
export type TSign = "channel" | "galba" | "flex" | "scasi" | "acrylic" | "protruding" | "holding" | "neon" | "standing";
// export type TPrint = "sheet" | "banner" | "business-card" | "sticker" | "poster" | "catalog" | "envelope";

export const MAIN_CATEGORY: IMainCategory[] = [
  { id: "logo", label: "로고", href: "/board/logo" },
  { id: "sign", label: "사인물", href: "/board/sign" },
  // { id: "print", label: "인쇄물", href: "/board/print" },
];

export const SUB_CATEGORY: TSubCategory = {
  logo: [
    { id: "text", label: "텍스트", href: "/board/logo/text" },
    { id: "wordmark", label: "워드마크", href: "/board/logo/wordmark" },
    { id: "symbol", label: "심볼", href: "/board/logo/symbol" },
    { id: "emblem", label: "엠블럼", href: "/board/logo/emblem" },
    { id: "character", label: "캐릭터", href: "/board/logo/character" },
  ],
  sign: [
    { id: "channel", label: "채널", href: "/board/sign/channel" },
    { id: "galba", label: "갈바", href: "/board/sign/galba" },
    { id: "flex", label: "후렉스(플렉스)", href: "/board/sign/flex" },
    { id: "scasi", label: "스카시", href: "/board/sign/scasi" },
    { id: "acrylic", label: "아크릴", href: "/board/sign/acrylic" },
    { id: "protruding", label: "돌출", href: "/board/sign/protruding" },
    { id: "holding", label: "지주", href: "/board/sign/holding" },
    { id: "neon", label: "네온", href: "/board/sign/neon" },
    { id: "standing", label: "입간판", href: "/board/sign/standing" },
  ],
  // print: [
  //   { id: "sheet", label: "시트지", href: "/board/print/sheet" },
  //   { id: "banner", label: "현수막/배너", href: "/board/print/banner" },
  //   { id: "business-card", label: "명함", href: "/board/print/business-card" },
  //   { id: "sticker", label: "스티커", href: "/board/print/sticker" },
  //   { id: "poster", label: "포스터/전단지", href: "/board/print/poster" },
  //   { id: "catalog", label: "리플렛/팜플렛", href: "/board/print/catalog" },
  //   { id: "envelope", label: "대봉투/소봉투", href: "/board/print/envelope" },
  // ],
};
