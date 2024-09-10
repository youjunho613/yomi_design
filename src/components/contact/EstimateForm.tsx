"use client";

import useEstimate from "@/service/estimate/mutations";
import { fileToUrls } from "@/supabase/supabase";
import emailjs from "@emailjs/browser";
import { useRef } from "react";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Input from "../shared/input/Input";
import DateInput from "./DateInput";
import FileInput from "./FileInput";
import Textarea from "./Textarea";

interface EstimateInput {
  storeName: string;
  storeCategory: string;
  isLogoDesign: boolean;
  phone: string;
  address: string;
  workDate: string;
  openDate: string;
  inquiryContent: string;
  conceptFile?: FileList;
  storePhoto?: FileList;
}

const textInputArray: { id: keyof EstimateInput; label: string }[] = [
  { id: "storeName", label: "브랜드명" },
  { id: "storeCategory", label: "업종" },
  { id: "phone", label: "연락처" },
  { id: "address", label: "현장주소" },
];

const EMAIL_JS_SERVICES_ID = process.env.NEXT_PUBLIC_EMAIL_JS_SERVICES_ID ?? "";
const EMAIL_JS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAIL_JS_TEMPLATE_ID ?? "";
const EMAIL_JS_PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAIL_JS_PUBLIC_KEY ?? "";

export default function EstimateForm() {
  const { register, handleSubmit, reset, watch } = useForm<EstimateInput>();
  const { createEstimateMutation } = useEstimate({});
  const estimateForm = useRef<HTMLFormElement>(null);

  const conceptFile = watch("conceptFile");
  const storePhoto = watch("storePhoto");

  const onSubmit: SubmitHandler<EstimateInput> = async (data) => {
    const { storeName, storeCategory, isLogoDesign, phone, address, workDate, openDate, inquiryContent } = data;

    const primaryInfo = { storeName, storeCategory, phone, address };
    const optionInfo = { isLogoDesign, workDate, openDate, inquiryContent };

    if (!estimateForm.current) return;
    if (!primaryInfo.storeName) return toast.error("상호명을 입력해주세요");
    if (!primaryInfo.storeCategory) return toast.error("업종을 입력해주세요");
    if (!primaryInfo.phone) return toast.error("연락처를 입력해주세요");
    if (!primaryInfo.address) return toast.error("현장주소를 입력해주세요");

    const bucket = "estimate";
    const promiseText = { pending: "업로드 중 🚀", success: "업로드 성공 👌", error: "업로드 실패 🤯" };

    let photoUrl: string[] = [];
    if (!!data.conceptFile) {
      photoUrl = await toast.promise(fileToUrls({ bucket, fileList: data.conceptFile }), promiseText);
    }

    let storePhoto: string[] = [];
    if (!!data.storePhoto) {
      storePhoto = await toast.promise(fileToUrls({ bucket, fileList: data.storePhoto }), promiseText);
    }

    const request = { photoUrl, storePhoto, ...primaryInfo, ...optionInfo };

    createEstimateMutation.mutate(request);

    try {
      emailjs.send(EMAIL_JS_SERVICES_ID, EMAIL_JS_TEMPLATE_ID, primaryInfo, EMAIL_JS_PUBLIC_KEY);
    } catch (error) {
      console.error("onSubmit : ", error);
    }

    reset();
  };

  return (
    <form
      ref={estimateForm}
      onSubmit={handleSubmit(onSubmit)}
      className="contents-center w-full flex-col gap-0 text-sm"
    >
      {textInputArray.map((input) => (
        <label
          key={input.id}
          className="contents-center h-15 w-full border border-b-0 border-gray001 text-[18px]"
          htmlFor={input.id}
        >
          <span className="flex h-full w-[27.8%] items-center justify-start bg-gray003 px-10">{input.label}</span>
          <Input className="mx-10 h-8 w-full border border-gray001 px-2" id={input.id} register={register(input.id)} />
        </label>
      ))}

      <label
        className="contents-center h-15 w-full border border-b-0 border-gray001 text-[18px]"
        htmlFor="isLogoDesign"
      >
        <span className="flex h-full w-[27.8%] items-center justify-start bg-gray003 px-10">로고 디자인 여부</span>
        <select className="mx-10 h-8 w-full border border-gray001 px-2" id="isLogoDesign" {...register("isLogoDesign")}>
          <option value="true">예</option>
          <option value="false">아니오</option>
        </select>
      </label>

      <DateInput id="workDate" label="원하시는 시공 날짜" register={register("workDate")} />
      <DateInput id="openDate" label="오픈 예정일" register={register("openDate")} />

      <FileInput
        id="conceptFile"
        label="원하는 간판 예시 사진"
        fileList={conceptFile}
        register={register("conceptFile")}
      />
      <FileInput
        id="storePhoto"
        label="간판이 설치될 현장의 정면 사진"
        fileList={storePhoto}
        register={register("storePhoto")}
      />
      <Textarea id="estimate" label="문의사항" register={register("inquiryContent")} />
      <input
        className="m-10 w-[180px] rounded-full bg-black px-4 py-3 text-[18px] text-white"
        type="submit"
        value="문의하기"
      />
    </form>
  );
}
