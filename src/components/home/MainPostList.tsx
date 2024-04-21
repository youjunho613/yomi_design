"use client";

import usePost from "@/service/post/mutations";
import Image from "next/image";
import Link from "next/link";
import { STORAGE_URL } from "@/supabase/supabase";

export default function MainPostList() {
  const { fetchMainPost } = usePost();
  const { isLoading, isError, data } = fetchMainPost;

  if (isLoading) return <div>로딩 중...</div>;
  if (isError) return <div>에러 발생</div>;
  if (!data) return <div>업로드된 게시물이 없습니다.</div>;

  return (
    <div className="contents-center gap-6">
      {data.map((post) => {
        const path = `/board/${post.mainCategory}/${post.subCategory}`;
        return (
          <Link
            href={`${path}/${post.id}`}
            key={post.id}
            className="contents-center relative border-[3px] border-black w-[230px] h-[230px]"
          >
            <Image
              src={`${STORAGE_URL}/post/${post.mainPhotoUrl}`}
              alt="시공 사진"
              loading="eager"
              objectFit="cover"
              layout="fill"
            />
          </Link>
        );
      })}
    </div>
  );
}
