"use client";

import { useForm } from "react-hook-form";
import CategorySelect from "./CategorySelect";
import Input from "./Input";

export interface PostFormInput {
  address: string;
  category: string;
  imageFile: FileList;
  path: string;
  title: string;
}

export default function PostForm() {
  const { register } = useForm<PostFormInput>();

  return (
    <form className="flex flex-col gap-3">
      <Input id="title" type="text" label="제목" register={register} />
      <Input id="address" type="text" label="주소" register={register} />
      <Input id="imageFile" type="file" label="사진" register={register} />
      <CategorySelect />

      <input type="submit" value="등록" className="bg-sub w-20 self-center px-3 py-2 rounded-lg text-white" />
    </form>
  );
}
