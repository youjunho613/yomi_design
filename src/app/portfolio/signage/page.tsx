"use client";

import NullPost from "@/components/portfolio/NullPost";
import PostList from "@/components/portfolio/PostList";
import Error from "@/components/shared/Error";
import PageTitle from "@/components/shared/PageTitle";
import Loading from "@/components/shared/loading/Loading";
import usePost from "@/service/post/mutations";

export default function Page() {
  const { fetchSignagePosts } = usePost();

  const { data, isError, isLoading, error } = fetchSignagePosts;

  if (isLoading) return <Loading />;
  if (isError) return <Error error={error.message} />;
  if (!data) return <NullPost status={"undefined"} />;
  if (data.length === 0) return <NullPost status={"null"} />;

  return (
    <>
      <PageTitle title={"signage"} />
      <PostList data={data} />
    </>
  );
}
