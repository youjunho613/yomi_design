import { HTMLInputTypeAttribute } from "react";
import type { UseFormRegister } from "react-hook-form";
import { EstimateInput } from "./EstimateForm";

interface Props {
  id: keyof EstimateInput;
  label: string;
  register: UseFormRegister<EstimateInput>;
  type?: HTMLInputTypeAttribute | "textarea";
}

export default function EstimateInput({ register, label, id, type = "text" }: Props) {
  const inputRender = () => {
    switch (type) {
      case "text":
        return <input className="h-10 input" type={type} id={id} {...register(id)} />;

      case "file":
        return (
          <>
            <input className="invisible" type="file" id={id} {...register(id)} accept="image/*" />
            <label className="w-20 font-extrabold text-end" htmlFor={id}>
              첨부
            </label>
          </>
        );
      case "textarea":
        return <textarea className="h-[120px] input resize-none" id="estimate" {...register("estimate")} />;
      default:
        return <></>;
    }
  };

  return (
    <div className="flex contents-between gap-5 w-[540px] min-h-[40px] px-2.5 bg-white border-[3px] border-black002">
      <label className={`${type === "file" ? "w-[400px]" : "w-20"} font-extrabold`} htmlFor={id}>
        {label}
      </label>
      {inputRender()}
    </div>
  );
}
