"use client";

import EstimateList from "@/components/admin/estimate/EstimateList";
import EstimateTab from "@/components/admin/estimate/EstimateTab";
import Error from "@/components/shared/Error";
import Loading from "@/components/shared/loading/Loading";
import useEstimate from "@/service/estimate/mutations";
import { Database } from "@/supabase/type";
import { Fragment, useState } from "react";

export type TEstimateStatusUpdate = Database["public"]["Enums"]["estimateStatus"];

export interface IEstimateStatusItem {
  status: TEstimateStatusUpdate | undefined;
  label: string;
}

export default function Page() {
  const [toggleStatus, setToggleStatus] = useState<TEstimateStatusUpdate | undefined>(undefined);
  const { fetchEstimate } = useEstimate({ status: toggleStatus });
  const { data, isLoading, isError, error } = fetchEstimate;

  const dataNotHidden = data?.filter((item) => item.status !== "hidden");
  const unconfirmedData = fetchEstimate.data?.filter((item) => item.status === "unconfirmed");
  const confirmedData = fetchEstimate.data?.filter((item) => item.status === "confirm");
  const doneData = fetchEstimate.data?.filter((item) => item.status === "done");
  const hiddenData = fetchEstimate.data?.filter((item) => item.status === "hidden");

  const onChangeStatus = (status: TEstimateStatusUpdate | undefined) => {
    setToggleStatus(status);
  };

  if (isLoading) return <Loading />;
  if (isError) return <Error error={error?.message ?? ""} />;

  return (
    <Fragment>
      <h1 className="my-5 w-full text-center text-2xl font-bold">문의글 관리</h1>
      <div>
        <EstimateTab toggleStatus={toggleStatus} onChangeStatus={onChangeStatus} />
        {!toggleStatus && <EstimateList data={dataNotHidden} />}
        {toggleStatus === "unconfirmed" && <EstimateList data={unconfirmedData} />}
        {toggleStatus === "confirm" && <EstimateList data={confirmedData} />}
        {toggleStatus === "done" && <EstimateList data={doneData} />}
        {toggleStatus === "hidden" && <EstimateList data={hiddenData} />}
      </div>
    </Fragment>
  );
}
