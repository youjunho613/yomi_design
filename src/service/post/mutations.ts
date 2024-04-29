"use client";

import { queryClient } from "@/hook/useReactQuery";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import {
  createPost,
  deletePost,
  getMainPostList,
  getPost,
  getPostList,
  getPostListByCategory,
  modifyPost,
} from "./postService";

export default function usePost() {
  const queryKey = ["posts"] as const;

  const { category } = useParams();

  const mainCategory = category?.[0] ?? undefined;
  const subcategory = category?.[1] ?? undefined;
  const postId = category?.[2] ?? undefined;

  const currentCategory = !!subcategory ? subcategory : mainCategory;
  const changCategory = !!subcategory ? "subCategory" : "mainCategory";

  const fetchPosts = useQuery({ queryKey, queryFn: getPostList });

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
    queryKey: [...queryKey, postId],
    queryFn: () => getPost({ postId }),
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
