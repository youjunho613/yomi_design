"use client";

import { useForm } from "react-hook-form";
import { useAuth } from "@/service/auth/mutations";
import { useRouter } from "next/navigation";

interface IAuth {
  email: string;
  password: string;
}

export default function Login() {
  const { register, handleSubmit } = useForm<IAuth>();
  const { getUser, loginMutation } = useAuth();
  const { data: user } = getUser;
  const router = useRouter();

  const onSubmit = async (data: IAuth) => {
    loginMutation.mutate(data);
  };

  if (!!user) return router.push("/admin");

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col bg-main gap-10 w-10/12 p-20 rounded-3xl mx-auto border-2 border-sub"
    >
      <label htmlFor="email" className="flex flex-col">
        Email
        <input type="email" id="email" className="w-full h-10 input" placeholder="이메일" {...register("email")} />
      </label>

      <label htmlFor="password" className="flex flex-col">
        Password
        <input
          type="password"
          id="password"
          className="w-full h-10 input"
          placeholder="비밀번호"
          {...register("password")}
        />
      </label>
      <input type="submit" value="로그인" className="basic-button px-4 py-3" />
    </form>
  );
}
