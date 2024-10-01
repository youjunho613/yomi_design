import { supabase } from "@/supabase/supabase";
import { TablesInsert } from "@/supabase/type";

export const getCategory = async () => {
  const { data: category, error } = await supabase.from("category").select("*").order("index", { ascending: true });

  if (error) console.error("getCategory : ", error);
  return category;
};

export const createCategory = async (data: TablesInsert<"category">) => {
  const { data: fetchData, error: fetchError } = await supabase.from("category").select("*");
  if (!fetchData) return;
  if (fetchError) console.error("createCategory : ", fetchError);

  const index = fetchData.length + 1;

  const { error } = await supabase
    .from("category")
    .insert({ ...data, index })
    .select();

  if (error) console.error("createCategory : ", error);
};

export const modifyCategory = async (data: TablesInsert<"category">) => {
  if (!data.id) return;

  const { error } = await supabase.from("category").update(data).eq("id", data.id);

  if (error) console.error("modifyCategory : ", error);
};

export const deleteCategory = async (id: number) => {
  const { error } = await supabase.from("category").delete().eq("id", id);

  if (error) console.error("deleteCategory : ", error);
};
