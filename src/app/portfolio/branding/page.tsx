"use client";

import DividerDot from "@/components/shared/DividerDot";
import Error from "@/components/shared/Error";
import Loading from "@/components/shared/loading/Loading";
import usePost from "@/service/post/mutations";
import { STORAGE_URL } from "@/supabase/supabase";
import Image from "next/image";
import Link from "next/link";

export default function page() {
  const { fetchPosts } = usePost();

  const { data, isError, isLoading, error } = fetchPosts;

  if (isLoading) return <Loading />;
  if (isError) return <Error error={error.message} />;

  return (
    <div className="layout contents-center mt-[100px] flex-col">
      <Image src={"/title/branding.svg"} alt="" width={616} height={193} />
      <DividerDot />
      {!data || data.length === 0 ? (
        <p>업로드된 게시물이 없습니다.</p>
      ) : (
        <ul className="contents-between flex w-full flex-wrap gap-x-3 gap-y-5">
          {data.map((post) => {
            const path = `/board/${post.mainCategory}/${post.subCategory}/${post.id}`;
            const sourcePath = `${STORAGE_URL}/post/${post.photoUrl[0]}`;
            return (
              <li key={post.id} className="contents-center aspect-square w-[240px] overflow-hidden shadow-2xl">
                <Link href={path}>
                  <Image src={sourcePath} alt={post.title} width={240} height={240} />
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
