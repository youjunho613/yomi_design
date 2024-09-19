import { queryClient } from "@/hook/useReactQuery";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createCategory, getCategory } from "./categoryService";

export default function useCategory() {
  const fetchCategory = useQuery({ queryKey: ["category"], queryFn: getCategory });

  const createCategoryMutation = useMutation({
    mutationFn: createCategory,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["category"] });
    },
  });

  return { fetchCategory, createCategoryMutation };
}
