import { Tables, TablesUpdate } from "@/supabase/type";
import { create } from "zustand";

interface IIsOpen {
  postIsOpen: number | null;
  modifyContent: TablesUpdate<"board"> | null;
  onChangeEditMode: (id: number | null) => void;
  setInitialContent: (content: Tables<"board"> | null) => void;
  reset: () => void;
  onChangeModifyContent: ({ key, value }: { key: keyof Tables<"board">; value: string }) => void;
}

const usePostModify = create<IIsOpen>((set) => ({
  postIsOpen: null,
  modifyContent: null,
  onChangeEditMode: (id) => {
    set((state: IIsOpen) => ({
      ...state,
      postIsOpen: id,
    }));
  },
  setInitialContent: (content) => {
    set((state: IIsOpen) => ({
      ...state,
      modifyContent: content,
    }));
  },
  reset: () => {
    set((state: IIsOpen) => ({
      ...state,
      modifyContent: null,
      postIsOpen: null,
    }));
  },
  onChangeModifyContent: ({ key, value }) => {
    set((state: IIsOpen) => {
      if (!state.modifyContent) return state;
      return {
        ...state,
        modifyContent: {
          ...state.modifyContent,
          [key]: value,
        },
      };
    });
  },
}));

export default usePostModify;
