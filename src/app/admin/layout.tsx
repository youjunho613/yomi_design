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
        <div className="flex h-full w-full pr-1 xl:pr-10">
          <Navbar user={user} logoutHandler={logoutHandler} />
          <div className="h-full w-full pl-[74px] pr-2 xl:ml-[70px] xl:px-10">{children}</div>
        </div>
      )
    );
}
