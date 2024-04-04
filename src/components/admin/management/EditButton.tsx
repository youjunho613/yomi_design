import { deletePost, editPost } from "@/app/api/post";
import { Tables } from "@/../lib/supabase/schema";
import useIsOpen from "@/store/useIsOpen";
import usePostEdit from "@/store/usePostEdit";

interface Props {
  post: Tables<"board", "Row">;
}

export default function EditButton({ post }: Props) {
  const { editBoard } = usePostEdit();
  const { postIsOpen, changeEditMode } = useIsOpen();

  const editPostHandler = (id: number) => {
    if (editBoard === null) return;
    editPost(editBoard[id], id);
    changeEditMode(id, "edit");
  };

  return (
    <div className="contents-center gap-10 mt-10">
      {postIsOpen[post.id].edit ? (
        <button onClick={() => editPostHandler(post.id)}>완료</button>
      ) : (
        <button onClick={() => changeEditMode(post.id, "edit")}>편집</button>
      )}
      <button onClick={() => deletePost(post.id)}>삭제</button>
    </div>
  );
}
