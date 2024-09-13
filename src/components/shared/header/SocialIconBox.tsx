import Image from "next/image";
import Link from "next/link";

interface IProps {
  className?: string;
}

export default function SocialIconBox({ className }: IProps) {
  return (
    <ul className={className}>
      <li>
        <Link
          href={"http://pf.kakao.com/_xoxfvgxj/chat"}
          target="_blank"
          className="contents-center flex h-7 w-7 rounded-full bg-white p-1 hover:bg-black"
        >
          <Image width={15} height={15} src="/kakao-channel.svg" priority alt="Kakao talk channel" />
        </Link>
      </li>
      <li>
        <Link
          href={"https://blog.naver.com/yomi_design"}
          target="_blank"
          className="contents-center flex h-7 w-7 rounded-full bg-white p-1 hover:bg-black"
        >
          <Image width={15} height={15} src="/naver-blog.svg" priority alt="Naver blog" />
        </Link>
      </li>
      <li>
        <Link
          href={"https://www.instagram.com/yomi_design_/"}
          target="_blank"
          className="contents-center flex h-7 w-7 rounded-full bg-white p-1 hover:bg-black"
        >
          <Image width={15} height={15} src="/instagram.svg" priority alt="Instagram" />
        </Link>
      </li>
    </ul>
  );
}
