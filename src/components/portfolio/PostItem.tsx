import { STORAGE_URL } from "@/supabase/supabase";
import { Tables } from "@/supabase/type";
import Image from "next/image";
import Link from "next/link";

interface IProps {
  post: Tables<"board"> & { category: Tables<"category"> | null };
}

export default function PostItem({ post }: IProps) {
  const path = `/portfolio/${post.type}/${post.category?.eng_name}/${post.id}`;
  const sourcePath = `${STORAGE_URL}/post/${post.photoUrl[0]}`;

  return (
    <li key={post.id} className="contents-center overflow-hidden rounded-sm shadow-lg">
      <Link href={path} className="relative aspect-square w-[39.1vw] md:w-[19.3vw]">
        <Image
          src={sourcePath}
          alt={post.title}
          fill
          className="aspect-square object-center"
          sizes="39.1vw (max-width: 768px) 24.25%"
        />
      </Link>
    </li>
  );
}
