"use client";

import NullPost from "@/components/portfolio/NullPost";
import PostList from "@/components/portfolio/PostList";
import Error from "@/components/shared/Error";
import PageTitle from "@/components/shared/PageTitle";
import Loading from "@/components/shared/loading/Loading";
import usePost from "@/service/post/mutations";

export type TPostId = string | undefined;

interface IProps {
  params: { category: string };
}

export default function Signage({ params: { category } }: IProps) {
  const { fetchSignagePosts } = usePost();
  const { data, isError, isLoading, error } = fetchSignagePosts;

  const filterData = data?.filter((post) => post.category?.eng_name === category);

  if (isLoading) return <Loading />;
  if (isError) return <Error error={error.message} />;
  if (!filterData) return <NullPost status={"undefined"} />;
  if (filterData.length === 0) return <NullPost status={"null"} />;

  return (
    <>
      <PageTitle title={"signage"} />
      <PostList data={filterData} />
    </>
  );
}
