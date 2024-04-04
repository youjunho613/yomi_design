import { getPostList } from "@/app/api/post";
import useIsOpen from "@/store/useIsOpen";
import usePostEdit from "@/store/usePostEdit";
import { useEffect } from "react";
import Text from "../Text";
import EditButton from "./EditButton";
import EditText from "./EditText";
import PhotoList from "./PhotoList";

export default function Management() {
  const { postIsOpen, setInitialIsOpen, changeEditMode } = useIsOpen();
  const { editBoard, setEditBoard } = usePostEdit();

  useEffect(() => {
    const fetchPost = async () => {
      const data = await getPostList();
      setInitialIsOpen(data);
      setEditBoard(data);
    };

    fetchPost();
  }, [setEditBoard, setInitialIsOpen]);

  if (editBoard === null) return <p>업로드된 게시물이 없습니다.</p>;

  return (
    <div>
      <ul className="flex flex-col gap-7 bg-sub mt-10 px-5 py-10 rounded-lg">
        {editBoard.map((post) => (
          <li className="flex flex-col gap-4 bg-main rounded-lg px-5 py-10" key={post.id}>
            <div className="w-full grid grid-cols-2 gap-5">
              <Text label="게시물 번호" data={post.id} />
              <EditText label="제목" name="title" post={post} />
              <EditText label="종류" name="category" post={post} />
            </div>
            <div className="w-full grid grid-cols-2 gap-5">
              <EditText label="주소" name="address" post={post} />
              <button className="bg-sub px-3" onClick={() => changeEditMode(post.id, "photo")}>
                {postIsOpen[post.id].photo ? "닫기" : "사진 보기"}
              </button>
            </div>
            {postIsOpen[post.id].photo && <PhotoList post={post} />}
            <EditButton post={post} />
          </li>
        ))}
      </ul>
    </div>
  );
}
