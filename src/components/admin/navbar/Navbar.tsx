import { User } from "@supabase/supabase-js";
import Link from "next/link";
import { menuItems } from "./menu.contant";

interface IProps {
  user: User;
  logoutHandler: () => void;
}

export default function Navbar({ user, logoutHandler }: IProps) {
  return (
    <nav className="group fixed bottom-0 top-[55px] z-10 flex h-full w-[70px] flex-col gap-4 bg-primary px-4 py-6 duration-500 hover:w-[65vw] xl:top-[60px] xl:hover:w-[15vw]">
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
      <div className="flex h-full flex-col gap-8 overflow-hidden">
        {menuItems.map((list, index) => (
          <ul key={index} className="rounded-[11px] bg-white">
            {list.map((item, index) => (
              <li
                key={item.name}
                className="flex font-bold first:rounded-t-[11px] last:rounded-b-[11px] hover:bg-gray-300"
              >
                <Link href={item.path} className="flex w-full items-center gap-2.5 text-nowrap py-2 pl-2 text-center">
                  <div className={`${item.iconBackground} rounded-[4px] p-0.5 text-white`}>{item.icon}</div>
                  <p className="w-0 text-left opacity-0 group-hover:w-full group-hover:opacity-100">{item.name}</p>
                </Link>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </nav>
  );
}
