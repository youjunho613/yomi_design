import useEstimate from "@/service/estimate/mutations";
import { useState } from "react";
import Text from "../Text";
import ImageList from "./ImageList";
import ImageToggleButton from "./ImageToggleButton";
import StatusButton from "./StatusButton";

import type { Tables } from "@/supabase/type";

export type TImageToggle = "storePhoto" | "photoUrl";

interface Props {
  estimate: Tables<"estimate">;
}

export default function Estimate({ estimate }: Props) {
  const [isOpen, setIsOpen] = useState({ storePhoto: false, photoUrl: false });

  const { deleteEstimateMutation } = useEstimate({});

  const deleteHandler = () => {
    deleteEstimateMutation.mutate(estimate.id);
  };

  const openChangeHandler = (target: TImageToggle) => {
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
        <Text label="상태" data={estimate.status} />
      </div>
      <Text label="문의사항" data={estimate.inquiryContent} />
      <div className="flex w-full items-center justify-end gap-5 lg:w-auto">
        <StatusButton id={estimate.id} status="unconfirmed" dataStatus={estimate.status} />
        <StatusButton id={estimate.id} status="confirm" dataStatus={estimate.status} />
        <StatusButton id={estimate.id} status="done" dataStatus={estimate.status} />
        <StatusButton id={estimate.id} status="hidden" dataStatus={estimate.status} />
        <button className="rounded-md bg-red-500 px-3 py-2 text-white" onClick={deleteHandler}>
          삭제
        </button>
      </div>
      {emptyStorePhoto && (
        <div className="contents-center flex flex-col gap-5">
          <ImageToggleButton
            text="현장 사진"
            toggle="storePhoto"
            isOpen={isOpen.storePhoto}
            openChangeHandler={openChangeHandler}
          />
          {isOpen.storePhoto && <ImageList imageUrl={estimate.storePhoto} />}
        </div>
      )}
      {emptyPhotoUrl && (
        <div className="contents-center flex flex-col gap-5">
          <ImageToggleButton
            text="컨셉 사진"
            toggle="photoUrl"
            isOpen={isOpen.photoUrl}
            openChangeHandler={openChangeHandler}
          />
          {isOpen.photoUrl && <ImageList imageUrl={estimate.photoUrl} />}
        </div>
      )}
    </li>
  );
}
