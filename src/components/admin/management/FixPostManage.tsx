import usePost from "@/service/post/mutations";
import { STORAGE_URL } from "@/supabase/supabase";
import type { Tables } from "@/supabase/type";
import Image from "next/image";
import { useState } from "react";
import { toast } from "react-toastify";

export default function FixPostManage() {
  const { fetchMainPost, changeFixPostMutation } = usePost();
  const [fixPostToggle, setFixPostToggle] = useState<boolean>(false);
  const [currentFixPost, setCurrentFixPost] = useState<Pick<Tables<"mainPosts">, "position">>({ position: null });
  const [targetFixPost, setTargetFixPost] = useState<number | undefined>();

  const changeFixPostHandler = () => {
    if (!targetFixPost) return;
    if (!currentFixPost.position) return;

    changeFixPostMutation.mutate({ postId: targetFixPost, position: currentFixPost.position });
    toast.success(`${currentFixPost.position}번 고정글이 수정되었습니다.`);
  };

  return (
    <>
      <div className="flex justify-end p-2">
        <button className="bg-white px-4 py-3" type="button" onClick={() => setFixPostToggle(!fixPostToggle)}>
          {fixPostToggle ? "닫기" : "고정 게시글 변경"}
        </button>
      </div>
      {fixPostToggle && (
        <div className="mb-4">
          <ul className="contents-center gap-4 p-2">
            {fetchMainPost.data?.map((post, index) => (
              <li
                key={post.id}
                className={`border-4 p-2 ${currentFixPost.position === post.position ? "border-sub" : "border-black"}`}
              >
                <button
                  className="contents-center relative cursor-pointer flex-col text-2xl"
                  onClick={() => {
                    setCurrentFixPost({ position: post.position });
                  }}
                >
                  <Image
                    src={`${STORAGE_URL}/post/${post.board?.photoUrl[0]}` ?? ""}
                    alt={`${index + 1}번째 사진`}
                    width={500}
                    height={500}
                    className="aspect-square w-full"
                  />
                  <input
                    type="checkbox"
                    checked={currentFixPost.position === post.position}
                    className="absolute right-2 top-2"
                  />
                  <p>{index + 1}번</p>
                </button>
              </li>
            ))}
          </ul>
          {!currentFixPost.position ? (
            <p className="contents-center my-2 flex-col gap-2 border-y-4 border-black py-4 text-lg sm:flex-row">
              바꿀 게시물 자리를 선택해주세요.
            </p>
          ) : (
            <p className="contents-center my-2 flex-col gap-2 border-y-4 border-black py-4 text-lg sm:flex-row">
              <span>
                <span className="rounded-full bg-white px-2 py-1 text-2xl">{currentFixPost.position}</span>번 자리의
              </span>
              고정 게시글을
              <input
                type="number"
                name="fixPost"
                id="postId"
                min={1}
                placeholder="게시글 ID"
                className="w-32 px-2"
                onChange={(event) => setTargetFixPost(Number(event.target.value))}
              />
              <span className="contents-center gap-2">
                으로
                <button
                  type="button"
                  className="basic-button rounded-xl bg-sky-500 px-2 py-1"
                  onClick={changeFixPostHandler}
                >
                  변경
                </button>
              </span>
            </p>
          )}
        </div>
      )}
    </>
  );
}
