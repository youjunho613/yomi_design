import usePost from "@/service/post/mutations";
import { STORAGE_URL } from "@/supabase/supabase";
import type { Tables } from "@/supabase/type";
import Image from "next/image";

interface IProps {
  post: Tables<"board">;
  closeHandler: () => void;
}

export default function PhotoEdit({ post, closeHandler }: IProps) {
  const { modifyPostMutation } = usePost();
  const photoDeleteHandler = ({ post, photoUID }: { post: Tables<"board">; photoUID: string }) => {
    const photoUrl = post.photoUrl.filter((url) => url !== photoUID);
    modifyPostMutation.mutate({ id: post.id, request: { photoUrl } });
  };

  return (
    <ul className="flex flex-col gap-2 border-[3px] border-black bg-sub p-2">
      {post.photoUrl.map((url) => (
        <li key={url}>
          <Image src={`${STORAGE_URL}/post/${url}`} alt={url} width={500} height={500} />
          <button
            type="button"
            className="basic-button w-full self-center bg-main px-4 py-2 font-bold text-sub"
            onClick={() => photoDeleteHandler({ post, photoUID: url })}
          >
            해당 사진 삭제
          </button>
        </li>
      ))}
      <label className="basic-button contents-center w-full self-center rounded-xl bg-green-500 px-4 py-2">
        추가
        <input type="file" className="hidden" />
      </label>
      <button
        type="button"
        onClick={closeHandler}
        className="basic-button w-full self-center rounded-xl bg-main px-4 py-2 font-bold text-sub"
      >
        취소
      </button>
    </ul>
  );
}
