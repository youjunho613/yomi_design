"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import HamburgerButton from "./HamburgerButton";
import { NAV_CONTENT } from "./Header.content";

const DynamicModal = dynamic(() => import("../../modal/Modal"), { ssr: false });

function SocialBox() {
  return (
    <ul className="flex gap-4">
      <li>
        <Link href={"http://pf.kakao.com/_xoxfvgxj/chat"} target="_blank">
          <Image width={30} height={30} src="/kakao-channel.svg" priority alt="Kakao talk channel" />
        </Link>
      </li>
      <li>
        <Link href={"https://blog.naver.com/yomi_design"} target="_blank">
          <Image width={30} height={30} src="/naver-blog.svg" priority alt="Naver blog" />
        </Link>
      </li>
      <li>
        <Link href={"https://www.instagram.com/yomi_design_/"} target="_blank">
          <Image width={30} height={30} src="/instagram.svg" priority alt="Instagram" />
        </Link>
      </li>
    </ul>
  );
}

export default function NewHeader() {
  const [isOpen, setIsOpen] = useState(false);

  const openToggle = () => {
    setIsOpen(!isOpen);
  };

  const onClose = () => {
    setIsOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 flex w-full items-center justify-between bg-white px-80 py-2">
      <Link href="/">
        <Image width={125} height={24} src="/logo.png" priority alt="요미디자인" />
      </Link>
      <div className="flex gap-10">
        <SocialBox />
        <HamburgerButton isOpen={isOpen} openToggle={openToggle} />
        <DynamicModal
          open={isOpen}
          onClose={onClose}
          className={{
            overlay: "",
            modal: "w-2/12 rounded-s-3xl bg-sub text-white",
          }}
        >
          <div className="side-navigation">
            {NAV_CONTENT.map((item) => (
              <Link key={item.href} href={item.href} id={item.href} onClick={onClose}>
                {item.label}
              </Link>
            ))}
          </div>
        </DynamicModal>
      </div>
    </header>
  );
}
