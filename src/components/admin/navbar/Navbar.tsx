import Link from "next/link";

const menuItems = [
  { name: "문의 목록", icon: "", path: "estimateList" },
  { name: "게시물 등록", icon: "", path: "create" },
  { name: "설정", icon: "", path: "management" },
];

export default function Navbar() {
  return (
    <ul className="tab">
      {menuItems.map((item) => (
        <li key={item.name}>
          <Link href={`/admin/${item.path}`}>{item.name}</Link>
        </li>
      ))}
    </ul>
  );
}
