"use client";

import Link from "next/link";
import { useState } from "react";
import { NAV_CONTENT } from "./Header.content";

export default function NavItem() {
  const [isOpen, setIsOpen] = useState(false);

  const openToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="contents-center mx-2 gap-4">
      {NAV_CONTENT.map((item) => (
        <Link key={item.href} href={item.href} id={item.href} className="hidden px-2 sm:block">
          {item.label}
        </Link>
      ))}
      <button className="contents-center group flex-col gap-1 sm:hidden" onClick={openToggle}>
        <span className={`h-0.5 w-5 rounded-full bg-black duration-200 ${isOpen && "translate-y-1.5 rotate-45"}`} />
        <span className={`h-0.5 w-5 rounded-full bg-black transition duration-200 ${isOpen && "scale-x-0"}`} />
        <span className={`h-0.5 w-5 rounded-full bg-black duration-200 ${isOpen && "-translate-y-1.5 -rotate-45"}`} />
      </button>
    </nav>
  );
}
