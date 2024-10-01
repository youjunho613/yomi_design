"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import HamburgerButton from "./HamburgerButton";
import MobileNav from "./MobileNav";
import Nav from "./Nav";
import SocialIconBox from "./SocialIconBox";

const DynamicModal = dynamic(() => import("../../modal/Modal"), { ssr: false });

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const openToggle = () => {
    setIsOpen(!isOpen);
  };

  const onClose = () => {
    setIsOpen(false);
  };

  const pathname = usePathname();
  if (pathname === "/linktree") return;

  return (
    <header className="sticky top-0 z-30 h-mobile-header w-full bg-gray001 text-black shadow-md xl:h-header">
      <div className="layout flex h-full items-center justify-between">
        <Link href="/" className="relative aspect-[93/40] min-w-[70px]">
          <Image src="/header-logo.svg" priority alt="요미디자인" fill className="object-contain" />
        </Link>
        <Nav />
        <div className="flex gap-10">
          <SocialIconBox className="hidden gap-4 md:flex" />
          <HamburgerButton className="z-50 md:hidden" isOpen={isOpen} openToggle={openToggle} />
          <DynamicModal isOpen={isOpen} openToggle={openToggle}>
            <MobileNav onClose={onClose} />
            <div className="absolute bottom-1/4 left-10 translate-y-1/2">
              <SocialIconBox className="flex gap-2" />
            </div>
          </DynamicModal>
        </div>
      </div>
    </header>
  );
}
