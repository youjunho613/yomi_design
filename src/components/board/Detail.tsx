"use client";

import usePost from "@/service/post/mutations";
import { STORAGE_URL } from "@/supabase/supabase";
import CategoryKor from "@/utils/categoryKor";
import Image from "next/image";
import Error from "../shared/Error";
import Loading from "../shared/loading/Loading";

export default function Detail() {
  const { fetchPost } = usePost();
  const { data, isError, isLoading, error } = fetchPost;

  if (isLoading) return <Loading />;
  if (isError) return <Error error={error.message} />;
  if (!data) return <p>업로드된 게시물이 없습니다.</p>;

  const { mainCategory, subCategory } = data;
  const categoryLabel = CategoryKor({ mainCategory, subCategory }).subCategory;

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
