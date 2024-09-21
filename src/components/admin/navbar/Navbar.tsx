import { User } from "@supabase/supabase-js";
import Link from "next/link";
import { AiOutlineUnorderedList } from "react-icons/ai";
// import { AiFillCustomerService, AiFillPlusCircle, AiFillSetting, AiOutlineUnorderedList  } from "react-icons/ai";
// import { MdCategory } from "react-icons/md";

const menuItems = [
  { name: "게시물 관리", path: "/admin/postManagement", icon: <AiOutlineUnorderedList /> },
  // { name: "카테고리 관리", path: "/admin/management/category", icon: <MdCategory /> },
  // { name: "문의 목록", path: "/admin/estimateList", icon: <AiFillCustomerService /> },
  // { name: "게시물 등록", path: "/admin/create", icon: <AiFillPlusCircle /> },
  // { name: "설정", path: "/admin/management", icon: <AiFillSetting /> },
];

interface IProps {
  user: User;
  logoutHandler: () => void;
}

export default function Navbar({ user, logoutHandler }: IProps) {
  return (
    <nav className="group bottom-0 top-0 flex w-1/12 flex-col gap-4 border-r border-gray-400 px-4 py-6 duration-500 hover:w-2/12">
      <div>
        <h1 className="text-center text-base font-bold group-hover:text-2xl">관리자 페이지</h1>
        <div className="contents-center contents-center flex-col gap-5">
          <p className="contents-center flex-col text-center text-sm group-hover:flex-row group-hover:text-base">
            <span>이메일 : </span>
            {user.email}
          </p>
          <button className="click-button border-black bg-white" onClick={logoutHandler}>
            로그아웃
          </button>
        </div>
      </div>
      <ul className="h-fit overflow-hidden rounded-md border border-gray-400 bg-gray-400">
        {menuItems.map((item) => (
          <li key={item.name}>
            <Link
              href={item.path}
              className="flex items-center gap-3 text-nowrap border-y border-gray-400 bg-white px-2 py-2 text-lg font-bold hover:bg-blue-500"
            >
              <div>{item.icon}</div>
              <p className="hidden group-hover:contents">{item.name}</p>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
