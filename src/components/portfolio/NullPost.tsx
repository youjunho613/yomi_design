import Link from "next/link";
import { useRouter } from "next/navigation";

interface IProps {
  status: "undefined" | "null";
}

export default function NullPost({ status }: IProps) {
  const router = useRouter();
  const massage = status === "undefined" ? "오류로 인해 불러오지 못하였습니다." : "업로드된 게시물이 없습니다.";
  return (
    <div className="contents-center flex-col gap-10">
      <p className="text-[18px]">{massage}</p>
      <Link href={"/"} onClick={() => router.back()} className="rounded-full bg-black px-4 py-2 text-white">
        뒤로가기
      </Link>
    </div>
  );
}
