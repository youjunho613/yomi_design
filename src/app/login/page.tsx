"use client";

import { login } from "@/service/auth/auth";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

interface IAuth {
  email: string;
  password: string;
}

export default function Login() {
  const { register, handleSubmit } = useForm<IAuth>();

  const onSubmit = async (data: IAuth) => {
    try {
      const user = await login(data);
    } catch (error) {
      return toast.error(`로그인에 실패했습니다. (${error})`, { autoClose: 6000 });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-10 rounded-3xl bg-main p-8 sm:border-2 sm:border-sub sm:p-20"
    >
      <label htmlFor="email" className="flex flex-col">
        Email
        <input type="email" id="email" className="input h-10 w-full" placeholder="이메일" {...register("email")} />
      </label>

      <label htmlFor="password" className="flex flex-col">
        Password
        <input
          type="password"
          id="password"
          className="input h-10 w-full"
          placeholder="비밀번호"
          {...register("password")}
        />
      </label>
      <input type="submit" value="로그인" className="basic-button px-4 py-3" />
    </form>
  );
}
