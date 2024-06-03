"use client";

import useEstimate from "@/service/estimate/mutations";
import { fileToUrls } from "@/supabase/supabase";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import FileInput from "../shared/input/FileInput";
import Input from "../shared/input/Input";
import Textarea from "../shared/input/Textarea";

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
  const { createEstimateMutation } = useEstimate({});

  const onSubmit: SubmitHandler<EstimateInput> = async (data) => {
    const { address, inquiryContent, phone, storeCategory, storeName, conceptFile, storePhoto } = data;
    if (!storeName) return toast.error("상호명을 입력해주세요");
    if (!storeCategory) return toast.error("업종을 입력해주세요");
    if (!phone) return toast.error("연락처를 입력해주세요");
    if (!address) return toast.error("현장주소를 입력해주세요");

    let storePhotoUrl: string[] = [];
    let conceptPhotoUrl: string[] = [];
    if (!!conceptFile) {
      await fileToUrls({ bucket: "estimate", fileList: conceptFile });
    }
    if (!!storePhoto) {
      await fileToUrls({ bucket: "estimate", fileList: storePhoto });
    }

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
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="contents-center w-full flex-col gap-1 text-[10px] md:gap-4 md:text-[22px] lg:text-[30px]"
    >
      {textInputArray.map((input) => (
        <label key={input.id} className="estimate-label" htmlFor={input.id}>
          <span>{input.label}</span>
          <Input className="input h-full" id={input.id} register={register(input.id)} />
        </label>
      ))}
      <label className="estimate-label h-[120px] md:h-[160px] lg:h-[200px]" htmlFor="estimate">
        <span>문의사항</span>
        <Textarea className="input h-full resize-none" id="estimate" register={register("inquiryContent")} />
      </label>
      <label className="estimate-label" htmlFor={"storePhoto"}>
        <span className="min-w-fit">현장사진</span>
        <FileInput id={"storePhoto"} register={register("storePhoto")} />
      </label>
      <label className="estimate-label" htmlFor={"conceptFile"}>
        <span className="min-w-fit">원하는 간판 예시 사진</span>
        <FileInput id={"conceptFile"} register={register("conceptFile")} />
      </label>

      <input
        className="basic-button self-start border-2 border-black002 px-1 py-[1px] font-bold md:px-2 md:py-1 lg:px-4 lg:py-2"
        type="submit"
        value="문의하기"
      />
    </form>
  );
}
