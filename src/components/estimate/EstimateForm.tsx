"use client";

import { createEstimate } from "@/app/api/estimate";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import EstimateInput from "./EstimateInput";

export interface EstimateInput {
  storeName: string;
  category: string;
  name: string;
  phone: string;
  address: string;
  estimate: string;
  conceptFile: FileList;
}

export default function EstimateForm() {
  const { register, handleSubmit } = useForm<EstimateInput>();

  const onSubmit: SubmitHandler<EstimateInput> = (data) => {
    createEstimate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex-col contents-center gap-2.5">
      <EstimateInput register={register} id="storeName" label="상호명" />
      <EstimateInput register={register} id="category" label="업종" />
      <EstimateInput register={register} id="name" label="성함" />
      <EstimateInput register={register} id="phone" label="연락처" />
      <EstimateInput register={register} id="address" label="현장주소" />
      <EstimateInput register={register} id="estimate" label="문의사항" type="textarea" />
      <EstimateInput register={register} id="conceptFile" label="원하는 간판 예시 사진" type="file" />
      <input className="cursor-pointer bg-sub px-4 py-3 rounded-lg text-main" type="submit" value="문의하기" />
    </form>
  );
}
