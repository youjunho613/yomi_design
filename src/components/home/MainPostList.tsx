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
  const slidePosts = [...data, ...data];

  return (
    <div className="contents-center layout">
      <div className="w-full overflow-hidden">
        <ul className="animate-infiniteSlide flex w-fit gap-3 pr-3 xl:gap-6 xl:pr-6">
          {slidePosts.map((post, index) => {
            const path = `/portfolio/${post.board?.type}/${post.board?.category?.eng_name}/${post.board?.id}`;
            const sourcePath = `${STORAGE_URL}/post/${post.board?.photoUrl[0]}`;
            const alt = post.board?.title ?? "시공사진";
            return (
              <li key={`${post.id}-${index}`}>
                <Link href={path} className="contents-center relative aspect-square w-[40vw] xl:w-[25vw]">
                  <Image
                    src={sourcePath}
                    alt={alt}
                    fill
                    className="aspect-square object-center"
                    sizes="40vw (max-width: 1280px) 25vw"
                  />
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
