import { supabase } from "@/../lib/supabase/supabase";
import { Database, Tables } from "@/../lib/supabase/schema";
import { Input } from "@/components/estimate/EstimateForm";
import uuid from "react-uuid";

export type TEstimateStatus = Database["public"]["Enums"]["estimateStatus"];

export const getEstimateList = async () => {
  const { data: estimate, error } = await supabase.from("estimate").select("*");

  if (error) console.log("getEstimateList : ", error);

  return estimate;
};

export const getEstimate = async () => {};

export const createEstimate = async (input: Input) => {
  const { conceptFile, ...omitFileRequest } = input;
  const path = await uploadFile(uuid(), conceptFile[0]);
  const photoUrl = `estimate/${path}`;

  const request = { ...omitFileRequest, photoUrl };

  const { error } = await supabase.from("estimate").insert([request]).select();

  if (error) console.log("createEstimate : ", error);
};

export const uploadFile = async (id: string, file: File) => {
  const { data } = await supabase.storage.from("estimate").upload(`${id}`, file, {
    cacheControl: "3600",
    upsert: false,
  });

  if (data) return data.path;
};

export const editEstimate = async (status: TEstimateStatus, id: number) => {
  const { error } = await supabase.from("estimate").update({ status }).eq("id", id).select();

  if (error) console.log("editEstimate : ", error);
};

export const deleteEstimate = async (id: number) => {
  const { error } = await supabase.from("estimate").delete().eq("id", id);

  if (error) console.log("deleteEstimate : ", error);
};
