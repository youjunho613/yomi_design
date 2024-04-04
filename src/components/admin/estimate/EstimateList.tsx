import { useEffect, useState } from "react";
import TabButton from "./TabButton";
import { TEstimateStatus, getEstimateList } from "@/app/api/estimate";
import { Tables } from "@/../lib/supabase/schema";
import Estimate from "./Estimate";

export default function EstimateList() {
  const [estimateList, setEstimateList] = useState<Tables<"estimate", "Row">[] | null>(null);
  const [toggleStatus, setToggleStatus] = useState<TEstimateStatus | "all">("unconfirmed");

  const onChangeStatus = (status: TEstimateStatus | "all") => {
    setToggleStatus(status);
  };

  useEffect(() => {
    const fetchEstimate = async () => {
      const data = await getEstimateList();
      setEstimateList(data);
    };

    fetchEstimate();
  }, []);

  if (estimateList === null) return <p>업로드된 문의가 없습니다.</p>;
  const filteredEstimateList = estimateList.filter((estimate) => estimate.status === toggleStatus);

  return (
    <div>
      <div className="flex justify-around gap-10">
        <TabButton status="unconfirmed" toggleStatus={toggleStatus} onChangeStatus={onChangeStatus} />
        <TabButton status="confirm" toggleStatus={toggleStatus} onChangeStatus={onChangeStatus} />
        <TabButton status="done" toggleStatus={toggleStatus} onChangeStatus={onChangeStatus} />
        <TabButton status="hidden" toggleStatus={toggleStatus} onChangeStatus={onChangeStatus} />
        <TabButton status="all" toggleStatus={toggleStatus} onChangeStatus={onChangeStatus} />
      </div>

      <ul className="flex flex-col gap-7 bg-sub mt-10 px-5 py-10 rounded-lg">
        {toggleStatus === "all" &&
          estimateList.map((estimate) => (
            <Estimate key={estimate.id} estimate={estimate} toggleStatus={toggleStatus} />
          ))}
        {toggleStatus !== "all" && filteredEstimateList.length === 0 && <p>문의가 없습니다.</p>}
        {toggleStatus !== "all" &&
          filteredEstimateList.map((estimate) => (
            <Estimate key={estimate.id} estimate={estimate} toggleStatus={toggleStatus} />
          ))}
      </ul>
    </div>
  );
}
