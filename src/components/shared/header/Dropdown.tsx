"use client";

import Link from "next/link";
import { MutableRefObject, useEffect, useState } from "react";
import { NAV_SUB_CONTENT } from "./Header.content";

interface Props {
  isShowNav: boolean;
  currentNav: string;
  linkRef: MutableRefObject<TLinkRef>;
}

interface TLinkRef {
  [key: string]: HTMLAnchorElement | null;
}

export default function Dropdown({ isShowNav, currentNav, linkRef }: Props) {
  const [currentOffsetLeft, setCurrentOffsetLeft] = useState(1000);
  const isCurrentDropdown = currentNav === "logo" || currentNav === "sign";

  useEffect(() => {
    const offsetLeft = linkRef.current[currentNav]?.offsetLeft;
    if (!offsetLeft) return;
    setCurrentOffsetLeft(offsetLeft);
  }, [currentNav, linkRef]);

  const currentLeft = () => {
    switch (currentNav) {
      case "logo":
        return `left-[${currentOffsetLeft + 0}px]`;
      case "sign":
        return `left-[${currentOffsetLeft + 5}px]`;
      case "print":
        return `left-[${currentOffsetLeft + 7}px]`;
      default:
        return "";
    }
  };

  return (
    <div
      className={`contents-center navigation animation relative w-[1000px] gap-[50px] ${
        isCurrentDropdown && isShowNav ? "visible mt-[50px] h-[50px]" : "invisible h-0 scale-y-0"
      }`}
      id={currentNav}
    >
      {isCurrentDropdown && (
        <>
          <span className={`${currentLeft()} pop`} />
          {NAV_SUB_CONTENT[currentNav].map((nav) => (
            <Link key={nav.id} href={nav.href}>
              {nav.label}
            </Link>
          ))}
        </>
      )}
    </div>
  );
}
