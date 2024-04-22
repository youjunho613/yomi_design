import Image from "next/image";

interface IProps {
  url: string;
  index: number;
}

export default function PreviewImage({ url, index }: IProps) {
  return (
    <li>
      <Image width={150} height={150} src={url} alt={`${index + 1} 미리보기`} />
    </li>
  );
}
