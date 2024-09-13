"use client";

import CategorySelect from "@/components/admin/form/CategorySelect";
import Input from "@/components/admin/form/Input";
import usePost from "@/service/post/mutations";
import { fileToUrls } from "@/supabase/supabase";
import { Fragment } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export interface PostFormInput {
  address: string;
  category: string;
  imageFile: FileList;
  title: string;
}

export default function Page() {
  const { register, handleSubmit, reset } = useForm<PostFormInput>();
  // const { mainCategory, subCategory } = useCategorySelect();
  // const isCategory = mainCategory === undefined || subCategory === undefined;

  const { createPostMutation } = usePost();

  const onSubmit = async ({ title, address, imageFile }: PostFormInput) => {
    if (!title) return toast.error("제목을 입력해주세요.");
    if (!address) return toast.error("주소를 입력해주세요.");
    if (imageFile.length === 0) return toast.error("사진을 선택해주세요.");
    // if (isCategory) return toast.error("카테고리를 선택해주세요.");

    const photoUrl = await toast.promise(fileToUrls({ bucket: "post", fileList: imageFile }), {
      pending: "업로드 중 🚀",
      success: "업로드 성공 👌",
      error: "업로드 실패 🤯",
    });

    if (photoUrl.length === 0) return toast.error("사진 업로드에 실패했습니다.");

    // const request = { title, address, mainCategory, subCategory, photoUrl };

    // createPostMutation.mutate(request);
    reset();
  };

  return (
    <Fragment>
      <h1 className="my-5 w-full text-center text-2xl font-bold">게시글 작성</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
        <Input id="title" type="text" label="제목" register={register} />
        <Input id="address" type="text" label="주소" register={register} />
        <Input id="imageFile" type="file" label="사진" register={register} />
        <CategorySelect />

        <input type="submit" value="등록" className="basic-button w-20 self-center rounded-lg px-3 py-2" />
      </form>
    </Fragment>
  );
}
