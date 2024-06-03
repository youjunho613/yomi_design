import { SUB_CATEGORY } from "@/app/category.constant";
import Detail from "@/components/board/Detail";
import PostList from "@/components/board/PostList";
import Link from "next/link";

import type { TMainSignType, TSubCategory } from "@/app/category.constant";

export type TPostId = string | undefined;

interface IProps {
  params: {
    category: [TMainSignType | undefined, TSubCategory | undefined, TPostId | undefined];
  };
}

export default function Board({ params: { category: params } }: IProps) {
  const category = {
    mainCategory: params[0],
    subCategory: params[1],
  };

  if (!category.mainCategory) return <p>잘못된 접근입니다.</p>;

  return (
    <div className="my-4">
      <nav>
        <ul className="board-navigation">
          <li className="break-keep">
            <Link href={`/board/${category.mainCategory}`}>전체</Link>
          </li>
          {SUB_CATEGORY[category.mainCategory].map((item) => (
            <li key={item.id} className="break-keep">
              <Link href={item.href}>{item.label}</Link>
            </li>
          ))}
        </ul>
      </nav>
      <div>{params.length <= 2 ? <PostList category={category} /> : <Detail />}</div>
    </div>
  );
}
