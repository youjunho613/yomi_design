import { MAIN_CATEGORY, SUB_CATEGORY, TMainSignType } from "@/app/category.constant";
import useSelect from "@/hook/useSelect";
import { ChangeEvent } from "react";

export default function CategorySelect() {
  const { signType, onChangeMain } = useSelect();
  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4">
        {MAIN_CATEGORY.map((category) => (
          <label htmlFor={category.id} key={category.id} className="flex items-center">
            {category.label}
            <input
              id={category.id}
              value={category.id}
              onChange={(event) => onChangeMain(event)}
              name="board"
              type="radio"
            />
          </label>
        ))}
      </div>
      <select name="subCategory" onChange={(event) => onChangeSelect(event)}>
        {!!signType ? (
          SUB_CATEGORY[signType].map((category) => (
            <option key={category.id} value={category.id}>
              {category.label}
            </option>
          ))
        ) : (
          <option value={undefined}>카테고리를 선택해주세요</option>
        )}
      </select>
    </div>
  );
}
