import { UseFormRegisterReturn } from "react-hook-form";

interface IProps {
  id: string;
  label: string;
  register: UseFormRegisterReturn;
}

export default function DateInput({ id, label, register }: IProps) {
  return (
    <label className="estimate-label" htmlFor={id}>
      <span className="estimate-span">{label}</span>
      <input className="estimate-input xl:h-8" type="date" id={id} {...register} />
    </label>
  );
}
