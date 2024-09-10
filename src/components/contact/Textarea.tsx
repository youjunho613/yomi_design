import { UseFormRegisterReturn } from "react-hook-form";

interface IProps {
  id: string;
  label: string;
  register: UseFormRegisterReturn;
}

export default function Textarea({ id, label, register }: IProps) {
  return (
    <label className="contents-center h-72 w-full border border-gray001 text-[18px]" htmlFor={id}>
      <span className="flex h-full w-[27.8%] items-center justify-start bg-gray003 px-10">{label}</span>
      <textarea className="mx-10 h-64 w-full resize-none border border-gray001 px-2" id={id} {...register} />
    </label>
  );
}
