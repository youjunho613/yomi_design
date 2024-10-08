"use client";

import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { createEstimate, deleteEstimate, getEstimateList, modifyEstimateStatus } from "./estimateService";

export default function useEstimate() {
  const queryClient = new QueryClient();
  const queryKey = ["estimate"];

  const fetchEstimate = useQuery({ queryKey, queryFn: getEstimateList });

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
    createEstimateMutation,
    modifyEstimateMutation,
    deleteEstimateMutation,
  };
}
