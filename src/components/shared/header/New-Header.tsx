"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import HamburgerButton from "./HamburgerButton";
import { NAV_CONTENT } from "./Header.content";
import SocialIconBox from "./SocialIconBox";

const DynamicModal = dynamic(() => import("../../modal/Modal"), { ssr: false });

export default function NewHeader() {
  const [isOpen, setIsOpen] = useState(false);

  const openToggle = () => {
    setIsOpen(!isOpen);
  };

  const onClose = () => {
    setIsOpen(false);
  };

  return (
    <header className="sticky top-0 z-30 h-15 w-full bg-gray001 text-black shadow-md">
      <div className="layout flex h-full  items-center justify-between">
        <Link href="/">
          <Image width={93} height={40} src="/header-logo.svg" priority alt="요미디자인" />
        </Link>
        <ul className="hidden h-full gap-[50px] text-[20px] uppercase lg:flex">
          {NAV_CONTENT.map((item) => (
            <li key={item.id} className="group relative flex h-full items-center justify-center">
              <Link href={item.href} className="w-full rounded-full px-2 duration-700 group-hover:bg-white">
                {item.id}
              </Link>
              <ul className="absolute left-1/2 top-[45px] hidden -translate-x-1/2 translate-y-2 gap-4 rounded-full bg-black px-4 text-white shadow-md group-hover:flex">
                {item.subContent.map((subItem) => (
                  <li key={subItem.id} className="py-2">
                    <Link
                      href={`${item.id}/${subItem.id}`}
                      className="flax w-full break-keep text-[18px] hover:font-bold"
                    >
                      {subItem.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
        <div className="flex gap-10">
          <SocialIconBox className="hidden lg:flex" />
          <HamburgerButton className="z-50 lg:hidden" isOpen={isOpen} openToggle={openToggle} />
          <DynamicModal isOpen={isOpen} openToggle={openToggle}>
            <div className="flex flex-col gap-4 text-xl">
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
          </DynamicModal>
        </div>
      </div>
    </header>
  );
}
