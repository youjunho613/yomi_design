"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import queryOptions from "./queries";
import { queryClient } from "@/hook/useReactQuery";
import { createEstimate, deleteEstimate, getEstimateList, modifyEstimateStatus } from "./estimateService";

export default function useEstimate() {
  const queryKey = queryOptions.all().queryKeys;

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
      await queryClient.invalidateQueries({ queryKey });
    },
  });

  const deleteEstimateMutation = useMutation({
    mutationFn: deleteEstimate,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey });
    },
  });

  return {
    fetchEstimate,
    createEstimateMutation,
    modifyEstimateMutation,
    deleteEstimateMutation,
  };
}