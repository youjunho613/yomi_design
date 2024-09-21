import type { IOpenPostHandlerProps, IPost } from "@/app/admin/postManagement/page";
import usePost from "@/service/post/mutations";
import { TablesUpdate } from "@/supabase/type";
import { toast } from "react-toastify";

interface IProps {
  postId: number;
  postPhotoUrl: string[];
  openPost: IPost;
  modifyPost: TablesUpdate<"board"> | null;
  openPostHandler: ({ target, postId }: IOpenPostHandlerProps) => void;
  initialModifyPost: () => void;
}

export default function EditButtons(props: IProps) {
  const { postId, postPhotoUrl, openPost, modifyPost, openPostHandler, initialModifyPost } = props;
  const { modifyPostMutation, deletePostMutation } = usePost();

  const modifyPostHandler = async () => {
    if (!modifyPost) {
      toast.error("변경사항이 없습니다.");
      return;
    }

    if (modifyPost.subTitle === "") {
      toast.error("부제목을 입력해주세요.");
      return;
    }

    modifyPostMutation.mutate({ request: modifyPost, id: postId });
    initialModifyPost();
    openPostHandler({ target: "init" });
  };

  const deletePostHandler = async () => {
    deletePostMutation.mutate({ id: postId, fileList: postPhotoUrl });
  };

  const initHandler = () => {
    openPostHandler({ target: "init" });
    initialModifyPost();
  };

  return (
    <div className="contents-between px-3">
      {postId === openPost.modifyId ? (
        <button className="click-button border-black bg-red-200" onClick={initHandler}>
          취소
        </button>
      ) : postId === openPost.deleteId ? (
        <button className="click-button border-black bg-red-200" onClick={deletePostHandler}>
          삭제
        </button>
      ) : (
        <button
          className="click-button border-black bg-white"
          onClick={() => openPostHandler({ target: "modifyId", postId })}
        >
          수정
        </button>
      )}
      {postId === openPost.modifyId ? (
        <button className="click-button border-black bg-green-200" onClick={modifyPostHandler}>
          적용
        </button>
      ) : postId === openPost.deleteId ? (
        <button className="click-button border-black bg-green-200" onClick={initHandler}>
          취소
        </button>
      ) : (
        <button
          className="click-button border-black bg-white"
          onClick={() => openPostHandler({ target: "deleteId", postId })}
        >
          삭제
        </button>
      )}
    </div>
  );
}
