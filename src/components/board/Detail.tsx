"use client";

import { STORAGE_URL } from "@/supabase/supabase";
import Image from "next/image";
import usePost from "@/service/post/mutations";
import { SUB_CATEGORY } from "@/app/category.constant";
import type { TMainSignType } from "@/app/category.constant";

export default function Detail() {
  const { fetchPost } = usePost();
  const { data, isLoading, isError } = fetchPost;

  if (!data) return <p>업로드된 게시물이 없습니다.</p>;
  if (isLoading) return <p>로딩 중...</p>;
  if (isError) return <p>에러가 발생했습니다.</p>;

  const mainCategory = data.mainCategory as TMainSignType;
  const subCategory = SUB_CATEGORY[mainCategory];
  const currentCategory = subCategory.find(({ id }) => id === data.subCategory);
  const categoryLabel = currentCategory?.label;

  return (
    <div>
      <div className="flex flex-col border-b-2 border-black002">
        <h2 className="text-2xl">{data.title}</h2>
        <p className="text-sm px-5">주소 : {data.address}</p>
        <p className="text-sm px-5">종류 : {categoryLabel}</p>
      </div>
      <ul className="flex flex-col contents-center my-10 gap-5">
        {data.photoUrl.map((photo, index) => (
          <li key={index}>
            <Image width={700} height={700} src={`${STORAGE_URL}/post/${photo}`} alt="" />
          </li>
        ))}
      </ul>
    </div>
  );
}
