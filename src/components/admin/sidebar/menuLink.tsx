import Link from "next/link";

interface IProps {
  item: { title: string; path: string; icon: string };
}

export default function MenuLink({ item }: IProps) {
  return (
    <li className="hover:bg-subsoft rounded-xl bg-main px-4 py-3 text-lg text-sub hover:text-white">
      <Link href={item.path}>
        {item.icon}
        {item.title}
      </Link>
    </li>
  );
}
