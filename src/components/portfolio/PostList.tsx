import { Tables } from "@/supabase/type";
import PostItem from "./PostItem";

interface IProps {
  data: Array<Tables<"board"> & { category: Tables<"category"> | null }>;
}

export default function PostList({ data }: IProps) {
  return (
    <ul className="mb-10 flex w-full flex-wrap justify-start gap-x-[0.93vw] gap-y-[2vw] md:gap-y-[1vw]">
      {data.map((post) => {
        return <PostItem post={post} key={post.id} />;
      })}
    </ul>
  );
}
