import Link from "next/link";

const menuItems = [
  { name: "문의", icon: "", path: "/admin/estimateList" },
  { name: "게시물 관리", icon: "", path: "/admin/management" },
  { name: "게시물 등록", icon: "", path: "/admin/create" },
];
export default function Navbar() {
  return (
    <div className="layout fixed bottom-0 z-20">
      <ul className="contents-around flex rounded-t-xl border-2 border-sub/20 bg-main px-10">
        {menuItems.map((menu) => (
          <li key={menu.name} className="contents-center bg-subsoft/50 m-2 h-20 w-20 rounded-full text-main">
            <Link href={menu.path}>
              {menu.icon}
              {menu.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
