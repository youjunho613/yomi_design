import { supabase } from "@/supabase/supabase";

import type { TEstimateStatusUpdate } from "@/app/admin/estimateList/page";
import type { TablesInsert, TablesUpdate } from "@/supabase/type";

type TInsert = TablesInsert<"estimate">;
type TUpdate = TablesUpdate<"estimate">;

export const getEstimateList = async () => {
  const { data, error } = await supabase.from("estimate").select("*").order("created_at", { ascending: false });

  if (error) console.error("getEstimateList : ", error);

  return data;
};

export const getFilteredEstimateList = async (status: TEstimateStatusUpdate) => {
  const { data, error } = await supabase
    .from("estimate")
    .select("*")
    .eq("status", status)
    .order("created_at", { ascending: false });

  if (error) console.error("getFilteredEstimateList : ", error);

  return data;
};

export const createEstimate = async (request: TInsert) => {
  const { error } = await supabase.from("estimate").insert(request).select();

  if (error) console.error("createEstimate : ", error);
};

export const modifyEstimateStatus = async ({ id, status }: TUpdate) => {
  if (!id) return;
  const { error } = await supabase.from("estimate").update({ status }).eq("id", id).select();

  if (error) console.error("editEstimate : ", error);
};

export const deleteEstimate = async (id: number) => {
  const { error } = await supabase.from("estimate").delete().eq("id", id);

  if (error) console.error("deleteEstimate : ", error);
};
