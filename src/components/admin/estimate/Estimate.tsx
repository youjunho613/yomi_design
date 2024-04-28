import { STORAGE_URL } from "@/supabase/supabase";
import Image from "next/image";
import { useState } from "react";
import Text from "../Text";
import type { Database, Tables } from "@/supabase/type";
import useEstimate from "@/service/estimate/mutations";
import { toast } from "react-toastify";

interface Props {
  estimate: Tables<"estimate">;
}

type TEstimateStatusUpdate = Database["public"]["Enums"]["estimateStatus"];

export default function Estimate({ estimate }: Props) {
  const [isOpen, setIsOpen] = useState({ storePhoto: false, photoUrl: false });

  const { modifyEstimateMutation, deleteEstimateMutation } = useEstimate();

  const modifyEstimateStatusHandler = (status: TEstimateStatusUpdate) => {
    modifyEstimateMutation.mutate({ id: estimate.id, status });
    toast.success("문의글이 수정되었습니다.");
  };

  const deleteEstimateHandler = (id: number) => {
    deleteEstimateMutation.mutate(id);
    toast.success("문의글이 삭제되었습니다.");
  };

  const openChangeHandler = (target: "storePhoto" | "photoUrl") => {
    setIsOpen({ ...isOpen, [target]: !isOpen[target] });
  };

  const emptyStorePhoto = estimate.storePhoto !== null && estimate.storePhoto.length !== 0;
  const emptyPhotoUrl = estimate.photoUrl !== null && estimate.photoUrl.length !== 0;

  const date = new Date(estimate.created_at);
  const createdDate = new Intl.DateTimeFormat("ko", { dateStyle: "medium", timeStyle: "short" }).format(date);
  return (
    <li className="flex flex-col gap-4 rounded-lg bg-main px-5 py-10">
      <Text label="문의글 ID" data={estimate.id} />
      <Text label="문의글 작성일" data={createdDate} />
      <div className="grid w-full grid-cols-3">
        <Text label="상호명" data={estimate.storeName} />
        <Text label="업종" data={estimate.storeCategory} />
        <Text label="현장 주소" data={estimate.address} />
      </div>
      <div className="grid w-full grid-cols-2">
        <Text label="연락처" data={estimate.phone} />
      </div>
      <Text label="문의사항" data={estimate.inquiryContent} />
      <div className="flex items-center justify-end gap-5">
        <button className="bg-red-500 px-3 py-2 text-black" onClick={() => modifyEstimateStatusHandler("unconfirmed")}>
          미확인
        </button>
        <button className="bg-yellow-500 px-3 py-2 text-black" onClick={() => modifyEstimateStatusHandler("confirm")}>
          진행
        </button>
        <button className="bg-green-500 px-3 py-2 text-black" onClick={() => modifyEstimateStatusHandler("done")}>
          완료
        </button>
        <button className="bg-black px-3 py-2 text-white" onClick={() => modifyEstimateStatusHandler("hidden")}>
          숨김
        </button>
        <button className="bg-black px-3 py-2 text-white" onClick={() => deleteEstimateHandler(estimate.id)}>
          삭제
        </button>
      </div>
      {emptyStorePhoto && (
        <div className="contents-center flex flex-col gap-5">
          <button
            className="w-full bg-sub px-3 py-2"
            onClick={() => {
              openChangeHandler("storePhoto");
            }}
          >
            현장 사진 {isOpen.storePhoto ? "접기" : "펼치기"}
          </button>
          {isOpen.storePhoto && (
            <ul>
              {estimate.storePhoto?.map((url) => (
                <li key={url}>
                  <Image src={`${STORAGE_URL}/estimate/${url}`} width={500} height={500} alt="현장사진" />
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
      {emptyPhotoUrl && (
        <div className="contents-center flex flex-col gap-5">
          <button
            className="w-full bg-sub px-3 py-2"
            onClick={() => {
              openChangeHandler("photoUrl");
            }}
          >
            컨셉 사진 {isOpen.photoUrl ? "접기" : "펼치기"}
          </button>
          {isOpen.photoUrl && (
            <ul>
              {estimate.photoUrl?.map((url) => (
                <li key={url}>
                  <Image src={`${STORAGE_URL}/estimate/${url}`} width={500} height={500} alt="현장사진" />
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </li>
  );
}
