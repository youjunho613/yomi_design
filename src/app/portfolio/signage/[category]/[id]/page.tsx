"use client";

import { aggro } from "@/app/fonts/font";
import Error from "@/components/shared/Error";
import Loading from "@/components/shared/loading/Loading";
import usePost from "@/service/post/mutations";
import { useSignType } from "@/service/sign/mutations";
import { STORAGE_URL } from "@/supabase/supabase";
import Image from "next/image";

export default function Detail() {
  const { fetchPost } = usePost();
  const { data, isError, isLoading, error } = fetchPost;
  const { fetchSignType } = useSignType();
  const { data: signTypeList } = fetchSignType;

  const signTypeLabel = signTypeList?.find(({ eng_name }) => eng_name === data?.signType)?.kor_name;

  if (isLoading) return <Loading />;
  if (isError) return <Error error={error.message} />;
  if (!data) return <p>업로드된 게시물이 없습니다.</p>;

  return (
    <div className="w-full">
      <div className="flex flex-col content-center items-center gap-2 md:gap-[15px]">
        <p className={`${aggro.className} text-[40px] leading-[36px]`}>요미디자인</p>
        <ul className="detail-subtitle flex gap-2 text-[14px] leading-none xl:text-[26px]">
          <li className="flex gap-2">
            <p>{data.type === "signage" ? "간판" : "브랜딩"}</p>
          </li>
          <li className="flex gap-2">
            <p>{signTypeLabel}</p>
          </li>
          {data.done?.find((string) => string === "디자인") && (
            <li className="flex gap-2">
              <p>디자인</p>
            </li>
          )}
          {data.done?.find((string) => string === "제작") && (
            <li className="flex gap-2">
              <p>제작</p>
            </li>
          )}
          {data.done?.find((string) => string === "시공") && (
            <li className="flex gap-2">
              <p>시공</p>
            </li>
          )}
        </ul>
      </div>
      <ul className="contents-center my-10 flex flex-col gap-5">
        {data.photoUrl.map((photo, index) => (
          <li key={index} className="relative aspect-square w-full">
            <Image src={`${STORAGE_URL}/post/${photo}`} alt={data.title} fill className="object-cover shadow-2xl" />
          </li>
        ))}
      </ul>
    </div>
  );
}
