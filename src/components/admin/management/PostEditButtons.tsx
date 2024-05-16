import usePost from "@/service/post/mutations";
import type { Tables } from "@/supabase/type";
import { toast } from "react-toastify";
import type { IToggleState } from "./PostManage";

interface IProps {
  post: Tables<"board">;
  closeHandler: () => void;
  modifyTarget: IToggleState["modifyPostId"];
  initialCategory: ({ id, mainCategory }: Pick<Tables<"board">, "id" | "mainCategory">) => void;
}

export default function PostEditButtons(props: IProps) {
  const { post, modifyTarget, closeHandler, initialCategory } = props;
  const { deletePostMutation } = usePost();

  const postDeleteHandler = (post: Tables<"board">) => {
    if (confirm(`"${post.id}. ${post.title}" 을(를) 정말 삭제하시겠습니까?`)) {
      deletePostMutation.mutate({ id: post.id, fileList: post.photoUrl });
      toast.success(`삭제되었습니다.`);
    }
  };

  return modifyTarget === post.id ? (
    <div className="flex flex-col gap-2 px-2 py-1">
      <button
        className="basic-button w-full self-center rounded-xl bg-sub px-4 py-2"
        type="button"
        onClick={closeHandler}
      >
        닫기
      </button>
    </div>
  ) : (
    <div className="contents-between px-2 py-1">
      <button
        type="button"
        className="basic-button rounded-xl bg-blue-500 px-4 py-2"
        onClick={() => initialCategory({ id: post.id, mainCategory: post.mainCategory })}
      >
        수정
      </button>
      <button
        type="button"
        className="basic-button rounded-xl bg-red-500 px-4 py-2"
        onClick={() => postDeleteHandler(post)}
      >
        삭제
      </button>
      <button type="button" className="basic-button rounded-xl bg-gray-700 px-4 py-2" onClick={closeHandler}>
        닫기
      </button>
    </div>
  );
}
