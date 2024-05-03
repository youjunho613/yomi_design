"use client";

import Modal from "@/components/modal/Modal";
import Link from "next/link";
import { useState } from "react";
import HamburgerButton from "./HamburgerButton";
import { NAV_CONTENT } from "./Header.content";

export default function NavItem() {
  const [isOpen, setIsOpen] = useState(false);

  const openToggle = () => {
    setIsOpen(!isOpen);
  };

  const onClose = () => {
    setIsOpen(false);
  };

  return (
    <nav className="contents-center mx-2 gap-4">
      {NAV_CONTENT.map((item) => (
        <Link key={item.href} href={item.href} id={item.href} className="hidden px-2 sm:block">
          {item.label}
        </Link>
      ))}
      <HamburgerButton isOpen={isOpen} openToggle={openToggle} />
      <Modal
        open={isOpen}
        onClose={onClose}
        className={{
          overlay: "sm:hidden",
          modal: "w-10/12 rounded-s-3xl bg-sub text-white",
        }}
      >
        <div className="side-navigation">
          {NAV_CONTENT.map((item) => (
            <Link key={item.href} href={item.href} id={item.href} onClick={onClose} className="w-full border-b py-2">
              {item.label}
            </Link>
          ))}
        </div>
      </Modal>
    </nav>
  );
}
