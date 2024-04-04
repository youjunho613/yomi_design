import PhotoEditButton from "./PhotoEditButton";
import Image from "next/image";
import { STORAGE_URL } from "@/../lib/supabase/supabase";
import { Tables } from "@/../lib/supabase/schema";
import useIsOpen from "@/store/useIsOpen";
import { useState } from "react";

interface Props {
  post: Tables<"board", "Row">;
}

export default function PhotoList({ post }: Props) {
  const { postIsOpen } = useIsOpen();
  const [imageSize, setImageSize] = useState<number>(500);

  const imageSizeFunc = () => `w-[${imageSize}px] h-[${imageSize}px]`;

  const onChangeImageSize = (type: "up" | "down") => {
    if (imageSize === 500) type === "up" ? setImageSize(700) : setImageSize(400);
    else if (imageSize === 700 || imageSize === 400) setImageSize(500);
  };

  return (
    <ul className="flex-col gap-5 contents-between">
      <div className="flex gap-10">
        <button
          className="bg-white border border-black px-3 py-2 w-[200px] disabled:opacity-50"
          onClick={() => onChangeImageSize("down")}
          disabled={imageSize === 400}
        >
          image size down
        </button>
        <button
          className="bg-white border border-black px-3 py-2 w-[200px] disabled:opacity-50"
          onClick={() => onChangeImageSize("up")}
          disabled={imageSize === 700}
        >
          image size up
        </button>
      </div>
      {post.photoUrl.map((url, index) => (
        <li key={url} className="flex contents-center gap-5">
          <div className={`relative ${imageSizeFunc()} aspect-auto`}>
            <Image
              layout="fill"
              objectFit="contain"
              src={`${STORAGE_URL}/estimate/${url}`}
              alt={`${index + 1}번째 사진`}
            />
          </div>
          {postIsOpen[post.id].edit && <PhotoEditButton post={post} index={index} />}
        </li>
      ))}
      {postIsOpen[post.id].edit && (
        <label className="cursor-pointer border-2 border-black002 px-3 py-2" htmlFor="file">
          추가
          <input className="hidden" id="file" type="file" />
        </label>
      )}
    </ul>
  );
}
