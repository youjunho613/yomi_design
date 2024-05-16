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
  if (!data) return <div>업로드된 게시물이 없습니다.</div>;

  return (
    <div className="contents-center w-layout flex-wrap gap-2.5 sm:gap-6">
      {data.map((post) => {
        const path = `/board/${post.board?.mainCategory}/${post.board?.subCategory}`;
        return (
          <Link
            href={`${path}/${post.board?.id}`}
            key={post.id}
            className="contents-center relative aspect-square w-[47.4%] max-w-[251px] border-[3px] border-black lg:w-[22.7%]"
          >
            <Image
              src={`${STORAGE_URL}/post/${post.board?.photoUrl[0]}`}
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
