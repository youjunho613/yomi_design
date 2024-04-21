import { UseFormRegisterReturn } from "react-hook-form";

interface IProps {
  className?: string;
  id: string;
  register: UseFormRegisterReturn;
}

export default function Input({ className, id, register }: IProps) {
  return <input className={className} type="text" id={id} {...register} />;
}
