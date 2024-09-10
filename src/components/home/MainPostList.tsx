"use client";

import usePost from "@/service/post/mutations";
import { STORAGE_URL } from "@/supabase/supabase";
import Image from "next/image";
import Link from "next/link";
import Error from "../shared/Error";
import Loading from "../shared/loading/Loading";

export default function MainPostList() {
  const { fetchMainPost } = usePost();
  const { data, isError, isLoading, error } = fetchMainPost;

  if (isLoading) return <Loading />;
  if (isError) return <Error error={error.message} />;
  if (!data) return <p>업로드된 게시물이 없습니다.</p>;

  return (
    <ul className="contents-between w-full gap-2">
      {data.map((post) => {
        const path = `/board/${post.board?.mainCategory}/${post.board?.subCategory}/${post.board?.id}`;
        const sourcePath = `${STORAGE_URL}/post/${post.board?.photoUrl[0]}`;
        return (
          <li key={post.id}>
            <Link href={path}>
              <Image
                src={sourcePath}
                alt="시공 사진"
                width={500}
                height={500}
                className="aspect-square w-full object-cover object-center"
              />
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
