"use client";

import usePost from "@/service/post/mutations";
import { STORAGE_URL } from "@/supabase/supabase";
import CategoryKor from "@/utils/categoryKor";
import Image from "next/image";
import Link from "next/link";
import Error from "../shared/Error";
import Loading from "../shared/loading/Loading";

interface IProps {
  category: any;
}

export default function PostList({ category }: IProps) {
  const { fetchSignagePosts } = usePost();
  const { data, isError, isLoading, error } = fetchSignagePosts;

  const filterData = data?.filter((post) => post.category?.eng_name === category);

  if (isLoading) return <Loading />;
  if (isError) return <Error error={error.message} />;
  if (!filterData || filterData.length === 0) return <p>업로드된 게시물이 없습니다.</p>;

  return (
    <ul className="flex flex-wrap justify-center gap-[26px] sm:justify-start">
      {filterData.map((data) => {
        const path = `/board/${data.id}`;
        const sourcePath = `${STORAGE_URL}/post/${data.photoUrl[0]}`;
        const categoryLabel = CategoryKor(data.signType);

        return (
          <Link key={data.id} href={path}>
            <li className="post-border w-[230px]">
              <div className="contents-center relative h-[224px] w-[224px] object-fill">
                <Image src={sourcePath} alt={`${data.title} 시공사진`} fill className="object-cover" />
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
