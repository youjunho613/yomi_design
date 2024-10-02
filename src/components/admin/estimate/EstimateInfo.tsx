import { Tables } from "@/supabase/type";

interface IProps {
  estimate: Tables<"estimate">;
}

export default function EstimateInfo({ estimate }: IProps) {
  const date = new Date(estimate.created_at);
  const createdDate = new Intl.DateTimeFormat("ko", { dateStyle: "medium", timeStyle: "short" }).format(date);

  const korStatus = (status: "confirm" | "done" | "hidden" | "unconfirmed") => {
    switch (status) {
      case "unconfirmed":
        return "미확인";
      case "confirm":
        return "확인";
      case "done":
        return "완료";
      case "hidden":
        return "숨김";
    }
  };

  return (
    <div className="flex min-w-fit max-w-min flex-col">
      <p className="flex w-full justify-between gap-2 border-b border-black">
        <span className="text-nowrap">문의글 ID : </span>
        {estimate.id}
      </p>
      <p className="flex w-full justify-between gap-2 border-b border-black">
        <span className="text-nowrap">문의글 작성일 : </span>
        {createdDate}
      </p>
      <p className="flex w-full justify-between gap-2 border-b border-black">
        <span className="text-nowrap">상호명 : </span>
        {estimate.storeName}
      </p>
      <p className="flex w-full justify-between gap-2 border-b border-black">
        <span className="text-nowrap">업종 : </span>
        {estimate.storeCategory}
      </p>
      <p className="flex w-full justify-between gap-2 border-b border-black">
        <span className="text-nowrap">현장 주소 : </span>
        {estimate.address}
      </p>
      <p className="flex w-full justify-between gap-2 border-b border-black">
        <span className="text-nowrap">연락처 : </span>
        {estimate.phone}
      </p>
      <p className="flex w-full justify-between gap-2 border-b border-black">
        <span className="text-nowrap">상태 : </span>
        {korStatus(estimate.status)}
      </p>
    </div>
  );
}
