"use client";

import Navbar from "@/components/admin/navbar/Navbar";
import Loading from "@/components/shared/loading/Loading";
import useAuth from "@/service/auth/mutations";
import { supabaseAuth } from "@/supabase/supabase";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface IProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: IProps) {
  const router = useRouter();

  const { fetchUser } = useAuth();
  const { data } = fetchUser;
  const user = data?.user;

  const logoutHandler = async () => {
    await supabaseAuth.signOut();
    router.push("/login");
  };

  useEffect(() => {
    if (!data?.user) {
      router.push("/login");
    }
  }, [router]);

  return (
    <div className="flex flex-col gap-4">
      {!!user ? (
        <>
          <div className="contents-between gap-10 px-10 py-4">
            <h1 className="text-2xl">관리자 페이지</h1>
            <div className="contents-center gap-5">
              <p>
                <span>이메일 : </span>
                {user.email}
              </p>
              <button className="click-button border-black bg-white" onClick={logoutHandler}>
                로그아웃
              </button>
            </div>
          </div>
          <Navbar />
          <div className="mb-2 mt-10">{children}</div>
        </>
      ) : (
        <Loading />
      )}
    </div>
  );
}
