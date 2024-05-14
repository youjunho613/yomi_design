import { MAIN_CATEGORY, SUB_CATEGORY, type TMainSignType } from "@/app/category.constant";
import usePost from "@/service/post/mutations";
import { STORAGE_URL } from "@/supabase/supabase";
import type { Tables } from "@/supabase/type";
import CategoryKor from "@/utils/categoryKor";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

interface IModifyForm {
  title: string;
  address: string;
  mainCategory: string;
  subCategory: string;
}

interface IProps {
  data: Tables<"board">[];
}

interface IToggleState {
  open: number | undefined;
  photoModify: boolean;
  modify: number | undefined;
  category: TMainSignType;
}

export default function PostManage({ data }: IProps) {
  const { modifyPostMutation, deletePostMutation } = usePost();
  const initialState: IToggleState = { category: "logo", modify: undefined, open: undefined, photoModify: false };
  const [toggleState, setToggleState] = useState<IToggleState>(initialState);
  const { register, reset, handleSubmit } = useForm<IModifyForm>();

  const openHandler = (id: number) => {
    if (toggleState.open === id && toggleState.modify === id) {
      setToggleState({ ...toggleState, open: undefined, modify: undefined });
      reset();
      return;
    }

    if (toggleState.open === id) {
      setToggleState({ ...toggleState, open: undefined });
      return;
    }

    if (toggleState.modify === undefined) {
      setToggleState({ ...toggleState, open: id });
    } else if (
      confirm(`수정 중인 게시물이 있습니다.
수정을 취소하고 다른 게시물을 열까요?`)
    ) {
      setToggleState({ ...toggleState, open: id, modify: undefined });
      reset();
    }
  };

  const postModifyHandler = (data: IModifyForm) => {
    if (!toggleState.modify) return;

    modifyPostMutation.mutate({ id: toggleState.modify, request: data });
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

  return (
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
              {toggleState.modify !== post.id && (
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
            {toggleState.modify === post.id &&
              (toggleState.photoModify ? (
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
                    onClick={() => setToggleState({ ...toggleState, photoModify: false })}
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
                    <input type="text" id="title" className="input" defaultValue={post.title} {...register("title")} />
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
                        onChange: (event) =>
                          setToggleState({ ...toggleState, category: event.target.value as TMainSignType }),
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
                      {SUB_CATEGORY[toggleState.category].map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.label}
                        </option>
                      ))}
                    </select>
                  </label>
                  <button
                    type="button"
                    className="basic-button mt-2 w-full self-center rounded-xl bg-main px-4 py-2 font-bold text-sub"
                    onClick={() => setToggleState({ ...toggleState, photoModify: true })}
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
            {toggleState.open === post.id &&
              (toggleState.modify === post.id ? (
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
                      setToggleState({ ...toggleState, modify: post.id, category: post.mainCategory as TMainSignType });
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
  );
}
