import { Tables } from "@/../lib/supabase/schema";
import usePostEdit from "@/store/usePostEdit";

interface Props {
  post: Tables<"board", "Row">;
  index: number;
}

export default function PhotoEditButtons({ post, index }: Props) {
  const { deleteOnePhoto, sequenceChangeHandler } = usePostEdit();

  return (
    <div className="flex flex-col w-[60px]">
      {index !== 0 && (
        <input
          type="button"
          value="▲"
          className="border-2 border-black002 h-full px-3 py-2 cursor-pointer"
          onClick={() => sequenceChangeHandler(post.id, index, index - 1)}
        />
      )}
      <input
        type="button"
        value="삭제"
        className="border-2 border-black002 h-full px-3 py-2 cursor-pointer"
        onClick={() => deleteOnePhoto(post.id, index)}
      />
      {index !== post.photoUrl.length - 1 && (
        <input
          type="button"
          value="▼"
          className="border-2 border-black002 h-full px-3 py-2 cursor-pointer"
          onClick={() => sequenceChangeHandler(post.id, index, index + 1)}
        />
      )}
    </div>
  );
}
