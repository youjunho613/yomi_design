"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import Dropdown from "./Dropdown";
import { NAV_CONTENT } from "./Header.content";

export interface TLinkRef {
  [key: string]: HTMLAnchorElement | null;
}

export default function Header() {
  const [isShowNav, setIsShowNav] = useState(false);
  const [currentNav, setCurrentNav] = useState("introduce");
  const linkRef = useRef<TLinkRef>({});

  const hrefToId = (href: string) => href.replace("/board", "").replace("/", "");

  const onMouseOver = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    setIsShowNav(true);
    setCurrentNav(hrefToId(event.currentTarget.id));
  };

  return (
    <div onMouseLeave={() => setIsShowNav(false)}>
      <header className="contents-between navigation mt-[60px] px-10 rounded-[50px] ">
        <Link href="/">
          <Image width={135} height={26} src="/logo.svg" priority alt="요미디자인" />
        </Link>
        <nav className="contents-center">
          {NAV_CONTENT.map((item) => (
            <Link
              key={item.href}
              ref={(element) => (linkRef.current[hrefToId(item.href)] = element)}
              href={item.href}
              id={item.href}
              onMouseOver={(event) => onMouseOver(event)}
              className="mx-2 px-2"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </header>
      <Dropdown isShowNav={isShowNav} currentNav={currentNav} linkRef={linkRef} />
    </div>
  );
}
