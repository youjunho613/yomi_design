"use client";

import useInventory from "@/service/inventory/mutations";
import { TablesInsert } from "@/supabase/type";
import { useForm } from "react-hook-form";

export default function CreateInventoryForm() {
  const { createInventoryMutation } = useInventory();

  const { register, handleSubmit } = useForm<TablesInsert<"inventory">>();

  const onSubmit = (data: TablesInsert<"inventory">) => {
    createInventoryMutation.mutate({ ...data, quantity: 0 });
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col justify-around gap-2 text-nowrap rounded-lg border border-black p-2 xl:flex-row"
    >
      <label htmlFor="name" className="flex items-center justify-between gap-2">
        제품명
        <input type="text" {...register("name")} className="w-2/3 border border-black px-1 xl:w-auto" />
      </label>
      <label htmlFor="spec" className="flex items-center justify-between gap-2">
        스펙
        <input type="text" {...register("spec")} className="w-2/3 border border-black px-1 xl:w-auto" />
      </label>
      <label htmlFor="maker" className="flex items-center justify-between gap-2">
        제조사
        <input type="text" {...register("maker")} className="w-2/3 border border-black px-1 xl:w-auto" />
      </label>
      <input type="submit" value="제품 추가" className="click-button border-black" />
    </form>
  );
}
