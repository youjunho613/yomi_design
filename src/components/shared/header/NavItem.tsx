import Link from "next/link";
import { NAV_CONTENT } from "./Header.content";

export default function NavItem() {
  return (
    <nav className="contents-center mx-2 gap-4 break-keep">
      {NAV_CONTENT.map((item) => (
        <Link key={item.href} href={item.href} id={item.href} className="px-2">
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
