"use client";

import type { TEstimateStatusUpdate } from "@/app/admin/estimateList/page";
import { queryClient } from "@/hook/useReactQuery";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import {
  createEstimate,
  deleteEstimate,
  getEstimateList,
  getFilteredEstimateList,
  modifyEstimateStatus,
} from "./estimateService";

interface IProps {
  status?: TEstimateStatusUpdate;
}

export default function useEstimate({ status }: IProps) {
  const queryKey = ["estimate"] as const;

  const fetchEstimate = useQuery({ queryKey, queryFn: getEstimateList });

  const fetchFilteredEstimate = useQuery({
    queryKey,
    queryFn: () => {
      if (!status) return null;
      return getFilteredEstimateList(status);
    },
  });

  const createEstimateMutation = useMutation({
    mutationFn: createEstimate,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey });
    },
  });

  const modifyEstimateMutation = useMutation({
    mutationFn: modifyEstimateStatus,
    onSuccess: async () => {
      await toast.promise(queryClient.invalidateQueries({ queryKey }), {
        pending: "수정 중...",
        success: "수정 완료",
        error: "수정 실패",
      });
    },
  });

  const deleteEstimateMutation = useMutation({
    mutationFn: deleteEstimate,
    onSuccess: async () => {
      await toast.promise(queryClient.invalidateQueries({ queryKey }), {
        pending: "삭제 중...",
        success: "삭제 완료",
        error: "삭제 실패",
      });
    },
  });

  return {
    fetchEstimate,
    fetchFilteredEstimate,
    createEstimateMutation,
    modifyEstimateMutation,
    deleteEstimateMutation,
  };
}
