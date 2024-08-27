"use client";

import useEstimate from "@/service/estimate/mutations";
import { fileToUrls } from "@/supabase/supabase";
import emailjs from "@emailjs/browser";
import { useRef } from "react";
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

const EMAIL_JS_SERVICES_ID = process.env.NEXT_PUBLIC_EMAIL_JS_SERVICES_ID ?? "";
const EMAIL_JS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAIL_JS_TEMPLATE_ID ?? "";
const EMAIL_JS_PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAIL_JS_PUBLIC_KEY ?? "";

export default function EstimateForm() {
  const { register, handleSubmit, reset, watch } = useForm<EstimateInput>();
  const { createEstimateMutation } = useEstimate({});
  const estimateForm = useRef<HTMLFormElement>(null);

  const conceptFile = watch("conceptFile");
  const isConceptFile = conceptFile !== undefined && conceptFile.length > 0;
  const storePhoto = watch("storePhoto");
  console.log("storePhoto :", storePhoto);
  const isStorePhoto = storePhoto !== undefined && storePhoto.length > 0;

  const onSubmit: SubmitHandler<EstimateInput> = async (data) => {
    const { address, inquiryContent, phone, storeCategory, storeName, conceptFile, storePhoto } = data;
    if (!estimateForm.current) return;
    if (!storeName) return toast.error("상호명을 입력해주세요");
    if (!storeCategory) return toast.error("업종을 입력해주세요");
    if (!phone) return toast.error("연락처를 입력해주세요");
    if (!address) return toast.error("현장주소를 입력해주세요");

    const bucket = "estimate";
    const promiseText = {
      pending: "업로드 중 🚀",
      success: "업로드 성공 👌",
      error: "업로드 실패 🤯",
    };

    let storePhotoUrl: string[] = [];
    let conceptPhotoUrl: string[] = [];
    if (!!conceptFile) {
      conceptPhotoUrl = await toast.promise(fileToUrls({ bucket, fileList: conceptFile }), promiseText);
    }
    if (!!storePhoto) {
      storePhotoUrl = await toast.promise(fileToUrls({ bucket, fileList: storePhoto }), promiseText);
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

    try {
      emailjs.send(
        EMAIL_JS_SERVICES_ID,
        EMAIL_JS_TEMPLATE_ID,
        { storeName, storeCategory, phone, address },
        EMAIL_JS_PUBLIC_KEY,
      );
    } catch (error) {
      console.error("onSubmit : ", error);
    }

    reset();
  };

  return (
    <form
      ref={estimateForm}
      onSubmit={handleSubmit(onSubmit)}
      className="contents-center w-full flex-col gap-2.5 text-sm"
    >
      {textInputArray.map((input) => (
        <label key={input.id} className="estimate-label" htmlFor={input.id}>
          <span>{input.label}</span>
          <Input className="input h-10" id={input.id} register={register(input.id)} />
        </label>
      ))}
      <label className="estimate-label" htmlFor="estimate">
        <span>문의사항</span>
        <Textarea className="input h-[120px] resize-none" id="estimate" register={register("inquiryContent")} />
      </label>
      <div className="min-h-[40px] w-full flex-col border-3 border-black002 bg-white px-2.5">
        <label className="contents-between min-h-[40px] w-full" htmlFor={"storePhoto"}>
          <span className="w-full break-keep">현장사진</span>
          <FileInput id={"storePhoto"} register={register("storePhoto")} />
        </label>
        {isStorePhoto && (
          <ul className="flex min-h-[40px] w-full select-none flex-col items-center pb-2">
            {Array.from(storePhoto).map((photo) => (
              <li key={photo.name} className="flex w-full justify-end">
                <span>{photo.name}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="min-h-[40px] w-full flex-col border-3 border-black002 bg-white px-2.5">
        <label className="contents-between min-h-[40px] w-full" htmlFor={"conceptFile"}>
          <span className="w-full break-keep">원하는 간판 예시 사진</span>
          <FileInput id={"conceptFile"} register={register("conceptFile")} />
        </label>
        {isConceptFile && (
          <ul className="flex min-h-[40px] w-full select-none flex-col items-center pb-2">
            {Array.from(conceptFile).map((photo) => (
              <li key={photo.name} className="flex w-full justify-end">
                <span>{photo.name}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <input className="basic-button mt-10 rounded-lg px-4 py-3" type="submit" value="문의하기" />
    </form>
  );
}
