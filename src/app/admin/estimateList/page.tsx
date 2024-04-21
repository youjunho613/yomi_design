"use client";

import Estimate from "@/components/admin/estimate/Estimate";
import TabButton from "@/components/admin/estimate/TabButton";
import useEstimate from "@/service/estimate/mutations";
import { Database } from "@/supabase/type";
import { useState } from "react";

export type TEstimateStatus = Database["public"]["Enums"]["estimateStatus"] | "all";

export interface IEstimateStatusItem {
  status: TEstimateStatus;
  label: string;
}

const statusArray: IEstimateStatusItem[] = [
  { status: "unconfirmed", label: "미확인" },
  { status: "confirm", label: "진행" },
  { status: "done", label: "완료" },
  { status: "hidden", label: "숨김" },
  { status: "all", label: "모두보기" },
];

export default function Page() {
  const [toggleStatus, setToggleStatus] = useState<TEstimateStatus>("unconfirmed");

  const { fetchEstimate } = useEstimate();
  const { data, isError, isLoading } = fetchEstimate;

  const onChangeStatus = (status: TEstimateStatus) => {
    setToggleStatus(status);
  };

  if (isError) return <p>에러가 발생했습니다.</p>;
  if (isLoading) return <p>로딩중...</p>;
  if (!data) return <p>문의가 없습니다.</p>;

  const filteredData = data.filter((item) => item.status === toggleStatus);

  return (
    <div>
      <div className="flex justify-around gap-10">
        {statusArray.map((item) => (
          <TabButton
            key={item.status}
            estimateStatus={item}
            toggleStatus={toggleStatus}
            onChangeStatus={onChangeStatus}
          />
        ))}
      </div>

      <ul className="flex flex-col gap-7 bg-sub mt-10 px-5 py-10 rounded-lg">
        {toggleStatus === "all" && data.map((estimate) => <Estimate key={estimate.id} estimate={estimate} />)}
        {toggleStatus !== "all" && filteredData.length === 0 && (
          <p className="bg-main px-5 py-10 rounded-lg">문의가 없습니다.</p>
        )}
        {toggleStatus !== "all" && filteredData.map((estimate) => <Estimate key={estimate.id} estimate={estimate} />)}
      </ul>
    </div>
  );
}