import type { TMainSignType, TSubSignType } from "@/app/category.constant";
import { MAIN_CATEGORY, SUB_CATEGORY } from "@/app/category.constant";
import useCategorySelect from "@/store/useCategorySelect";
import type { ChangeEvent } from "react";

export default function CategorySelect() {
  const { mainCategory, setMainCategory, setSubCategory } = useCategorySelect();

  const onChangeMain = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
    setMainCategory(value as TMainSignType | undefined);
  };

  const onChangeSub = ({ target: { value } }: ChangeEvent<HTMLSelectElement>) => {
    if (value === "카테고리를 선택해주세요") {
      setSubCategory(undefined);
      return;
    }

    setSubCategory(value as TSubSignType | undefined);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-10">
        {MAIN_CATEGORY.map((category) => (
          <label htmlFor={category.id} key={category.id} className="flex items-center gap-1">
            <input
              id={category.id}
              value={category.id}
              onChange={(event) => onChangeMain(event)}
              name="board"
              type="radio"
            />
            {category.label}
          </label>
        ))}
      </div>
      <select name="subCategory" defaultValue={undefined} onChange={(event) => onChangeSub(event)}>
        {!mainCategory && <option>카테고리를 선택해주세요</option>}
        {!!mainCategory && (
          <>
            <option>카테고리를 선택해주세요</option>
            {SUB_CATEGORY[mainCategory].map((category) => (
              <option key={category.id} value={category.id}>
                {category.label}
              </option>
            ))}
          </>
        )}
      </select>
    </div>
  );
}
