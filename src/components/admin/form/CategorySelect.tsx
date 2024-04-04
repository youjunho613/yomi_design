import { MAIN_CATEGORY } from "@/app/category.constant";
import useSelect from "@/hook/useSelect";

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
      <select name="subCategory" onChange={(event) => onChangeMain(event)}>
        {<option value={undefined}>카테고리를 선택해주세요</option>}
      </select>
    </div>
  );
}
