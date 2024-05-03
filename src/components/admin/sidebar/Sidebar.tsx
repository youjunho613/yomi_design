import MenuLink from "./menuLink";

const menuItems = [
  {
    title: "인사",
    list: [
      {
        title: "직원",
        path: "",
        icon: "",
      },
      {
        title: "입출금 관리",
        path: "",
        icon: "",
      },
    ],
  },
  {
    title: "프로젝트",
    list: [
      {
        title: "프로젝트 추적",
        path: "",
        icon: "",
      },
      {
        title: "문의 내역",
        path: "",
        icon: "",
      },
    ],
  },
  {
    title: "홈페이지",
    list: [
      {
        title: "게시물 등록",
        path: "",
        icon: "",
      },
      {
        title: "게시물 관리",
        path: "",
        icon: "",
      },
    ],
  },
];

export default function Sidebar() {
  return (
    <ul className="fixed left-0 flex min-h-screen w-1/3 flex-col gap-20 bg-sub px-15 py-5 text-main">
      {menuItems.map((menu) => (
        <li key={menu.title}>
          <h3 className="px-2 py-1 text-base">- {menu.title}</h3>
          <div className="flex w-full flex-col gap-2">
            {menu.list.map((item) => (
              <MenuLink key={item.title} item={item} />
            ))}
          </div>
        </li>
      ))}
      <li>
        <button className="hover:bg-subsoft flex w-full items-center rounded-xl px-4 py-3 hover:text-white">
          Logout
        </button>
      </li>
    </ul>
  );
}
