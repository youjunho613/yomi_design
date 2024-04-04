import Detail from "@/components/board/Detail";
import PostList from "@/components/board/PostList";

interface Props {
  params: { category: string[] };
}

export default function Board({ params: { category } }: Props) {
  if (category.length <= 2) {
    return <PostList category={category} />;
  } else {
    return <Detail postId={category[2]} />;
  }
}
