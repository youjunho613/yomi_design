import usePost from "@/service/post/mutations";
import useCategorySelect from "@/store/useCategorySelect";
import usePostModify from "@/store/usePostModify";
import { Tables } from "@/supabase/type";

interface Props {
  post: Tables<"board">;
}

export default function EditButton({ post }: Props) {
  const { postIsOpen, modifyContent, setInitialContent, onChangeEditMode, reset } = usePostModify();
  const { modifyPostMutation, deletePostMutation } = usePost();
  const { mainCategory, subCategory, resetCategory } = useCategorySelect();

  const { id, photoUrl: fileList } = post;

  const onClickModify = () => {
    if (modifyContent === null) return alert("수정할 내용을 입력해주세요.");

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
  };

  const onClickDelete = () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      deletePostMutation.mutate({ id, fileList });
      return;
    }
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
    <div className="contents-center gap-10 mt-10">
      {postIsOpen === id ? (
        <>
          <button className="basic-button bg-green-500 px-4 py-3 rounded-2xl" onClick={onClickModify}>
            완료
          </button>
          <button className="basic-button px-4 py-3 rounded-2xl" onClick={cancelModify}>
            취소
          </button>
        </>
      ) : (
        <button className="basic-button px-4 py-3 rounded-2xl" onClick={modifyToggle}>
          수정
        </button>
      )}

      <button className="basic-button px-4 py-3 rounded-2xl" onClick={onClickDelete}>
        삭제
      </button>
    </div>
  );
}
