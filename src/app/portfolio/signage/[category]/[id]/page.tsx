"use client";

import { aggro } from "@/app/fonts/font";
import Error from "@/components/shared/Error";
import Loading from "@/components/shared/loading/Loading";
import usePost from "@/service/post/mutations";
import { STORAGE_URL } from "@/supabase/supabase";
import Image from "next/image";

export default function Detail() {
  const { fetchPost } = usePost();
  const { data, isError, isLoading, error } = fetchPost;

  if (isLoading) return <Loading />;
  if (isError) return <Error error={error.message} />;
  if (!data) return <p>업로드된 게시물이 없습니다.</p>;

  return (
    <div className="w-full">
      <div className="flex flex-col content-center items-center gap-1 md:gap-[15px]">
        <p className={`${aggro.className} text-[23px] leading-[90%] xl:text-[40px]`}>{data.title}</p>
        <p className="text-[14px] leading-none xl:text-[26px]">{data.subTitle}</p>
      </div>
      <ul className="contents-center my-10 flex flex-col gap-5">
        {data.photoUrl.map((photo, index) => (
          <li key={index} className="relative aspect-square w-full lg:w-1/2">
            <Image src={`${STORAGE_URL}/post/${photo}`} alt={data.title} fill className="object-cover shadow-2xl" />
          </li>
        ))}
      </ul>
    </div>
  );
}
