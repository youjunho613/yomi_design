import Image from "next/image";
import Link from "next/link";

interface IProps {
  children: React.ReactNode;
}

const menuItems = [
  { name: "게시물 관리", path: "/admin/management/board", icon: "/kakao-channel.svg" },
  { name: "카테고리 관리", path: "/admin/management/category", icon: "/kakao-channel.svg" },
];

export default function Layout({ children }: IProps) {
  return (
    <div className="flex h-full w-full px-10">
      <nav className="bottom-0 top-0 flex w-1/12 flex-col gap-4 border-r border-gray-400 px-4 py-6 duration-500 hover:w-2/12">
        <p className="text-center">설정</p>
        <ul className="h-fit overflow-hidden rounded-md border border-gray-400 bg-gray-400">
          {menuItems.map((item) => (
            <li
              key={item.name}
              className="flex items-center gap-3 text-nowrap border-y border-gray-400 bg-white px-2 py-2 text-lg font-bold hover:bg-blue-500"
            >
              <Image src={item.icon} alt={item.name} width={20} height={20} />
              <Link href={item.path}>{item.name}</Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="w-full px-10">{children}</div>
    </div>
  );
}
