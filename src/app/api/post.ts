import { Tables } from "@/../lib/supabase/schema";
import { supabase } from "@/../lib/supabase/supabase";

export const getPostList = async () => {
  const { data: board, error } = await supabase.from("board").select("*");

  if (error) console.log("getPost : ", error);
  return board;
};

export const getPost = async (postId: string) => {
  const { data: board, error } = await supabase.from("board").select("*").eq("id", postId).single();

  if (error) console.log("getPost : ", error);
  return board;
};

export const createPost = () => {};

export const editPost = async (request: Tables<"board", "Update">, id: number) => {
  const { error } = await supabase.from("board").update(request).eq("id", id).select();

  if (error) console.log("editEstimate : ", error);
};

export const deletePost = async (id: number) => {
  const { error } = await supabase.from("board").delete().eq("id", id);

  if (error) console.log("deletePost : ", error);
};
