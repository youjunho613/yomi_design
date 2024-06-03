import { UseFormRegisterReturn } from "react-hook-form";

interface IProps {
  id: string;
  multiple?: boolean;
  register: UseFormRegisterReturn;
}

export default function FileInput({ id, multiple = true, register }: IProps) {
  return (
    <>
      <input className="hidden" multiple={multiple} type="file" accept="image/*" id={id} {...register} />
      <label className="text-end font-bold" htmlFor={id}>
        첨부
      </label>
    </>
  );
}
