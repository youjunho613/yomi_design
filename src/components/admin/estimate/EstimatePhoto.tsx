import { useState } from "react";
import ImageList from "./ImageList";

interface IProps {
  isPhoto: { isStorePhoto: boolean; isPhotoUrl: boolean };
  imageUrl: { storePhoto: string[] | null; photoUrl: string[] | null };
}

export type TImageToggle = "storePhoto" | "photoUrl";

export default function EstimatePhoto({ isPhoto, imageUrl }: IProps) {
  const [isOpen, setIsOpen] = useState({ storePhoto: false, photoUrl: false });

  const openChangeHandler = (target: TImageToggle) => {
    setIsOpen({ ...isOpen, [target]: !isOpen[target] });
  };

  return (
    <>
      {isPhoto.isStorePhoto && (
        <div className="contents-center flex flex-col gap-5">
          <button
            className="click-button w-full border-black bg-white px-3 py-2 text-black"
            onClick={() => openChangeHandler("storePhoto")}
          >
            현장 사진 {isOpen.storePhoto ? "접기" : "펼치기"} ({imageUrl.storePhoto?.length})
          </button>
          {isOpen.storePhoto && <ImageList imageUrl={imageUrl.storePhoto} />}
        </div>
      )}
      {isPhoto.isPhotoUrl && (
        <div className="contents-center flex flex-col gap-5">
          <button
            className="click-button w-full border-black bg-white px-3 py-2 text-black"
            onClick={() => openChangeHandler("photoUrl")}
          >
            컨셉 사진 {isOpen.photoUrl ? "접기" : "펼치기"} ({imageUrl.photoUrl?.length})
          </button>
          {isOpen.photoUrl && <ImageList imageUrl={imageUrl.photoUrl} />}
        </div>
      )}
    </>
  );
}
