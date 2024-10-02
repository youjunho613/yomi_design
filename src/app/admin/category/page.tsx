"use client";

import ChangeIndexTable from "@/components/admin/category/ChangeIndexTable";
import CreateForm from "@/components/admin/category/CreateForm";
import Tab from "@/components/admin/category/Tab";
import Table from "@/components/admin/category/Table";
import useCategory from "@/service/category/mutations";
import { TablesUpdate } from "@/supabase/type";
import { useState } from "react";

export interface IIsOpen {
  create: boolean;
  indexModify: boolean;
}

const initialIsOpen = { create: false, indexModify: false };

export default function Page() {
  const { fetchCategory, modifyCategoryMutation } = useCategory();
  const { data: categoryList } = fetchCategory;
  const [isOpen, setIsOpen] = useState<IIsOpen>(initialIsOpen);

  const handleOpen = (target: keyof IIsOpen) => {
    setIsOpen({ ...initialIsOpen, [target]: !isOpen[target] });
  };

  const modifyCategory = (data: TablesUpdate<"category">[] | null | undefined) => {
    if (!data) return;
    data.forEach((item) => {
      modifyCategoryMutation.mutate(item);
    });
  };

  return (
    <div>
      <fieldset className="flex w-full flex-col content-center border border-black xl:gap-10 xl:p-10">
        <legend>카테고리 수정</legend>
        <Tab handleOpen={handleOpen} isOpen={isOpen} />
        {isOpen.create && <CreateForm categoryList={categoryList} />}
        {isOpen.indexModify && <ChangeIndexTable categoryList={categoryList} modifyCategory={modifyCategory} />}
      </fieldset>
      <Table categoryList={categoryList} />
    </div>
  );
}
