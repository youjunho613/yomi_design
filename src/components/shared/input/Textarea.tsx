import { UseFormRegisterReturn } from "react-hook-form";

interface IProps {
  className?: string;
  id: string;
  register: UseFormRegisterReturn;
}

export default function Textarea({ className, id, register }: IProps) {
  return <textarea className={className} id={id} {...register} />;
}
