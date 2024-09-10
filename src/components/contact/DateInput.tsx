import { UseFormRegisterReturn } from "react-hook-form";

interface IProps {
  id: string;
  label: string;
  register: UseFormRegisterReturn;
}

export default function DateInput({ id, label, register }: IProps) {
  return (
    <label className="contents-center h-15 w-full border border-b-0 border-gray001 text-[18px]" htmlFor={id}>
      <span className="flex h-full w-[27.8%] items-center justify-start bg-gray003 px-10">{label}</span>
      <input className="mx-10 h-8 w-full border border-gray001 px-2" type="date" id={id} {...register} />
    </label>
  );
}
