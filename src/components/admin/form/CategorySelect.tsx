"use client";

import { useSignType } from "@/service/sign/mutations";
import useCategorySelect from "@/store/useCategorySelect";

import type { ChangeEvent } from "react";

export default function CategorySelect() {
  const { setCategory } = useCategorySelect();
  const { fetchSignType } = useSignType();
  const { data } = fetchSignType;

  const onChange = ({ target: { value } }: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
    setCategory(value);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-10">
        {data?.map((category) => (
          <label htmlFor={category.eng_name} key={category.id} className="flex items-center gap-1">
            <input
              id={category.eng_name}
              value={category.id}
              onChange={(event) => onChange(event)}
              name="post"
              type="radio"
            />
            {category.kor_name}
          </label>
        ))}
      </div>
      <select name="subCategory" defaultValue={undefined} onChange={(event) => onChange(event)}>
        <option disabled>카테고리를 선택해주세요</option>
        {data?.map((category) => (
          <option key={category.id} value={category.eng_name}>
            {category.kor_name}
          </option>
        ))}
      </select>
    </div>
  );
}
