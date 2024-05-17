import Image from "next/image";
import Link from "next/link";
import NavItem from "./NavItem";

export default function Header() {
  return (
    <header className="navigation">
      <Link href="/">
        <Image width={125} height={24} src="/logo.png" priority alt="요미디자인" />
      </Link>
      <NavItem />
    </header>
  );
}
