import StatusButton from "./StatusButton";

import type { Tables } from "@/supabase/type";
import EstimateInfo from "./EstimateInfo";
import EstimatePhoto from "./EstimatePhoto";

export type TImageToggle = "storePhoto" | "photoUrl";

interface Props {
  estimate: Tables<"estimate">;
}

export default function Estimate({ estimate }: Props) {
  const isPhoto = {
    isStorePhoto: estimate.storePhoto !== null && estimate.storePhoto.length !== 0,
    isPhotoUrl: estimate.photoUrl !== null && estimate.photoUrl.length !== 0,
  };

  const imageUrl = {
    storePhoto: estimate.storePhoto,
    photoUrl: estimate.photoUrl,
  };

  return (
    <li className="flex flex-col gap-4 rounded-lg bg-white px-5 py-10 text-xs lg:text-base">
      <EstimateInfo estimate={estimate} />
      <p className="flex w-full justify-between gap-2 border-b border-black">
        <span className="text-nowrap">문의사항 : </span>
        <pre className="max-h-40 w-full overflow-y-scroll whitespace-pre-wrap break-words font-pretendard">
          {estimate.inquiryContent}
        </pre>
      </p>
      <EstimatePhoto imageUrl={imageUrl} isPhoto={isPhoto} />
      <div className="flex flex-wrap justify-between gap-5 text-nowrap">
        <StatusButton id={estimate.id} dataStatus={estimate.status} />
      </div>
    </li>
  );
}
