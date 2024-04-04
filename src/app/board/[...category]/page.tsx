import type { TLogo, TMainSignType, TPrint, TSign } from "@/app/category.constant";
import { SUB_CATEGORY } from "@/app/category.constant";
import Detail from "@/components/board/Detail";
import PostList from "@/components/board/PostList";
import Link from "next/link";

interface Props {
  params: { category: [TMainSignType, TLogo | TSign | TPrint, string] };
}

export default function Board({ params: { category } }: Props) {
  return (
    <div>
      <nav>
        <ul className="contents-center relative gap-12 w-[1000px] h-12 mb-12 navigation animation">
          <li>
            <Link href={`/board/${category[0]}`}>전체</Link>
          </li>
          {SUB_CATEGORY[category[0]].map((item) => (
            <li key={item.id}>
              <Link href={item.href}>{item.label}</Link>
            </li>
          ))}
        </ul>
      </nav>
      <div>{category.length <= 2 ? <PostList category={category} /> : <Detail postId={category[2]} />}</div>
    </div>
  );
}
