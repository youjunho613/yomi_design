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
    <div className="contents-center w-full flex-wrap gap-6">
      {data.map((post) => {
        const path = `/board/${post.mainCategory}/${post.subCategory}`;
        return (
          <Link
            href={`${path}/${post.id}`}
            key={post.id}
            className="contents-center relative h-[230px] w-[230px] border-[3px] border-black"
          >
            <Image
              src={`${STORAGE_URL}/post/${post.photoUrl[0]}`}
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
