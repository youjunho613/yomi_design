"use client";

import useInventory from "@/service/inventory/mutations";
import { TablesInsert } from "@/supabase/type";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function CreateInOutForm() {
  const { createInOutMutation, fetchInventory, modifyInventoryMutation } = useInventory();
  const { data: inventoryList } = fetchInventory;
  console.log("inventoryList :", inventoryList);

  const { register, handleSubmit } = useForm<TablesInsert<"inventory-in-out-list">>();

  const onSubmit = (data: TablesInsert<"inventory-in-out-list">) => {
    if (!data.inventoryId) return toast.error("제품을 선택해주세요.");
    const quantity = inventoryList?.find((item) => Number(item.id) === Number(data.inventoryId))?.quantity ?? 0;

    const price = !data.price ? null : Number(data.price);

    createInOutMutation.mutate({ ...data, price });
    modifyInventoryMutation.mutate({ id: data.inventoryId, quantity: quantity + Number(data.quantity) });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col justify-around gap-2 text-nowrap rounded-lg border border-black p-2 xl:flex-row"
    >
      <label htmlFor="date" className="flex items-center justify-between gap-2">
        날짜
        <input type="date" {...register("date")} className="w-2/3 border border-black px-1 xl:w-auto" />
      </label>
      <label htmlFor="quantity" className="flex items-center justify-between gap-2">
        제품명
        <select id="inventoryId" className="w-2/3 border border-black px-1 xl:w-auto" {...register("inventoryId")}>
          <option value={undefined}>선택하세요.</option>
          {inventoryList?.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name} / {item.spec} / {item.maker}
            </option>
          ))}
        </select>
      </label>
      <label htmlFor="quantity" className="flex items-center justify-between gap-2">
        수량
        <input type="text" {...register("quantity")} className="w-2/3 border border-black px-1 xl:w-auto" />
      </label>
      <label htmlFor="memo" className="flex items-center justify-between gap-2">
        메모
        <input type="text" {...register("memo")} className="w-2/3 border border-black px-1 xl:w-auto" />
      </label>
      <label htmlFor="price" className="flex items-center justify-between gap-2">
        가격
        <input type="number" {...register("price")} className="w-2/3 border border-black px-1 xl:w-auto" />
      </label>
      <fieldset className="flex justify-around gap-2 border border-black p-2">
        <legend>위치</legend>
        <label htmlFor="car" className="flex items-center gap-2">
          <input type="radio" value={"포터"} id="car" {...register("location")} className="border border-black px-1" />
          포터
        </label>
        <label htmlFor="office" className="flex items-center gap-2">
          <input
            type="radio"
            value={"사무실"}
            id="office"
            {...register("location")}
            className="border border-black px-1"
          />
          사무실
        </label>
      </fieldset>

      <input type="submit" value="입출고 추가" className="click-button border-black" />
    </form>
  );
}
