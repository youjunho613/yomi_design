import { supabase } from "@/supabase/supabase";

import type { TablesInsert, TablesUpdate } from "@/supabase/type";

interface IModifyPost {
  request: TablesUpdate<"board">;
  id: number;
}

export const getPostList = async () => {
  const { data: board, error } = await supabase
    .from("board")
    .select("*,category (*)")
    .order("created_at", { ascending: false });

  if (error) console.error("getPost : ", error);
  return board;
};

export const getPostListAll = async () => {
  const { data: board, error } = await supabase
    .from("board")
    .select("*,category (*),signType(*)")
    .order("created_at", { ascending: false });

  console.log("board :", board);
  if (error) console.error("getPost : ", error);
  return board;
};

export const getMainPostList = async () => {
  const { data, error } = await supabase
    .from("mainPosts")
    .select("*,board (*, category (*))")
    .order("position", { ascending: true });

  if (error) console.error("getPost : ", error);
  return data;
};

export const getSignagePostList = async () => {
  const { data, error } = await supabase
    .from("board")
    .select("*,category (*)")
    .eq("type", "signage")
    .order("created_at", { ascending: false });

  if (error) console.error("getPost : ", error);
  return data;
};

export const getBrandPostList = async () => {
  const { data, error } = await supabase
    .from("board")
    .select("*,category (*)")
    .eq("type", "branding")
    .order("created_at", { ascending: false });

  if (error) console.error("getPost : ", error);
  return data;
};

export const changeFixPost = async ({ postId, position }: { postId: number; position: number }) => {
  const { error } = await supabase.from("mainPosts").update({ postId }).eq("position", position);

  if (error) console.error("changeFixPost : ", error);
};

export const getPostListByCategory = async ({
  changCategory,
  currentCategory,
}: {
  changCategory: "mainCategory" | "subCategory";
  currentCategory: string;
}) => {
  const { data: board, error } = await supabase
    .from("board")
    .select("*")
    .eq(changCategory, currentCategory)
    .order("id", { ascending: false });

  if (error) console.error("getPost : ", error);
  return board;
};

export const getPost = async ({ postId }: { postId: string | undefined }) => {
  if (!postId) return;
  const { data: board, error } = await supabase.from("board").select("*").eq("id", postId).single();

  if (error) console.error("getPost : ", error);
  return board;
};

export const createPost = async (data: TablesInsert<"board">) => {
  const { error } = await supabase.from("board").insert(data).select();

  if (error) console.error("createPost : ", error);
};

export const modifyPost = async ({ request, id }: IModifyPost) => {
  const { error } = await supabase.from("board").update(request).eq("id", id).select();

  if (error) console.error("editEstimate : ", error);
};

export const deletePost = async ({ id, fileList }: { id: number; fileList: string[] }) => {
  const { error: tableError } = await supabase.from("board").delete().eq("id", id);
  const { error: storageError } = await supabase.storage.from("post").remove(fileList);

  if (tableError) console.error("deletePost > tableError : ", tableError);
  if (storageError) console.error("deletePost > storageError : ", storageError);
};
