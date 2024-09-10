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
      <Image src={"/title/signage.svg"} alt="" width={494} height={180} />
      <DividerDot />
      {!data || data.length === 0 ? (
        <p>업로드된 게시물이 없습니다.</p>
      ) : (
        <ul className="mb-10 flex w-full flex-wrap gap-[1%] gap-y-5">
          {data.map((post, index) => {
            const path = `/board/${post.mainCategory}/${post.subCategory}/${post.id}`;
            const sourcePath = `${STORAGE_URL}/post/${post.photoUrl[0]}`;
            return (
              <li
                key={post.id}
                className="contents-center relative aspect-square w-[24.25%] overflow-hidden rounded-sm shadow-lg"
              >
                {/* @TODO 쉐도우 더 진하게 or 범위를 좁게 */}
                <Link href={path} className="w-full">
                  <Image src={sourcePath} alt={post.title} objectFit="cover" layout="fill" />
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
