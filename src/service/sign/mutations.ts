import { useMutation, useQuery } from "@tanstack/react-query";
import { getSignType } from "./signService";

export const useSignType = () => {
  const queryKey = ["signType"] as const;
  const fetchSignType = useQuery({ queryKey, queryFn: getSignType });

  const createSignType = useMutation({});

  return { fetchSignType };
};
