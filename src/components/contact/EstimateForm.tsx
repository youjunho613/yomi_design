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
  isLogoDesign: string;
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
  const { createEstimateMutation } = useEstimate();
  const estimateForm = useRef<HTMLFormElement>(null);

  const conceptFile = watch("conceptFile");
  const storePhoto = watch("storePhoto");

  const onSubmit: SubmitHandler<EstimateInput> = async (data) => {
    const { storeName, storeCategory, isLogoDesign, phone, address, workDate, openDate, inquiryContent } = data;

    const primaryInfo = { storeName, storeCategory, phone, address };
    const optionInfo = { isLogoDesign, workDate, openDate, inquiryContent };

    if (isLogoDesign === "none") return toast.error("로고 디자인 여부를 선택해주세요");
    if (!estimateForm.current) return;
    if (!primaryInfo.storeName) return toast.error("브랜드명을 입력해주세요");
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
        <label key={input.id} className="estimate-label" htmlFor={input.id}>
          <span className="estimate-span">
            {input.label}
            <span className="text-red-500">*</span>
          </span>
          <Input className="estimate-input xl:h-8" id={input.id} register={register(input.id)} />
        </label>
      ))}

      <label className="estimate-label" htmlFor="isLogoDesign">
        <span className="estimate-span">
          로고 디자인 여부
          <span className="text-red-500">*</span>
        </span>
        <select className="estimate-input xl:h-8" id="isLogoDesign" {...register("isLogoDesign")} defaultValue={"none"}>
          <option value="none" disabled>
            선택해주세요.
          </option>
          <option value="has">로고 보유</option>
          <option value="need">로고 디자인 필요</option>
          <option value="noNeed">로고 필요 없음</option>
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
        className="m-[3vw] w-[14vw] rounded-full bg-black p-1 text-[8px] text-white disabled:bg-gray001 md:text-[12px] xl:m-10 xl:w-[180px] xl:px-4 xl:py-3 xl:text-[18px]"
        type="submit"
        value="문의하기"
      />
    </form>
  );
}
