import { AiFillCustomerService, AiFillStar, AiFillTags, AiOutlinePlus, AiOutlineUnorderedList } from "react-icons/ai";

export const menuItems = [
  [
    {
      name: "게시물 추가",
      path: "/admin/create",
      icon: <AiOutlinePlus />,
      iconBackground: "bg-orange-400",
    },
    {
      name: "게시물 관리",
      path: "/admin/postManagement",
      icon: <AiOutlineUnorderedList />,
      iconBackground: "bg-blue-400",
    },
  ],
  [
    {
      name: "문의 목록",
      path: "/admin/estimateList",
      icon: <AiFillCustomerService />,
      iconBackground: "bg-pink-400",
    },
  ],
  [
    {
      name: "카테고리 관리",
      path: "/admin/category",
      icon: <AiFillTags />,
      iconBackground: "bg-emerald-400",
    },
    {
      name: "홈 화면 게시글",
      path: "/admin/post-setting",
      icon: <AiFillStar />,
      iconBackground: "bg-amber-400",
    },
  ],
  [
    {
      name: "재고 관리",
      path: "/admin/inventory",
      icon: <AiFillStar />,
      iconBackground: "bg-amber-400",
    },
    {
      name: "수입지출 관리",
      path: "/admin/finance",
      icon: <AiFillStar />,
      iconBackground: "bg-amber-400",
    },
    {
      name: "프로젝트 관리",
      path: "/admin/project",
      icon: <AiFillStar />,
      iconBackground: "bg-amber-400",
    },
  ],
];
