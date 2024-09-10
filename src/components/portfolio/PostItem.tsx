import { STORAGE_URL } from "@/supabase/supabase";
import { Tables } from "@/supabase/type";
import Image from "next/image";
import Link from "next/link";

interface IProps {
  post: Tables<"board">;
}
export default function PostItem({ post }: IProps) {
  const path = `/board/${post.mainCategory}/${post.subCategory}/${post.id}`;
  const sourcePath = `${STORAGE_URL}/post/${post.photoUrl[0]}`;

  return (
    <li
      key={post.id}
      className="contents-center relative aspect-square w-[24.25%] overflow-hidden rounded-sm shadow-lg"
    >
      <Link href={path} className="w-full">
        <Image src={sourcePath} alt={post.title} objectFit="cover" layout="fill" />
      </Link>
    </li>
  );
}
