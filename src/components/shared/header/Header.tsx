import Image from "next/image";
import Link from "next/link";
import NavItem from "./NavItem";

export default function Header() {
  return (
    <header className="contents-between navigation mt-16 w-full rounded-full px-10">
      <Link href="/">
        <Image width={125} height={24} src="/logo.svg" priority alt="요미디자인" />
      </Link>
      <NavItem />
    </header>
  );
}
