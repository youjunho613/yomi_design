import { create } from "zustand";

interface ICategorySelect {
  category: string | undefined;
  setCategory: (category: string) => void;
  resetCategory: () => void;
}

const useCategorySelect = create<ICategorySelect>((set) => ({
  category: undefined,
  setCategory: (category) => {
    set((state: ICategorySelect) => ({ ...state, category }));
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
