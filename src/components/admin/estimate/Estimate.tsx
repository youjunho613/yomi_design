import { Tables } from "@/../lib/supabase/schema";
import { STORAGE_URL } from "@/../lib/supabase/supabase";
import { TEstimateStatus, deleteEstimate, editEstimate } from "@/app/api/estimate";
import Image from "next/image";
import { useState } from "react";
import Text from "../Text";

interface Props {
  estimate: Tables<"estimate", "Row">;
  toggleStatus: TEstimateStatus | "all";
}

export default function Estimate({ estimate, toggleStatus }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const openChangeHandler = () => {
    setIsOpen(!isOpen);
  };

  return (
    <li className="flex flex-col gap-4 bg-main rounded-lg px-5 py-10">
      <Text label="문의글 번호" data={estimate.id} />
      <div className="w-full grid grid-cols-3">
        <Text label="상호명" data={estimate.storeName} />
        <Text label="업종" data={estimate.category} />
        <Text label="현장 주소" data={estimate.address} />
      </div>
      <div className="w-full grid grid-cols-2">
        <Text label="성함" data={estimate.name} />
        <Text label="연락처" data={estimate.phone} />
      </div>
      <Text label="문의사항" data={estimate.estimate} />
      <div className="flex items-center justify-end gap-5">
        <button className="bg-red-500 text-black px-3 py-2" onClick={() => editEstimate("unconfirmed", estimate.id)}>
          미확인
        </button>
        <button className="bg-yellow-500 text-black px-3 py-2" onClick={() => editEstimate("confirm", estimate.id)}>
          진행
        </button>
        <button className="bg-green-500 text-black px-3 py-2" onClick={() => editEstimate("done", estimate.id)}>
          완료
        </button>
        <button className="bg-black text-white px-3 py-2" onClick={() => editEstimate("hidden", estimate.id)}>
          숨김
        </button>
        <button className="bg-black text-white px-3 py-2" onClick={() => deleteEstimate(estimate.id)}>
          삭제
        </button>
      </div>
      {estimate.photoUrl !== null && (
        <div className="flex flex-col gap-5 contents-center">
          <button className="bg-sub px-3 py-2 w-full" onClick={openChangeHandler}>
            현장 사진 {isOpen ? "접기" : "펼치기"}
          </button>
          {isOpen && (
            <Image src={`${STORAGE_URL}/estimate/${estimate.photoUrl}`} width={500} height={500} alt="현장사진" />
          )}
        </div>
      )}
    </li>
  );
}
