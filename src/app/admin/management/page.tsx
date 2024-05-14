"use client";

import { MAIN_CATEGORY, SUB_CATEGORY, TMainSignType } from "@/app/category.constant";
import Error from "@/components/shared/Error";
import Loading from "@/components/shared/loading/Loading";
import usePost from "@/service/post/mutations";
import { STORAGE_URL } from "@/supabase/supabase";
import { Tables } from "@/supabase/type";
import CategoryKor from "@/utils/categoryKor";
import Image from "next/image";
import { Fragment, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

interface IModifyForm {
  title: string;
  address: string;
  mainCategory: string;
  subCategory: string;
}

export default function Page() {
  const { fetchPosts, fetchMainPost, modifyPostMutation, deletePostMutation, changeFixPostMutation } = usePost();
  const { data, isError, isLoading, error } = fetchPosts;

  const [modifyToggle, setModifyToggle] = useState<number | undefined>();
  const [fixPostToggle, setFixPostToggle] = useState<boolean>(false);
  const [targetFixPost, setTargetFixPost] = useState<number | undefined>();
  const [photoIsOpen, setPhotoIsOpen] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<number | undefined>();
  const [currentCategory, setCurrentCategory] = useState<TMainSignType>("logo");
  const [currentFixPost, setCurrentFixPost] = useState<Pick<Tables<"mainPosts">, "position">>({ position: null });
  const { register, reset, handleSubmit } = useForm<IModifyForm>();

  const openHandler = (id: number) => {
    if (isOpen === id && modifyToggle === id) {
      setIsOpen(undefined);
      setModifyToggle(undefined);
      reset();
      return;
    }

    if (isOpen === id) {
      setIsOpen(undefined);
      return;
    }

    if (modifyToggle === undefined) {
      setIsOpen(id);
    } else if (
      confirm(`수정 중인 게시물이 있습니다.
수정을 취소하고 다른 게시물을 열까요?`)
    ) {
      setIsOpen(id);
      setModifyToggle(undefined);
      reset();
    }
  };

  const postModifyHandler = (data: IModifyForm) => {
    if (!modifyToggle) return;

    modifyPostMutation.mutate({ id: modifyToggle, request: data });
    toast.success(`수정되었습니다.`);
  };

  const postDeleteHandler = (post: Tables<"board">) => {
    if (confirm(`"${post.id}. ${post.title}" 을(를) 정말 삭제하시겠습니까?`)) {
      deletePostMutation.mutate({ id: post.id, fileList: post.photoUrl });
      toast.success(`삭제되었습니다.`);
    }
  };

  const photoDeleteHandler = ({ post, photoUID }: { post: Tables<"board">; photoUID: string }) => {
    const photoUrl = post.photoUrl.filter((url) => url !== photoUID);

    modifyPostMutation.mutate({ id: post.id, request: { photoUrl } });
  };

  const changeFixPostHandler = () => {
    if (!targetFixPost) return;
    if (!currentFixPost.position) return;

    changeFixPostMutation.mutate({ postId: targetFixPost, position: currentFixPost.position });
    toast.success(`${currentFixPost.position}번 고정글이 수정되었습니다.`);
  };

  if (isLoading) return <Loading />;
  if (isError) return <Error error={error.message} />;
  if (!data) return <p>업로드된 게시물이 없습니다.</p>;

  return (
    <Fragment>
      <h1 className="my-5 w-full text-center text-2xl font-bold">게시물 관리</h1>
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

      <ul className="flex w-full flex-wrap items-center gap-2.5 sm:gap-6">
        {data.map((post) => {
          return (
            <li key={post.id} className="w-[47.4%] max-w-[230px]">
              <button className="w-full" type="button" onClick={() => openHandler(post.id)}>
                <div className="relative aspect-square w-full border-[3px] border-black">
                  <Image
                    src={`${STORAGE_URL}/post/${post.photoUrl[0]}`}
                    alt="시공 사진"
                    width={500}
                    height={500}
                    loading="eager"
                    className="aspect-square w-full"
                  />
                </div>
                {modifyToggle !== post.id && (
                  <div className="flex flex-col items-start justify-center border-[3px] border-black bg-white p-2 text-black">
                    <p className="contents-between w-full">
                      게시물 ID :<span>{post.id}</span>
                    </p>
                    <p className="contents-between w-full">
                      제목 :<span>{post.title}</span>
                    </p>
                    <p className="contents-between w-full">
                      주소 :<span>{post.address}</span>
                    </p>
                    <p className="contents-between w-full">
                      종류 :
                      <span>
                        {CategoryKor({ mainCategory: post.mainCategory, subCategory: post.subCategory }).detail}
                      </span>
                    </p>
                  </div>
                )}
              </button>
              {modifyToggle === post.id &&
                (photoIsOpen ? (
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
                      onClick={() => setPhotoIsOpen(false)}
                      className="basic-button w-full self-center rounded-xl bg-main px-4 py-2 font-bold text-sub"
                    >
                      취소
                    </button>
                  </ul>
                ) : (
                  <form
                    onSubmit={handleSubmit(postModifyHandler)}
                    className="flex -translate-y-2 flex-col items-start justify-center border-[3px] border-black bg-sub p-2 text-main"
                  >
                    <p className="flex w-full items-center justify-between">
                      게시물 ID :<span>{post.id}</span>
                    </p>
                    <label htmlFor="title">
                      제목 :
                      <input
                        type="text"
                        id="title"
                        className="input"
                        defaultValue={post.title}
                        {...register("title")}
                      />
                    </label>
                    <label htmlFor="address">
                      주소 :
                      <input
                        type="text"
                        id="address"
                        className="input"
                        defaultValue={post.address}
                        {...register("address")}
                      />
                    </label>
                    <label htmlFor="mainCategory" className="w-full">
                      대분류 :
                      <select
                        id="mainCategory"
                        className="mb-2 w-full text-black"
                        defaultValue={post.mainCategory}
                        {...register("mainCategory", {
                          onChange: (event) => setCurrentCategory(event.target.value as TMainSignType),
                        })}
                      >
                        {MAIN_CATEGORY.map((category) => (
                          <option key={category.id} value={category.id}>
                            {category.label}
                          </option>
                        ))}
                      </select>
                    </label>
                    <label htmlFor="subCategory" className="w-full">
                      소분류 :
                      <select
                        id="subCategory"
                        className="mb-2 w-full text-black"
                        defaultValue={post.subCategory}
                        {...register("subCategory")}
                      >
                        <option value={undefined}>선택하세요.</option>
                        {SUB_CATEGORY[currentCategory].map((category) => (
                          <option key={category.id} value={category.id}>
                            {category.label}
                          </option>
                        ))}
                      </select>
                    </label>
                    <button
                      type="button"
                      className="basic-button mt-2 w-full self-center rounded-xl bg-main px-4 py-2 font-bold text-sub"
                      onClick={() => setPhotoIsOpen(true)}
                    >
                      사진 수정
                    </button>
                    <button
                      type="submit"
                      className="basic-button mt-2 w-full self-center rounded-xl bg-main px-4 py-2 font-bold text-sub"
                    >
                      수정
                    </button>
                  </form>
                ))}
              {isOpen === post.id &&
                (modifyToggle === post.id ? (
                  <div className="flex flex-col gap-2 px-2 py-1">
                    <button
                      className="basic-button w-full self-center rounded-xl bg-sub px-4 py-2"
                      type="button"
                      onClick={() => openHandler(post.id)}
                    >
                      닫기
                    </button>
                  </div>
                ) : (
                  <div className="contents-between px-2 py-1">
                    <button
                      type="button"
                      className="basic-button rounded-xl bg-blue-500 px-4 py-2"
                      onClick={() => {
                        setModifyToggle(post.id);
                        setCurrentCategory(post.mainCategory as TMainSignType);
                      }}
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
                    <button
                      type="button"
                      className="basic-button rounded-xl bg-gray-700 px-4 py-2"
                      onClick={() => openHandler(post.id)}
                    >
                      닫기
                    </button>
                  </div>
                ))}
            </li>
          );
        })}
      </ul>
    </Fragment>
  );
}
