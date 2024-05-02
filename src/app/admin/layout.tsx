"use client";

import { logout } from "@/service/auth/auth";
import Link from "next/link";
import { redirect } from "next/navigation";

interface IProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: IProps) {
  const logoutHandler = () => {
    logout();
    redirect("/login");
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="contents-between flex-col gap-4 sm:flex-row">
        {/* <p>{user?.email}</p> */}
        <h1>관리자 페이지</h1>
        <button className="basic-button rounded-2xl px-4 py-3" onClick={logoutHandler}>
          로그아웃
        </button>
      </div>
      <ul className="tab">
        <li className="tab-button-box">
          <Link href={"/admin/estimateList"} className="tab-button">
            문의
          </Link>
        </li>
        <li className="tab-button-box">
          <Link href={"/admin/management"} className="tab-button">
            게시물 관리
          </Link>
        </li>
        <li className="tab-button-box">
          <Link href={"/admin/create"} className="tab-button">
            게시물 등록
          </Link>
        </li>
      </ul>
      <div className="mb-2 mt-10">{children}</div>
    </div>
  );
}
