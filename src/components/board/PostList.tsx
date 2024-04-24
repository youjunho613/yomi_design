"use client";

import { STORAGE_URL } from "@/supabase/supabase";
import Image from "next/image";
import Link from "next/link";
import usePost from "@/service/post/mutations";
import { SUB_CATEGORY } from "@/app/category.constant";
import type { TMainSignType, TSubCategory } from "@/app/category.constant";

interface IProps {
  category: {
    mainCategory: TMainSignType | undefined;
    subCategory: TSubCategory | undefined;
  };
}

export default function PostList({ category }: IProps) {
  const { fetchFilteredPosts } = usePost();

  const { data, isLoading, isError } = fetchFilteredPosts;

  if (!data || data.length === 0) return <p>업로드된 게시물이 없습니다.</p>;
  if (isLoading) return <p>로딩 중...</p>;
  if (isError) return <p>에러가 발생했습니다.</p>;

  return (
    <ul className="flex flex-wrap gap-[26px]">
      {data.map((data) => {
        const path = `/board/${data.mainCategory}/${data.subCategory}/${data.id}`;
        const mainCategory = data.mainCategory as TMainSignType;
        const subCategory = SUB_CATEGORY[mainCategory];
        const currentCategory = subCategory.find(({ id }) => id === data.subCategory);
        const categoryLabel = currentCategory?.label;

        return (
          <Link key={data.id} href={path}>
            <li className="w-[230px] border-[3px] border-black002 bg-white">
              <div className="contents-center relative h-[224px] w-[224px]">
                <Image
                  // width={224}
                  // height={224}
                  src={`${STORAGE_URL}/post/${data.mainPhotoUrl}`}
                  alt={`${data.title} 시공사진`}
                  objectFit="cover"
                  layout="fill"
                />
              </div>
              <div className="flex h-[60px] w-[224px] flex-col justify-center border-t-[3px] border-black002 px-3">
                <p className="text-base font-bold">{data.title}</p>
                <p className="text-sm font-medium">{categoryLabel}</p>
              </div>
            </li>
          </Link>
        );
      })}
    </ul>
  );
}
