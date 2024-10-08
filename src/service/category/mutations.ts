import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { createCategory, deleteCategory, getCategory, modifyCategory } from "./categoryService";

export default function useCategory() {
  const queryClient = new QueryClient();
  const queryKey = ["category"];
  const fetchCategory = useQuery({ queryKey, queryFn: getCategory });

  const createCategoryMutation = useMutation({
    mutationFn: createCategory,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey });
    },
  });

  const modifyCategoryMutation = useMutation({
    mutationFn: modifyCategory,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey });
    },
  });

  const deleteCategoryMutation = useMutation({
    mutationFn: deleteCategory,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey });
    },
  });

  return { fetchCategory, createCategoryMutation, modifyCategoryMutation, deleteCategoryMutation };
}
