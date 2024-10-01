import useCategory from "@/service/category/mutations";
import type { Tables } from "@/supabase/type";
import { useState } from "react";
import { toast } from "react-toastify";

interface IProps {
  categoryList: Tables<"category">[] | null | undefined;
}

interface IIsOpen {
  modify: number | undefined;
  delete: number | undefined;
}

interface ICategoryInput {
  kor_name: string;
  eng_name: string;
}

const initialIsOpen = { modify: undefined, delete: undefined };
const initialCategory = { kor_name: "", eng_name: "" };

export default function Table({ categoryList }: IProps) {
  const { modifyCategoryMutation, deleteCategoryMutation } = useCategory();
  const [isOpen, setIsOpen] = useState<IIsOpen>(initialIsOpen);
  const [categoryInput, setCategoryInput] = useState<ICategoryInput>(initialCategory);

  const handleModify = (id: number, target: keyof IIsOpen) => {
    if (isOpen.modify === id) {
      setIsOpen(initialIsOpen);
      setCategoryInput(initialCategory);
      return;
    }

    if (isOpen.delete === id) {
      setIsOpen(initialIsOpen);
      return;
    }
    setIsOpen({ ...isOpen, [target]: id });
  };

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCategoryInput({ ...categoryInput, [name]: value });
  };

  const handleModifySubmit = (id: number) => {
    if (!categoryInput.kor_name || !categoryInput.eng_name) toast.error("값을 입력해주세요.");
    modifyCategoryMutation.mutate({ id, ...categoryInput });
    setIsOpen(initialIsOpen);
    setCategoryInput(initialCategory);
    toast.success("수정되었습니다.");
  };

  const handleDelete = (id: number) => {
    deleteCategoryMutation.mutate(id);
    setIsOpen(initialIsOpen);
    toast.success("삭제되었습니다.");
  };

  return (
    <table className="flex w-full flex-col p-2 xl:p-5">
      <thead>
        <div className="flex flex-col gap-2 border-b border-slate-200 px-4 py-2 text-center hover:bg-slate-200 xl:flex-row">
          <tr className="flex w-full items-center">
            <th className="w-2/12">순서</th>
            <th className="flex-1">한글명</th>
            <th className="flex-1">영문명</th>
          </tr>
          <div className="flex justify-around text-nowrap px-[15px] font-bold">수정·삭제</div>
        </div>
      </thead>

      <tbody>
        {categoryList?.map((item) => (
          <div
            key={item.id}
            className="flex flex-col gap-2 border-b border-slate-400 px-4 py-2 text-center hover:bg-slate-400 xl:flex-row"
          >
            <tr className="flex w-full items-center">
              <td className="w-2/12">{item.index}</td>
              <td className="flex-1">
                {isOpen.modify === item.id ? (
                  <input
                    type="text"
                    className="w-full bg-slate-200 px-2 text-center xl:w-1/2"
                    name="kor_name"
                    placeholder={item.kor_name ?? ""}
                    onChange={(e) => onChangeHandler(e)}
                  />
                ) : (
                  item.kor_name
                )}
              </td>
              <td className="flex-1">
                {isOpen.modify === item.id ? (
                  <input
                    type="text"
                    className="w-full bg-slate-200 px-2 text-center xl:w-1/2"
                    name="eng_name"
                    placeholder={item.eng_name ?? ""}
                    onChange={(e) => onChangeHandler(e)}
                  />
                ) : (
                  item.eng_name
                )}
              </td>
            </tr>
            <div className="flex justify-around gap-2">
              {isOpen.modify === item.id ? (
                <input
                  type="button"
                  value="닫기"
                  className="click-button border-black bg-red-200"
                  onClick={() => handleModify(item.id, "modify")}
                />
              ) : isOpen.delete === item.id ? (
                <input
                  type="button"
                  value="삭제"
                  className="click-button border-black bg-green-200"
                  onClick={() => handleDelete(item.id)}
                />
              ) : (
                <input
                  type="button"
                  value="수정"
                  className="click-button border-black bg-white"
                  onClick={() => handleModify(item.id, "modify")}
                />
              )}
              {isOpen.modify === item.id ? (
                <input
                  type="button"
                  value="수정"
                  className="click-button border-black bg-green-200"
                  onClick={() => handleModifySubmit(item.id)}
                />
              ) : isOpen.delete === item.id ? (
                <input
                  type="button"
                  value="닫기"
                  className="click-button border-black bg-red-200"
                  onClick={() => handleModify(item.id, "delete")}
                />
              ) : (
                <input
                  type="button"
                  value="삭제"
                  className="click-button border-black bg-white"
                  onClick={() => handleModify(item.id, "delete")}
                />
              )}
            </div>
          </div>
        ))}
      </tbody>
    </table>
  );
}
