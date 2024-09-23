"use client";

import Navbar from "@/components/admin/navbar/Navbar";
import Loading from "@/components/shared/loading/Loading";
import { logout } from "@/service/auth/auth";
import useAuth from "@/service/auth/mutations";
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

  const logoutHandler = () => {
    logout();
    router.push("/login");
  };

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [router]);

  if (!user) return <Loading />;
  else
    return (
      !!user && (
        <div className="flex h-full w-full px-1 xl:px-10">
          <Navbar user={user} logoutHandler={logoutHandler} />
          <div className="w-full px-2 xl:px-10">{children}</div>
        </div>
      )
    );
}
