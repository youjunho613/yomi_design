"use client";

import { Tables } from "@/../lib/supabase/schema";
import { SUPABASE_URL } from "@/../lib/supabase/supabase";
import { getPost } from "@/app/api/post";
import Image from "next/image";
import { useEffect, useState } from "react";

interface Props {
  postId: string;
}

export default function Detail({ postId }: Props) {
  const [post, setPost] = useState<Tables<"board", "Insert"> | null>(null);
  useEffect(() => {
    const fetchPost = async () => {
      const data = await getPost(postId);
      setPost(data);
    };

    fetchPost();
  }, [postId]);

  if (post === null) return <p>업로드된 게시물이 없습니다.</p>;

  return (
    <div>
      <div className="flex flex-col border-b-2 border-black002">
        <h2 className="text-2xl">{post.title}</h2>
        <p className="text-sm px-5">주소 : {post.address}</p>
        <p className="text-sm px-5">종류 : {post.category}</p>
      </div>
      <ul className="flex flex-col contents-center my-10 gap-5">
        {post.photoUrl.map((photo, index) => (
          <li key={index}>
            <Image width={700} height={700} src={`${SUPABASE_URL}/storage/v1/object/public/estimate/${photo}`} alt="" />
          </li>
        ))}
      </ul>
    </div>
  );
}
