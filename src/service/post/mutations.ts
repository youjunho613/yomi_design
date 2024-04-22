"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import {
  getPostList,
  getPost,
  getMainPostList,
  getPostListByCategory,
  createPost,
  modifyPost,
  deletePost,
} from "./postService";
import queryOptions from "./queries";
import { queryClient } from "@/hook/useReactQuery";
import { useParams } from "next/navigation";

export default function usePost() {
  const { category } = useParams();
  const mainCategory = category !== undefined ? category[0] : "";
  const subcategory = category !== undefined ? category[1] : "";
  const postId = category !== undefined ? category[2] : "";

  const currentCategory = !subcategory ? mainCategory : subcategory;

  const changCategory = !subcategory ? "mainCategory" : "subCategory";

  const queryKey = queryOptions.all().queryKeys;

  const fetchPosts = useQuery({ queryKey, queryFn: getPostList });

  const fetchMainPost = useQuery({ queryKey, queryFn: getMainPostList });

  const fetchFilteredPosts = useQuery({
    queryKey: ["post", currentCategory],
    queryFn: () => getPostListByCategory({ changCategory, currentCategory }),
  });

  const fetchPost = useQuery({
    queryKey: queryOptions.detail({ postId }).queryKeys,
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
