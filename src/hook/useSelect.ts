import { TCategory, TMainSignType, TSubSignType } from "@/app/category.constant";
import { ChangeEvent, useState } from "react";

interface ISignType {
  main: TMainSignType | undefined;
  sub: TSubSignType | undefined;
  path: `/board/${TMainSignType}/${TSubSignType}`;
  category: TCategory;
}

export default function useSelect() {
  const [signType, setSignType] = useState<ISignType | undefined>(undefined);

  const onChangeMain = ({ target: { value } }: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (value === "logo" || value === "sign" || value === "print") {
      setSignType((prev) => {
        if (!prev) return undefined;
        return { ...prev };
      });
    }
  };

  const onChangeSub = () => {};
  return { signType, onChangeMain, onChangeSub };
}
