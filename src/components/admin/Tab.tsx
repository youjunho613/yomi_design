import { TTab } from "@/app/admin/page";

interface Props {
  tabChangeHandler: (target: TTab) => void;
}

export default function Tab({ tabChangeHandler }: Props) {
  return (
    <div className="flex items-center justify-around my-10 gap-4">
      <button
        onClick={() => tabChangeHandler("estimate")}
        className="w-full p-2 rounded-3xl bg-white border border-black002"
      >
        문의
      </button>
      <button
        onClick={() => tabChangeHandler("management")}
        className="w-full p-2 rounded-3xl bg-white border border-black002"
      >
        게시물 관리
      </button>
      <button
        onClick={() => tabChangeHandler("form")}
        className="w-full p-2 rounded-3xl bg-white border border-black002"
      >
        게시물 등록
      </button>
    </div>
  );
}
