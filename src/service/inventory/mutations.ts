import { queryClient } from "@/hook/useReactQuery";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createInOut, createInventory, getInOutList, getInventoryList, modifyInventory } from "./inventoryService";

export default function useInventory() {
  const fetchInventory = useQuery({ queryKey: ["inventory"], queryFn: getInventoryList });

  const createInventoryMutation = useMutation({
    mutationFn: createInventory,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["inventory"] });
    },
  });

  const modifyInventoryMutation = useMutation({
    mutationFn: modifyInventory,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["inventory"] });
    },
  });

  const fetchInOut = useQuery({ queryKey: ["inventory-in-out-list"], queryFn: getInOutList });

  const createInOutMutation = useMutation({
    mutationFn: createInOut,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["inventory-in-out-list"] });
    },
  });

  return {
    fetchInventory,
    createInventoryMutation,
    modifyInventoryMutation,
    fetchInOut,
    createInOutMutation,
  };
}
