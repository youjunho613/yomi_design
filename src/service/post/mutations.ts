"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import { getMainPostList, getPostListByCategory, createPost, modifyPost, deletePost } from "./postService";
import queryOptions from "./queries";
import { queryClient } from "@/hook/useReactQuery";
import { useParams } from "next/navigation";

export default function usePost() {
  const { category } = useParams();

  const mainCategory = category?.[0] ?? undefined;
  const subcategory = category?.[1] ?? undefined;
  const postId = category?.[2] ?? undefined;

  const currentCategory = !!subcategory ? subcategory : mainCategory;
  const changCategory = !!subcategory ? "subCategory" : "mainCategory";

  const queryKey = queryOptions.all().queryKeys;

  const fetchPosts = useQuery({ queryKey, queryFn: queryOptions.all().queryFn });

  const fetchMainPost = useQuery({
    queryKey: [...queryKey, "main"],
    queryFn: getMainPostList,
    enabled: !mainCategory,
  });

  const fetchFilteredPosts = useQuery({
    queryKey: [...queryKey, currentCategory],
    queryFn: () => getPostListByCategory({ changCategory, currentCategory }),
    enabled: !!mainCategory,
  });

  const fetchPost = useQuery({
    queryKey: queryOptions.detail({ postId }).queryKeys,
    queryFn: queryOptions.detail({ postId }).queryFn,
    enabled: !!postId,
  });

  const createPostMutation = useMutation({
    mutationFn: createPost,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey });
    },
  });

  const modifyPostMutation = useMutation({
    mutationFn: modifyPost,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey });
    },
  });

  const deletePostMutation = useMutation({
    mutationFn: deletePost,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey });
    },
  });

  return {
    fetchPosts,
    fetchMainPost,
    fetchFilteredPosts,
    fetchPost,
    createPostMutation,
    modifyPostMutation,
    deletePostMutation,
  };
}
