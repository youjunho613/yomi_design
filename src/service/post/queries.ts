import { getPost, getPostList } from "@/service/post/postService";

const queryKeys = {
  all: ["posts"] as const,
  detail: ({ postId }: { postId: string | undefined }) => [...queryKeys.all, postId] as const,
};

const queryOptions = {
  all: () => ({
    queryKeys: queryKeys.all,
    queryFn: () => getPostList(),
  }),
  detail: ({ postId }: { postId: string | undefined }) => ({
    queryKeys: queryKeys.detail({ postId }),
    queryFn: () => getPost({ postId }),
  }),
};

export default queryOptions;
