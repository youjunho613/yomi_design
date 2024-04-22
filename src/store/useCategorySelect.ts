import { TMainSignType, TSubSignType } from "@/app/category.constant";
import { create } from "zustand";

interface ICategorySelect {
  mainCategory: TMainSignType | undefined;
  subCategory: TSubSignType | undefined;
  setMainCategory: (mainCategory: TMainSignType | undefined) => void;
  setSubCategory: (subCategory: TSubSignType | undefined) => void;
  resetCategory: () => void;
}

const useCategorySelect = create<ICategorySelect>((set) => ({
  mainCategory: undefined,
  subCategory: undefined,
  setMainCategory: (mainCategory) => {
    set((state: ICategorySelect) => ({ ...state, mainCategory }));
  },
  setSubCategory: (subCategory) => {
    set((state: ICategorySelect) => ({ ...state, subCategory }));
  },
  resetCategory: () => {
    set((state: ICategorySelect) => ({
      ...state,
      mainCategory: undefined,
      subCategory: undefined,
    }));
  },
}));

export default useCategorySelect;
