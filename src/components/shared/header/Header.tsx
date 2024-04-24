import Image from "next/image";
import Link from "next/link";
import NavItem from "./NavItem";

export default function Header() {
  return (
    <header className="contents-between navigation min-w-fit shrink-0 grow-0">
      <Link className="min-w-fit" href="/">
        <Image width={125} height={24} src="/logo.svg" priority alt="요미디자인" />
      </Link>
      <NavItem />
    </header>
  );
}
