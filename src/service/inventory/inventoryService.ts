import { supabase } from "@/supabase/supabase";
import { TablesInsert, TablesUpdate } from "@/supabase/type";

export const getInventoryList = async () => {
  const { data, error } = await supabase.from("inventory").select("*").order("id", { ascending: true });

  if (error) console.error("getInventoryList : ", error);

  return data;
};

export const createInventory = async (request: TablesInsert<"inventory">) => {
  const { error } = await supabase.from("inventory").insert(request).select();

  if (error) console.error("createInventory : ", error);
};

export const modifyInventory = async (request: TablesUpdate<"inventory">) => {
  if (!request.id) return;
  const { error } = await supabase.from("inventory").update(request).eq("id", request.id).select();

  if (error) console.error("modifyInventory : ", error);
};

export const getInOutList = async () => {
  const { data, error } = await supabase.from("inventory-in-out-list").select("*, inventory(*)");

  if (error) console.error("getInOutList : ", error);

  return data;
};

export const createInOut = async (request: TablesInsert<"inventory-in-out-list">) => {
  const { error } = await supabase.from("inventory-in-out-list").insert(request).select();

  if (error) console.error("createInOut : ", error);
};
