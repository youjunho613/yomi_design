"use client";

import usePost from "@/service/post/mutations";
import { STORAGE_URL } from "@/supabase/supabase";
import CategoryKor from "@/utils/categoryKor";
import Image from "next/image";
import Link from "next/link";
import Error from "../shared/Error";
import Loading from "../shared/loading/Loading";

import type { TMainSignType, TSubCategory } from "@/app/category.constant";

interface IProps {
  category: {
    mainCategory: TMainSignType | undefined;
    subCategory: TSubCategory | undefined;
  };
}

export default function PostList({ category }: IProps) {
  const { fetchFilteredPosts } = usePost();

  const { data, isError, isLoading, error } = fetchFilteredPosts;

  if (isLoading) return <Loading />;
  if (isError) return <Error error={error.message} />;
  if (!data || data.length === 0) return <p>업로드된 게시물이 없습니다.</p>;

  return (
    <ul className="responsive-width responsive-post-list flex flex-wrap">
      {data.map((data) => {
        const path = `/board/${data.mainCategory}/${data.subCategory}/${data.id}`;
        const sourcePath = `${STORAGE_URL}/post/${data.photoUrl[0]}`;
        const { mainCategory, subCategory } = data;
        const categoryLabel = CategoryKor({ mainCategory, subCategory }).subCategory;

        return (
          <Link key={data.id} href={path} className="responsive-post">
            <li className="post-border w-full">
              <div className="contents-center w-full">
                <Image
                  src={sourcePath}
                  alt={`${data.title} 시공사진`}
                  width={300}
                  height={300}
                  className="aspect-square w-full object-cover"
                />
              </div>
              <div className="flex h-[35px] w-full flex-col justify-center border-t-[3px] border-black002 px-2">
                <p className="text-[12px] font-bold">{data.title}</p>
                <p className="text-[8px] font-normal">{categoryLabel}</p>
              </div>
            </li>
          </Link>
        );
      })}
    </ul>
  );
}
