import Link from "next/link";
import { NAV_CONTENT } from "./Header.content";

export default function NavItem() {
  return (
    <nav className="contents-center mx-2 hidden gap-4 sm:block">
      {NAV_CONTENT.map((item) => (
        <Link key={item.href} href={item.href} id={item.href} className="px-2">
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
