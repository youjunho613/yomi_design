"use client";

import AuthLoading from "@/components/shared/loading/AuthLoading";
import { useAuth } from "@/service/auth/mutations";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const { getUser, logoutMutation } = useAuth();
  const { data: user, isLoading, isError } = getUser;

  const logoutHandler = () => {
    logoutMutation.mutate();
  };

  if (isLoading) return <AuthLoading />;
  if (isError) return <p>Error</p>;
  if (!user) return router.push("/login");

  return (
    <div className="flex flex-col gap-4">
      <div className="w-8/12 mx-auto contents-between">
        <p>{user.email}</p>
        <h1>관리자 페이지</h1>
        <button className="basic-button px-4 py-3 rounded-2xl" onClick={logoutHandler}>
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
      <div className="mt-10 my-2">{children}</div>
    </div>
  );
}
