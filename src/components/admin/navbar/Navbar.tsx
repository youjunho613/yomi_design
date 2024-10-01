import { User } from "@supabase/supabase-js";
import Link from "next/link";
import { AiFillCustomerService, AiFillPlusCircle, AiOutlineUnorderedList } from "react-icons/ai";
import { MdCategory } from "react-icons/md";

const menuItems = [
  { name: "게시물 추가", path: "/admin/create", icon: <AiFillPlusCircle /> },
  { name: "게시물 관리", path: "/admin/postManagement", icon: <AiOutlineUnorderedList /> },
  { name: "카테고리 관리", path: "/admin/category", icon: <MdCategory /> },
  { name: "문의 목록", path: "/admin/estimateList", icon: <AiFillCustomerService /> },
];

interface IProps {
  user: User;
  logoutHandler: () => void;
}

export default function Navbar({ user, logoutHandler }: IProps) {
  return (
    <nav className="group fixed bottom-0 top-header z-50 flex h-full w-[70px] flex-col gap-4 bg-primary px-4 py-6 duration-500 hover:w-[65vw] xl:hover:w-[15vw]">
      <div className="relative">
        <button className="absolute left-1/2 top-0 flex -translate-x-1/2 flex-col gap-1 duration-500 group-hover:opacity-0">
          <span className="h-0.5 w-4 rounded-full bg-black" />
          <span className="h-0.5 w-4 rounded-full bg-black" />
          <span className="h-0.5 w-4 rounded-full bg-black" />
        </button>
        <h1 className="text-nowrap text-center font-bold opacity-0 duration-500 group-hover:opacity-100">
          관리자 페이지
        </h1>
        <div className="contents-center contents-center flex-col gap-5">
          <p className="contents-center flex-col text-nowrap text-center text-sm opacity-0 duration-500 group-hover:opacity-100">
            <span>이메일 : </span>
            {user.email}
          </p>
          <button
            className="click-button text-nowrap border-black opacity-0 duration-500 group-hover:opacity-100"
            onClick={logoutHandler}
          >
            로그아웃
          </button>
        </div>
      </div>
      <ul className="h-full overflow-hidden">
        {menuItems.map((item) => (
          <li key={item.name} className="flex font-bold">
            <Link
              href={item.path}
              className="flex w-full items-center gap-2.5 text-nowrap rounded-[11px] py-2 pl-2 text-center hover:bg-white hover:text-[#007AFF] hover:shadow-menu group-hover:p-2"
            >
              <div>{item.icon}</div>
              <p className="w-0 text-left opacity-0 group-hover:w-full group-hover:opacity-100">{item.name}</p>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
