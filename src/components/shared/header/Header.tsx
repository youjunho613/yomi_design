import Image from "next/image";
import Link from "next/link";
import NavItem from "./NavItem";

export default function Header() {
  return (
    <header>
      <Link href="/" className="logo">
        <Image
          src="/logo.png"
          alt="요미디자인"
          width={138}
          height={26}
          priority
          className="w-[83px] md:w-[138px] lg:w-[191px]"
        />
      </Link>
      <NavItem />
    </header>
  );
}
