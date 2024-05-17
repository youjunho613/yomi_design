"use client";

import Loading from "@/components/shared/loading/Loading";
import { supabaseAuth } from "@/supabase/supabase";
import { User } from "@supabase/supabase-js";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface IProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: IProps) {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabaseAuth.getUser();
      if (!data.user) router.push("/login");
      setUser(data.user);
    };
    getUser();
  }, [router]);

  const logoutHandler = async () => {
    await supabaseAuth.signOut();
    router.push("/login");
  };

  return (
    <div className="flex flex-col gap-4">
      {user ? (
        <>
          <div className="contents-between flex-col gap-4 sm:flex-row">
            <p>{user.email}</p>
            <h1>관리자 페이지</h1>
            <button className="basic-button rounded-2xl px-4 py-3" onClick={logoutHandler}>
              로그아웃
            </button>
          </div>
          <ul className="tab">
            <li>
              <Link href={"/admin/estimateList"}>문의</Link>
            </li>
            <li>
              <Link href={"/admin/management"}>게시물 관리</Link>
            </li>
            <li>
              <Link href={"/admin/create"}>게시물 등록</Link>
            </li>
          </ul>
          {/* <Sidebar /> */}
          <div className="mb-2 mt-10">
            {children}
            {/* <Navbar /> */}
          </div>
        </>
      ) : (
        <Loading />
      )}
    </div>
  );
}
