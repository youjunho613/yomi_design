import { STORAGE_URL } from "@/supabase/supabase";
import Image from "next/image";

interface IProps {
  imageUrl: string[] | null;
}

export default function ImageList({ imageUrl }: IProps) {
  return (
    <ul>
      {imageUrl?.map((url) => (
        <li key={url}>
          <Image src={`${STORAGE_URL}/estimate/${url}`} width={500} height={500} alt="컨셉사진" />
        </li>
      ))}
    </ul>
  );
}
