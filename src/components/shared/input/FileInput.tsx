import { UseFormRegisterReturn } from "react-hook-form";

interface IProps {
  id: string;
  multiple?: boolean;
  register: UseFormRegisterReturn;
}

export default function FileInput({ id, multiple = true, register }: IProps) {
  return (
    <>
      <input className="invisible" multiple={multiple} type="file" accept="image/*" id={id} {...register} />
      <label className="w-20 text-end" htmlFor={id}>
        첨부
      </label>
    </>
  );
}
