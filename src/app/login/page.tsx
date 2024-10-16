"use client";

import { login } from "@/service/auth/auth";
import { supabaseAuth } from "@/supabase/supabase";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

interface IAuth {
  email: string;
  password: string;
}

export default function Login() {
  const { register, handleSubmit } = useForm<IAuth>();
  const router = useRouter();

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabaseAuth.getUser();
      if (!data.user) return;
      router.push("/admin");
    };
    getUser();
  }, [router]);

  const onSubmit = async (data: IAuth) => {
    await login(data);
    router.push("/admin");
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto my-10 flex max-w-[800px] flex-col gap-10 rounded-3xl border-2 border-black bg-white p-8 xl:p-20"
    >
      <label htmlFor="email" className="flex flex-col">
        Email
        <input
          type="email"
          id="email"
          className="input h-10 w-full bg-gray003"
          placeholder="이메일"
          {...register("email")}
        />
      </label>

      <label htmlFor="password" className="flex flex-col">
        Password
        <input
          type="password"
          id="password"
          className="input h-10 w-full  bg-gray003"
          placeholder="비밀번호"
          {...register("password")}
        />
      </label>
      <input type="submit" value="로그인" className="basic-button px-4 py-3" />
    </form>
  );
}
