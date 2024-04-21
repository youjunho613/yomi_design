"use client";

import Link from "next/link";
import { NAV_CONTENT } from "./Header.content";

export default function NavItem() {
  return (
    <nav className="contents-center">
      {NAV_CONTENT.map((item) => (
        <Link key={item.href} href={item.href} id={item.href} className="mx-2 px-2 font-bold text-sm">
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
