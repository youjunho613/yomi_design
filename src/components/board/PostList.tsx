"use client";

import { Tables } from "@/../lib/supabase/schema";
import { SUPABASE_URL } from "@/../lib/supabase/supabase";
import { getPostList } from "@/app/api/post";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Props {
  category: any;
}

export default function PostList({ category }: Props) {
  const [postList, setPostList] = useState<Tables<"board", "Row">[] | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      const data = await getPostList();
      setPostList(data);
    };

    fetchPost();
  }, []);

  if (postList === null) return <p>업로드된 게시물이 없습니다.</p>;

  const filteringData = postList.filter((data) => {
    const words = data.path.split("/");
    if (category.length === 1) return words[2] === category[0];
    if (category.length === 2) return words[3] === category[1];
  });
  //

  return (
    <ul className="flex gap-[26px] flex-wrap">
      {filteringData.length === 0 ? (
        <p>업로드된 게시물이 없습니다.</p>
      ) : (
        filteringData.map((data) => (
          <Link key={data.id} href={`${data.path}/${data.id}`}>
            <li className="bg-white border-[3px] border-black002 w-[230px]">
              <div className="w-[224px] h-[224px] contents-center overflow-hidden object-cover">
                <Image
                  width={224}
                  height={224}
                  src={`${SUPABASE_URL}/storage/v1/object/public/estimate/${data.mainPhotoUrl}`}
                  alt={`${data.title} 시공사진`}
                />
              </div>
              <div className="border-t-[3px] border-black002 w-[224px] h-[60px] flex flex-col justify-center px-3">
                <p className="font-bold text-[15px]">{data.title}</p>
                <p className="font-medium text-[11px]">{data.category}</p>
              </div>
            </li>
          </Link>
        ))
      )}
    </ul>
  );
}
