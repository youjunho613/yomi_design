"use client";

import { SUB_CATEGORY } from "@/app/category.constant";
import usePost from "@/service/post/mutations";
import { STORAGE_URL } from "@/supabase/supabase";
import Image from "next/image";
import Error from "../shared/Error";
import Loading from "../shared/loading/Loading";

import type { TMainSignType } from "@/app/category.constant";

export default function Detail() {
  const { fetchPost } = usePost();
  const { data, isError, isLoading, error } = fetchPost;

  if (isLoading) return <Loading />;
  if (isError) return <Error error={error.message} />;
  if (!data) return <p>업로드된 게시물이 없습니다.</p>;

  const mainCategory = data.mainCategory as TMainSignType;
  const subCategory = SUB_CATEGORY[mainCategory];
  const currentCategory = subCategory.find(({ id }) => id === data.subCategory);
  const categoryLabel = currentCategory?.label;

  return (
    <div>
      <div className="flex flex-col border-b-2 border-black002">
        <h2 className="text-2xl">{data.title}</h2>
        <p className="px-5 text-sm">주소 : {data.address}</p>
        <p className="px-5 text-sm">종류 : {categoryLabel}</p>
      </div>
      <ul className="contents-center my-10 flex flex-col gap-5">
        {data.photoUrl.map((photo, index) => (
          <li key={index}>
            <Image width={700} height={700} src={`${STORAGE_URL}/post/${photo}`} alt="" />
          </li>
        ))}
      </ul>
    </div>
  );
}
