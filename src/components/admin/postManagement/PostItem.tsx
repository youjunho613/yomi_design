import { STORAGE_URL } from "@/supabase/supabase";
import { Tables } from "@/supabase/type";
import Image from "next/image";

interface IProps {
  post: Tables<"board"> & { category: Tables<"category"> | null };
}

export default function PostItem({ post }: IProps) {
  return (
    <div className="contents-center w-[20vw] flex-col border-b border-black xl:w-[15vw]">
      <div className="relative aspect-square w-[20vw] border border-t-0 border-black xl:w-[15vw]">
        <Image src={`${STORAGE_URL}/post/${post.photoUrl[0]}`} alt={post.title} fill sizes="20vw" />
      </div>
      <table className="flex w-full justify-between px-3 py-2 text-xs xl:text-base">
        <thead className="float-left w-1/3 text-center">
          <tr className="block">
            <th className="block">id</th>
            <th className="block">브랜드명</th>
            <th className="block">부제목</th>
            <th className="block">주소</th>
            <th className="block">업종</th>
            {/* <th className="block">시공</th> */}
            <th className="block">종류</th>
            <th className="block">게시글 타입</th>
            <th className="block">작성일</th>
          </tr>
        </thead>

        <tbody className="block w-2/3 overflow-x-hidden whitespace-nowrap text-center">
          <tr className="inline-block">
            <td className="block">{post.id}</td>
            <td className="block">{post.title}</td>
            <td className="block">{post.subTitle}</td>
            <td className="block">{post.address}</td>
            <td className="block">{post.category?.kor_name}</td>
            {/* <td className="block">{post.done?.join(",") ?? "　"}</td> */}
            <td className="block">{post.signType}</td>
            <td className="block">{post.type}</td>
            <td className="block">{post.created_at.slice(0, 10)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
