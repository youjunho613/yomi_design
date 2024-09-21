"use client";

import useAuth from "@/service/auth/mutations";
import useCategory from "@/service/category/mutations";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import HamburgerButton from "./HamburgerButton";
import { NAV_CONTENT } from "./Header.content";
import SocialIconBox from "./SocialIconBox";

const DynamicModal = dynamic(() => import("../../modal/Modal"), { ssr: false });

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { fetchUser } = useAuth();
  const { data } = fetchUser;

  const { fetchCategory } = useCategory();
  const { data: categoryList } = fetchCategory;

  const openToggle = () => {
    setIsOpen(!isOpen);
  };

  const onClose = () => {
    setIsOpen(false);
  };

  const visualNav = (item: string) => {
    const currentItem = ["signage", "branding"];
    return currentItem.some((string) => string === item);
  };

  const pathname = usePathname();
  if (pathname === "/linktree") return;

  return (
    <header className="sticky top-0 z-30 h-[55px] w-full bg-gray001 text-black shadow-md xl:h-[60px]">
      <div className="layout flex h-full items-center justify-between">
        <Link href="/" className="relative aspect-[93/40] min-w-[70px]">
          <Image src="/header-logo.svg" priority alt="요미디자인" fill className="object-contain" />
        </Link>
        <ul className="hidden h-full gap-[3.9vw] text-[1.5vw] uppercase md:flex xl:gap-[50px] xl:text-[20px]">
          {NAV_CONTENT.map((item) => (
            <li key={item.id} className="group relative flex h-full items-center justify-center">
              <Link href={item.href} className="w-full rounded-full px-2 duration-700 group-hover:bg-white">
                {item.id}
              </Link>
              {!!categoryList && visualNav(item.id) && (
                <ul className="absolute left-1/2 top-[45px] hidden -translate-x-1/2 translate-y-2 gap-4 rounded-full bg-black px-6 text-white shadow-md group-hover:flex">
                  {categoryList.map((category) => (
                    <li key={category.id} className="py-2">
                      <Link
                        href={`/portfolio/${item.id}/${category.eng_name}`}
                        className="flax w-full break-keep text-[18px] hover:font-bold"
                      >
                        {category.kor_name}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
          {!!data && !!data.user && (
            <li className="group relative flex h-full items-center justify-center">
              <Link href="/admin" className="w-full rounded-full px-2 duration-700 group-hover:bg-white">
                admin
              </Link>
            </li>
          )}
        </ul>
        <div className="flex gap-10">
          <SocialIconBox className="hidden gap-4 md:flex" />
          <HamburgerButton className="z-50 md:hidden" isOpen={isOpen} openToggle={openToggle} />
          <DynamicModal isOpen={isOpen} openToggle={openToggle}>
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
            <div className="absolute bottom-1/4 left-10 translate-y-1/2">
              <SocialIconBox className="flex gap-2" />
            </div>
          </DynamicModal>
        </div>
      </div>
    </header>
  );
}
