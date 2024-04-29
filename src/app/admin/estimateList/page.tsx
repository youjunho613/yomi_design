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
  const { fetchEstimate, fetchFilteredEstimate } = useEstimate({ status: toggleStatus });

  const isLoading = fetchEstimate.isLoading || fetchFilteredEstimate.isLoading;
  const isError = fetchEstimate.isError || fetchFilteredEstimate.isError;
  const error = !toggleStatus ? fetchEstimate.error : fetchFilteredEstimate.error;

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
        {!toggleStatus && <EstimateList data={fetchEstimate.data} />}
        {!!toggleStatus && <EstimateList data={fetchFilteredEstimate.data} />}
      </div>
    </Fragment>
  );
}
