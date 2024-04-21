"use client";

import CategorySelect from "@/components/admin/form/CategorySelect";
import Input from "@/components/admin/form/Input";
import usePost from "@/service/post/mutations";
import useCategorySelect from "@/store/useCategorySelect";
import { fileToUrls } from "@/supabase/supabase";
import { useForm } from "react-hook-form";

export interface PostFormInput {
  address: string;
  category: string;
  imageFile: FileList;
  title: string;
}

export default function Page() {
  const { register, handleSubmit, reset } = useForm<PostFormInput>();
  const { mainCategory, subCategory } = useCategorySelect();

  const { createPostMutation } = usePost();

  const onSubmit = async (data: PostFormInput) => {
    if (mainCategory === undefined || subCategory === undefined) return;
    const { title, address, imageFile } = data;
    if (imageFile.length === 0) return;

    const photoUrl = fileToUrls({ bucket: "post", fileList: imageFile });
    const mainPhotoUrl = photoUrl.shift() ?? "";

    const request = {
      title,
      address,
      mainCategory,
      subCategory,
      mainPhotoUrl,
      photoUrl,
    };
    createPostMutation.mutate(request);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
      <Input id="title" type="text" label="제목" register={register} />
      <Input id="address" type="text" label="주소" register={register} />
      <Input id="imageFile" type="file" label="사진" register={register} />
      <CategorySelect />

      <input type="submit" value="등록" className="basic-button w-20 self-center px-3 py-2 rounded-lg" />
    </form>
  );
}
