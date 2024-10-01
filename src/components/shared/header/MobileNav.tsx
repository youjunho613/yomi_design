import Link from "next/link";
import { NAV_CONTENT } from "./Header.content";

interface IProps {
  onClose: () => void;
}

export default function MobileNav({ onClose }: IProps) {
  return (
    <div className="flex flex-col gap-4 text-xl uppercase">
      {NAV_CONTENT.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          id={item.href}
          onClick={onClose}
          className="w-full border-b border-black py-2"
        >
          {item.id}
        </Link>
      ))}
    </div>
  );
}
