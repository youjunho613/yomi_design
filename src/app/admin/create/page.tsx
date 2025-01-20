"use client";

import useCategory from "@/service/category/mutations";
import usePost from "@/service/post/mutations";
import { useSignType } from "@/service/sign/mutations";
import { fileToUrls } from "@/supabase/supabase";
import { byteConverter } from "@/utils/byteConverter";
import { Fragment } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { SIGN_CONTENT } from "./sign_cotent";

export interface PostFormInput {
  title: string;
  subTitle: string;
  address: string;
  type: "signage" | "branding";
  signTypeId: number;
  categoryId: number;
  imageFile: FileList;
}

export default function Page() {
  const { register, handleSubmit, reset, watch } = useForm<PostFormInput>();
  const fileList = watch("imageFile");

  const { createPostMutation } = usePost();
  const { fetchSignType } = useSignType();
  const { fetchCategory } = useCategory();

  const onSubmit = async (data: PostFormInput) => {
    const { title, subTitle, address, type, signTypeId, categoryId } = data;
    const request = { title, subTitle, address, type, signTypeId, categoryId };
    if (!title) return toast.error("제목을 입력해주세요.");
    if (!subTitle) return toast.error("부제목을 입력해주세요.");
    if (!type) return toast.error("게시글 타입을 선택해주세요.");
    if (!categoryId) return toast.error("업종을 선택해주세요.");
    if (data.imageFile.length === 0) return toast.error("사진을 선택해주세요.");

    const promiseText = { pending: "업로드 중 🚀", success: "업로드 성공 👌", error: "업로드 실패 🤯" };
    const photoUrl = await toast.promise(fileToUrls({ bucket: "post", fileList: data.imageFile }), promiseText);

    if (photoUrl.length === 0) return toast.error("사진 업로드에 실패했습니다.");

    createPostMutation.mutate({ ...request, photoUrl });
    reset();
  };

  return (
    <Fragment>
      <h1 className="my-5 w-full text-center text-2xl font-bold">게시글 작성</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="contents-center flex-col gap-3 text-sm">
        <label htmlFor="title" className="flex w-full flex-col flex-nowrap gap-1 text-nowrap">
          제목
          <input type="text" id="title" {...register("title")} className="w-full border" />
        </label>
        <label htmlFor="subTitle" className="flex w-full flex-col flex-nowrap gap-1 text-nowrap">
          부제목
          <input type="text" id="subTitle" {...register("subTitle")} className="w-full border" />
        </label>
        <label htmlFor="address" className="flex w-full flex-col flex-nowrap gap-1 text-nowrap">
          주소
          <input type="text" id="address" {...register("address")} className="w-full border" />
        </label>
        <label htmlFor="type" className="flex w-full flex-col flex-nowrap gap-1 text-nowrap">
          게시글 타입
          <select id="type" className="w-full border text-center" {...register("type")}>
            <option value="none" disabled>
              선택해주세요.
            </option>
            <option value="signage">signage</option>
            <option value="branding">branding</option>
            <option value="print">print</option>
          </select>
        </label>
        <label htmlFor="categoryId" className="flex w-full flex-col flex-nowrap gap-1 text-nowrap">
          업종
          <select id="categoryId" className="w-full border text-center" {...register("categoryId")}>
            <option value="none" disabled>
              선택해주세요.
            </option>
            {fetchCategory.data?.map((category) => (
              <option key={category.id} value={category.id}>
                {category.kor_name}
              </option>
            ))}
          </select>
        </label>

        <fieldset className="hidden w-full flex-col gap-2 text-nowrap">
          <legend>간판 종류</legend>
          {SIGN_CONTENT.map((category) => (
            <div className="flex gap-2">
              {category.map((item) => (
                <label htmlFor={item.id}>
                  <input type="checkbox" name="signType" id={item.id} value={item.label} />
                  {item.label}
                </label>
              ))}
            </div>
          ))}
        </fieldset>

        <label htmlFor="signTypeId" className="hidden w-full flex-col flex-nowrap gap-1 text-nowrap">
          간판 종류
          <select id="signTypeId" className="w-full border text-center" {...register("signTypeId")}>
            <option value="none" disabled>
              선택해주세요.
            </option>
            {fetchSignType.data?.map((sign) => (
              <option key={sign.id} value={sign.id}>
                {sign.kor_name}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="imageFile" className="flex w-full flex-col flex-nowrap gap-1 text-nowrap">
          사진
          <input
            type="file"
            id="imageFile"
            accept="image/*"
            {...register("imageFile")}
            className="w-full border"
            multiple
          />
        </label>
        {!!fileList && (
          <ul>
            {Array.from(fileList).map((file) => (
              <li key={file.name}>
                {file.name} ({byteConverter(file.size)})
              </li>
            ))}
          </ul>
        )}

        <input type="submit" value="등록" className="basic-button w-20 self-center rounded-lg px-3 py-2" />
      </form>
    </Fragment>
  );
}
