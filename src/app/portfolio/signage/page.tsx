"use client";

import PostList from "@/components/portfolio/PostList";
import Error from "@/components/shared/Error";
import Loading from "@/components/shared/loading/Loading";
import usePost from "@/service/post/mutations";

export default function Page() {
  const { fetchPosts } = usePost();

  const { data, isError, isLoading, error } = fetchPosts;

  if (isLoading) return <Loading />;
  if (isError) return <Error error={error.message} />;

  return <PostList data={data} label="signage" />;
}
