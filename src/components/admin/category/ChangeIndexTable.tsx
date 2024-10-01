import type { Tables, TablesUpdate } from "@/supabase/type";
import { useState } from "react";

interface IProps {
  categoryList: Tables<"category">[] | null | undefined;
  modifyCategory: (data: TablesUpdate<"category">[] | null | undefined) => void;
}
export default function ChangeIndexTable({ categoryList, modifyCategory }: IProps) {
  const [changeCategoryIndex, setChangeCategoryIndex] = useState(categoryList);

  const changeIndexFunc = (index1: number, index2: number) => {
    if (!changeCategoryIndex) return;
    const newIndexArray = [...changeCategoryIndex];
    const isValid = index1 >= 0 && index2 >= 0 && index1 < newIndexArray.length && index2 < newIndexArray.length;

    if (isValid) {
      newIndexArray[index1].index = index2 + 1;
      newIndexArray[index2].index = index1 + 1;
      newIndexArray.sort((a, b) => {
        if (!a.index || !b.index) return 0;
        if (a.index > b.index) return 1;
        if (a.index < b.index) return -1;
        return 0;
      });
      setChangeCategoryIndex(newIndexArray);
    }
  };

  const initialIndex = () => {
    setChangeCategoryIndex(categoryList);
  };

  return (
    <div className="contents-center flex-col p-2">
      <table className="flex w-full flex-col gap-2 p-2">
        <thead>
          <tr className="flex w-full items-center border-b border-slate-200 p-2 text-center hover:bg-slate-200">
            <th className="w-1/12">순서</th>
            <th className="flex-1">변경 전 업종</th>
            <th className="flex-1">업종</th>
            <th className="flex-1">변경</th>
          </tr>
        </thead>
        <tbody>
          {changeCategoryIndex?.map((item, index) => (
            <tr
              key={item.id}
              className="flex w-full items-center border-b border-slate-400 p-2 text-center hover:bg-slate-400"
            >
              <td className="w-1/12">{index + 1}</td>
              <td className="flex-1">{categoryList?.[index]?.kor_name}</td>
              <td className="flex-1">{item.kor_name}</td>
              <td className="flex flex-1 justify-center gap-2">
                <button
                  type="button"
                  disabled={index === 0}
                  id={String(item.id)}
                  value={"up"}
                  className="click-button border-black bg-white p-1 text-blue-400"
                  onClick={() => changeIndexFunc(index, index - 1)}
                >
                  ▲
                </button>
                <button
                  type="button"
                  disabled={index === changeCategoryIndex.length - 1}
                  id={String(item.id)}
                  value={"down"}
                  className="click-button border-black bg-white p-1 text-red-400"
                  onClick={() => changeIndexFunc(index, index + 1)}
                >
                  ▼
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex w-full items-center justify-around">
        <input
          type="button"
          value={"저장"}
          className="click-button border-black bg-green-200"
          onClick={() => modifyCategory(changeCategoryIndex)}
        />
        <input type="button" value={"초기화"} className="click-button border-black bg-red-200" onClick={initialIndex} />
      </div>
    </div>
  );
}
