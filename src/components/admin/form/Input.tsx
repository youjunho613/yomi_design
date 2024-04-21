import { PostFormInput } from "@/app/admin/create/page";
import type { HTMLInputTypeAttribute } from "react";
import type { UseFormRegister } from "react-hook-form";

interface Props {
  id: keyof PostFormInput;
  label: string;
  register: UseFormRegister<PostFormInput>;
  type: HTMLInputTypeAttribute;
}

export default function Input({ id, type, label, register }: Props) {
  return (
    <label htmlFor={id} className="flex gap-1 items-center">
      {`${label} : `}
      {type !== "file" ? (
        <input id={id} className="w-96 h-10 px-2" type={type} {...register(id)} />
      ) : (
        <input id={id} className="h-10" type={type} multiple accept="image/*" {...register(id)} />
      )}
    </label>
  );
}
