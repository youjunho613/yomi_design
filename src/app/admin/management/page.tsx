"use client";

import FixListManage from "@/components/admin/management/FixListManage";
// import PostManage from "@/components/admin/management/PostManage";
import Error from "@/components/shared/Error";
import Loading from "@/components/shared/loading/Loading";
import usePost from "@/service/post/mutations";
import { Fragment } from "react";

export default function Page() {
  const { fetchPosts } = usePost();
  const { data, isError, isLoading, error } = fetchPosts;

  if (isLoading) return <Loading />;
  if (isError) return <Error error={error.message} />;
  if (!data) return <p>업로드된 게시물이 없습니다.</p>;

  return (
    <Fragment>
      <h1 className="my-5 w-full text-center text-2xl font-bold">게시물 관리</h1>
      <FixListManage />
      {/* <ul className="flex w-full flex-wrap items-center gap-2.5 sm:gap-6">
        {data.map((post) => (
          <PostManage key={post.id} post={post} />
        ))}
      </ul> */}
    </Fragment>
  );
}
