"use client";

import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import Input from "../shared/input/Input";
import Textarea from "../shared/input/Textarea";
import FileInput from "../shared/input/FileInput";
import useEstimate from "@/service/estimate/mutations";
import { fileToUrls } from "@/supabase/supabase";

interface EstimateInput {
  storeName: string;
  storeCategory: string;
  phone: string;
  address: string;
  inquiryContent: string;
  conceptFile?: FileList;
  storePhoto?: FileList;
}

const textInputArray: { id: keyof EstimateInput; label: string }[] = [
  { id: "storeName", label: "상호명" },
  { id: "storeCategory", label: "업종" },
  { id: "phone", label: "연락처" },
  { id: "address", label: "현장주소" },
];

export default function EstimateForm() {
  const { register, handleSubmit, reset } = useForm<EstimateInput>();
  const { createEstimateMutation } = useEstimate();

  const onSubmit: SubmitHandler<EstimateInput> = (data) => {
    const { address, inquiryContent, phone, storeCategory, storeName, conceptFile, storePhoto } = data;
    const bucket = "estimate";
    const conceptPhotoUrl = !!conceptFile ? fileToUrls({ bucket, fileList: conceptFile }) : [];
    const storePhotoUrl = !!storePhoto ? fileToUrls({ bucket, fileList: storePhoto }) : [];

    const request = {
      address,
      inquiryContent,
      phone,
      storeCategory,
      storeName,
      photoUrl: conceptPhotoUrl,
      storePhoto: storePhotoUrl,
    };

    createEstimateMutation.mutate(request);
    reset();
    alert("문의가 접수되었습니다.");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="contents-center w-full flex-col gap-2.5 text-sm xl:w-1/2">
      {textInputArray.map((input) => (
        <label key={input.id} className="estimate-label" htmlFor={input.id}>
          <span className="w-20">{input.label}</span>
          <Input className="input h-10" id={input.id} register={register(input.id)} />
        </label>
      ))}
      <label className="estimate-label" htmlFor="estimate">
        <span className="w-20">문의사항</span>
        <Textarea className="input h-[120px] resize-none" id="estimate" register={register("inquiryContent")} />
      </label>
      <label className="estimate-label" htmlFor={"conceptFile"}>
        <span className="w-full">현장사진</span>
        <FileInput id={"conceptFile"} register={register("conceptFile")} />
      </label>
      <label className="estimate-label" htmlFor={"conceptFile"}>
        <span className="w-full">원하는 간판 예시 사진</span>
        <FileInput id={"conceptFile"} register={register("conceptFile")} />
      </label>

      <input className="basic-button mt-10 rounded-lg px-4 py-3" type="submit" value="문의하기" />
    </form>
  );
}
