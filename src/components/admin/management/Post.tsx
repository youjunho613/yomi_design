import type { Tables } from "@/supabase/type";
import CategoryKor from "@/utils/categoryKor";

interface IProps {
  post: Tables<"board">;
}

export default function Post({ post }: IProps) {
  return (
    <div className="flex flex-col items-start justify-center border-2 border-black bg-white p-2 text-black">
      <p className="contents-between w-full">
        게시물 ID :<span>{post.id}</span>
      </p>
      <p className="contents-between w-full">
        제목 :<span>{post.title}</span>
      </p>
      <p className="contents-between w-full">
        주소 :<span>{post.address}</span>
      </p>
      <p className="contents-between w-full">
        종류 :<span>{CategoryKor({ mainCategory: post.mainCategory, subCategory: post.subCategory }).detail}</span>
      </p>
    </div>
  );
}
