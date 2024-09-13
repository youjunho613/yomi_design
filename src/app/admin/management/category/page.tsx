"use client";

import useCategory from "@/service/category/mutations";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

// @TODO CRUD

interface IIsOpen {
  create: boolean;
  indexModify: boolean;
}

interface ICategoryName {
  kor_name: string;
  eng_name: string;
}

const initialIsOpen = { create: false, indexModify: false };

const initialCategoryName = { kor_name: "", eng_name: "" };

export default function Page() {
  const { fetchCategory, createCategoryMutation } = useCategory();
  const [isOpen, setIsOpen] = useState<IIsOpen>(initialIsOpen);
  const { register, reset, handleSubmit } = useForm<ICategoryName>();

  const { data: categoryList, error } = fetchCategory;

  const handleOpen = (target: keyof IIsOpen) => {
    setIsOpen({ ...initialIsOpen, [target]: !isOpen[target] });
  };

  const modifyCategory = () => {
    // @TODO
  };

  const createCategory = (categoryName: ICategoryName) => {
    if (!categoryList) return toast.error("카테고리를 불러오는데 실패하였습니다.");
    if (!categoryName.kor_name || !categoryName.eng_name) return toast.error("카테고리명을 입력해주세요.");
    if (categoryList.some((category) => category.kor_name === categoryName.kor_name)) {
      toast.error("이미 존재하는 카테고리 한글명입니다.");
      return;
    }
    if (categoryList.some((category) => category.eng_name === categoryName.eng_name)) {
      toast.error("이미 존재하는 카테고리 영문명입니다.");
      return;
    }

    createCategoryMutation.mutate(categoryName);
    reset();
    toast.success("카테고리가 추가되었습니다.");
  };

  return (
    <div>
      <fieldset className="flex w-full flex-col content-center gap-10 border border-black p-10">
        <legend>카테고리 수정</legend>
        <div className="flex gap-10">
          <input
            type="button"
            value={isOpen.create ? "닫기" : "카테고리 추가"}
            className="click-button flex-1 border-black bg-white"
            onClick={() => {
              handleOpen("create");
            }}
          />
          <input
            type="button"
            value={isOpen.indexModify ? "닫기" : "카테고리 순서 변경"}
            className="click-button flex-1 border-black bg-white"
            onClick={() => {
              handleOpen("indexModify");
            }}
          />
        </div>
        {isOpen.create && (
          <form className="flex flex-col gap-10 px-5" onSubmit={handleSubmit(createCategory)}>
            <div className="flex gap-10">
              <input
                type="text"
                placeholder="카테고리 한글명"
                style={{ imeMode: "active" }}
                className="flex-1 border border-gray001 px-4 py-1 text-sm focus:bg-blue-100"
                {...register("kor_name")}
              />
              <input
                type="text"
                placeholder="카테고리 영문명"
                style={{ imeMode: "disabled" }}
                className="flex-1 border border-gray001 px-4 py-1 text-sm focus:bg-blue-100"
                {...register("eng_name")}
              />
            </div>
            <input type="submit" value={"추가"} className="click-button border-black bg-white" />
          </form>
        )}
        {isOpen.indexModify && (
          <div>
            <input
              type="button"
              value={"저장"}
              className="click-button border-black bg-white"
              onClick={modifyCategory}
            />
          </div>
        )}
      </fieldset>
      <table className="flex w-full flex-col p-5">
        <thead>
          <tr className="flex w-full items-center border-b border-slate-200 px-4 py-2 text-center hover:bg-slate-200">
            <th className="w-1/12">순서</th>
            <th className="flex-1">카테고리 한글명</th>
            <th className="flex-1">카테고리 영문명</th>
          </tr>
        </thead>

        <tbody>
          {categoryList?.map((item) => (
            <tr
              key={item.id}
              className="flex w-full items-center border-b border-slate-400 px-4 py-2 text-center hover:bg-slate-400"
            >
              <td className="w-1/12">{item.index}</td>
              <td className="flex-1">{item.kor_name}</td>
              <td className="flex-1">{item.eng_name}</td>
            </tr>
          ))}
        </tbody>

        <tfoot>
          <tr>
            <td colSpan={3}>{error && <p>{error.message}</p>}</td>
          </tr>
        </tfoot>
      </table>
      <ul>{categoryList?.map((item) => <li key={item.id}></li>)}</ul>
    </div>
  );
}
