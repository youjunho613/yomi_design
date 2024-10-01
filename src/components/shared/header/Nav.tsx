import useAuth from "@/service/auth/mutations";
import useCategory from "@/service/category/mutations";
import Link from "next/link";
import { NAV_CONTENT } from "./Header.content";

interface IProps {}

export default function Nav({}: IProps) {
  const { fetchUser } = useAuth();
  const { data: userData } = fetchUser;

  const { fetchCategory } = useCategory();
  const { data: categoryList } = fetchCategory;

  const visualNav = (item: string) => {
    const currentItem = ["signage", "branding"];
    return currentItem.some((string) => string === item);
  };

  return (
    <ul className="hidden h-full gap-[3.9vw] text-[1.5vw] uppercase md:flex xl:gap-[50px] xl:text-[20px]">
      {NAV_CONTENT.map((item) => (
        <li key={item.id} className="group relative flex h-full items-center justify-center">
          <Link href={item.href} className="w-full rounded-full px-2 duration-700 group-hover:bg-white">
            {item.id}
          </Link>
          {!!categoryList && visualNav(item.id) && (
            <ul className="absolute left-1/2 top-[45px] hidden -translate-x-1/2 translate-y-2 gap-4 rounded-full bg-black px-6 text-white shadow-md group-hover:flex">
              {categoryList.map((category) => (
                <li key={category.id} className="py-2">
                  <Link
                    href={`/portfolio/${item.id}/${category.eng_name}`}
                    className="flax w-full break-keep text-[18px] hover:font-bold"
                  >
                    {category.kor_name}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </li>
      ))}
      {!!userData && !!userData.user && (
        <li className="group relative flex h-full items-center justify-center">
          <Link href="/admin" className="w-full rounded-full px-2 duration-700 group-hover:bg-white">
            admin
          </Link>
        </li>
      )}
    </ul>
  );
}
