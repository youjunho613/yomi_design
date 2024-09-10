import { Tables } from "@/supabase/type";
import PageTitle from "../shared/PageTitle";
import NullPost from "./NullPost";
import PostItem from "./PostItem";

interface IProps {
  label: "signage" | "branding";
  data: Tables<"board">[] | undefined | null;
}

export default function PostList({ label, data }: IProps) {
  if (!data)
    return (
      <div className="layout contents-center mt-[100px] flex-col">
        <PageTitle title={label} />
        <NullPost status={"undefined"} />
      </div>
    );

  if (data.length === 0)
    return (
      <div className="layout contents-center mt-[100px] flex-col">
        <PageTitle title={label} />
        <NullPost status={"null"} />
      </div>
    );

  return (
    <div className="layout contents-center mt-[100px] flex-col">
      <PageTitle title={label} />
      <ul className="mb-10 flex w-full flex-wrap gap-[1%] gap-y-5">
        {data.map((post) => {
          return <PostItem post={post} key={post.id} />;
        })}
      </ul>
    </div>
  );
}
