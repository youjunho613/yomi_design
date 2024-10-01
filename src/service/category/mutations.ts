import { queryClient } from "@/hook/useReactQuery";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createCategory, deleteCategory, getCategory, modifyCategory } from "./categoryService";

export default function useCategory() {
  const fetchCategory = useQuery({ queryKey: ["category"], queryFn: getCategory });

  const createCategoryMutation = useMutation({
    mutationFn: createCategory,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["category"] });
    },
  });

  const modifyCategoryMutation = useMutation({
    mutationFn: modifyCategory,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["category"] });
    },
  });

  const deleteCategoryMutation = useMutation({
    mutationFn: deleteCategory,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["category"] });
    },
  });

  return { fetchCategory, createCategoryMutation, modifyCategoryMutation, deleteCategoryMutation };
}
