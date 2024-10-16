"use client";

import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import {
  changeFixPost,
  createPost,
  deletePost,
  getBrandPostList,
  getMainPostList,
  getPost,
  getPostList,
  getPostListAll,
  getSignagePostList,
  modifyPost,
} from "./postService";

export default function usePost() {
  const queryClient = new QueryClient();
  const queryKey = ["posts"] as const;

  const { category, id: postId }: { category: string; id: string } = useParams();

  const fetchPosts = useQuery({ queryKey, queryFn: getPostList });

  const fetchPostListAll = useQuery({ queryKey, queryFn: getPostListAll });

  const fetchMainPost = useQuery({
    queryKey: [...queryKey, "main"],
    queryFn: getMainPostList,
    enabled: !category,
  });

  const fetchSignagePosts = useQuery({ queryKey: [...queryKey, "signage"], queryFn: getSignagePostList });

  const fetchBrandingPosts = useQuery({ queryKey: [...queryKey, "branding"], queryFn: getBrandPostList });

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

  const changeFixPostMutation = useMutation({
    mutationFn: changeFixPost,
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
    fetchPostListAll,
    fetchMainPost,
    fetchSignagePosts,
    fetchBrandingPosts,
    fetchPost,
    createPostMutation,
    modifyPostMutation,
    changeFixPostMutation,
    deletePostMutation,
  };
}
