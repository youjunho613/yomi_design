import type { HTMLInputTypeAttribute } from "react";
import type { UseFormRegister } from "react-hook-form";
import { PostFormInput } from "./Form";

interface Props {
  id: keyof PostFormInput;
  label: string;
  register: UseFormRegister<PostFormInput>;
  type: HTMLInputTypeAttribute;
}

export default function Input({ id, type, label, register }: Props) {
  return (
    <label htmlFor={id} className="flex gap-1 items-center">
      {label} :
      {type === "file" ? (
        <input id={id} type={type} accept="image/*" {...register(id)} />
      ) : (
        <input id={id} type={type} {...register(id)} />
      )}
    </label>
  );
}
