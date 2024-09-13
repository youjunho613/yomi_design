import { supabase } from "@/supabase/supabase";

interface IProps {
  category: string | null;
}

// @TODO await 훅 변환
export default async function CategoryKor(category: string | null) {
  if (!category) return "";
  const { data } = await supabase.from("category").select("*");
  const kor_category = data?.find(({ eng_name }) => eng_name === category)?.kor_name;

  return kor_category;
}
