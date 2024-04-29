import usePost from "@/service/post/mutations";
import useCategorySelect from "@/store/useCategorySelect";
import usePostModify from "@/store/usePostModify";
import { Tables } from "@/supabase/type";
import { toast } from "react-toastify";

interface Props {
  post: Tables<"board">;
}

export default function EditButton({ post }: Props) {
  const { postIsOpen, modifyContent, setInitialContent, onChangeEditMode, reset } = usePostModify();
  const { modifyPostMutation, deletePostMutation } = usePost();
  const { mainCategory, subCategory, resetCategory } = useCategorySelect();

  const { id, photoUrl: fileList } = post;

  const onClickModify = () => {
    if (modifyContent === null) return toast.error("수정할 내용을 입력해주세요.");

    let request = { ...modifyContent };
    const isSelectCategory = mainCategory !== undefined && subCategory !== undefined;

    if (isSelectCategory) {
      request = {
        ...modifyContent,
        mainCategory,
        subCategory,
      };
    }

    modifyPostMutation.mutate({ request, id });
    reset();
    resetCategory();
    toast.success("게시글이 수정되었습니다.");
  };

  const onClickDelete = () => {
    if (!confirm("정말 삭제하시겠습니까?")) return;

    deletePostMutation.mutate({ id, fileList });
    toast.success("게시글이 삭제되었습니다.");
  };

  const modifyToggle = () => {
    setInitialContent(post);
    onChangeEditMode(id);
  };

  const cancelModify = () => {
    reset();
    resetCategory();
  };

  return (
    <div className="contents-center mt-10 gap-10">
      {postIsOpen === id ? (
        <>
          <button className="basic-button rounded-2xl bg-green-500 px-4 py-3" onClick={onClickModify}>
            완료
          </button>
          <button className="basic-button rounded-2xl px-4 py-3" onClick={cancelModify}>
            취소
          </button>
        </>
      ) : (
        <button className="basic-button rounded-2xl px-4 py-3" onClick={modifyToggle}>
          수정
        </button>
      )}

      <button className="basic-button rounded-2xl px-4 py-3" onClick={onClickDelete}>
        삭제
      </button>
    </div>
  );
}
