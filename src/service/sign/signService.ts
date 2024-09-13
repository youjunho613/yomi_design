import { supabase } from "@/supabase/supabase";

export const getSignType = async () => {
  const { data, error } = await supabase.from("sign").select("*");

  if (error) console.error("getSignType : ", error);
  return data;
};
