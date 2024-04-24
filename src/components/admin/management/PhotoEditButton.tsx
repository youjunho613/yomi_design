import usePostEdit from "@/store/usePostPhotoModify";
import { Tables } from "@/supabase/type";

interface Props {
  post: Tables<"board">;
  index: number;
}

export default function PhotoEditButtons({ post, index }: Props) {
  const { deleteOnePhoto, sequenceChangeHandler } = usePostEdit();

  return (
    <div className="contents-center absolute -right-4 w-20 translate-x-full flex-col gap-4">
      {index !== 0 && (
        <input
          type="button"
          value="▲"
          className="basic-button rounded-xl px-4 py-3"
          onClick={() => {
            sequenceChangeHandler({ index, target: index - 1 });
          }}
        />
      )}
      <input
        type="button"
        value="삭제"
        className="basic-button rounded-xl px-4 py-3"
        onClick={() => deleteOnePhoto(post.id, index)}
      />
      {index !== post.photoUrl.length - 1 && (
        <input
          type="button"
          value="▼"
          className="basic-button rounded-xl px-4 py-3"
          onClick={(event) => {
            sequenceChangeHandler({ index, target: index + 1 });
            const gap = 40;
            const imageHeight = event.currentTarget.offsetParent?.parentNode?.firstElementChild?.clientHeight;

            if (imageHeight) {
              window.scrollBy(0, imageHeight + gap * 2);
            }
          }}
        />
      )}
    </div>
  );
}
