import { UseFormRegisterReturn } from "react-hook-form";

interface IProps {
  id: string;
  label: string;
  register: UseFormRegisterReturn;
}

export default function Textarea({ id, label, register }: IProps) {
  return (
    <label className="estimate-label border-b xl:h-72" htmlFor={id}>
      <span className="estimate-span">{label}</span>
      <textarea className="estimate-input resize-none xl:h-64" id={id} {...register} />
    </label>
  );
}
