"use client";

import EstimateList from "@/components/admin/estimate/EstimateList";
import Form from "@/components/admin/form/Form";
import Management from "@/components/admin/management/Management";
import Tab from "@/components/admin/Tab";
import { useState } from "react";

export type TTab = "estimate" | "management" | "form";

export default function Admin() {
  const [currentTab, setCurrentTab] = useState<TTab>("estimate");

  const tabChangeHandler = (target: TTab) => {
    setCurrentTab(target);
  };

  return (
    <div className="flex flex-col mx-10">
      <Tab tabChangeHandler={tabChangeHandler} />
      {currentTab === "estimate" && <EstimateList />}
      {currentTab === "management" && <Management />}
      {currentTab === "form" && <Form />}
    </div>
  );
}
