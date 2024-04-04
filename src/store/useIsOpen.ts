import { create } from "zustand";
import { Tables } from "@/../lib/supabase/schema";

interface IIsOpen {
  postIsOpen: Record<number, { edit: boolean; photo: boolean }>;
  changeEditMode: (id: number, target: "edit" | "photo") => void;
  setInitialIsOpen: (postList: Tables<"board", "Row">[] | null) => void;
}

const useIsOpen = create<IIsOpen>((set) => ({
  postIsOpen: {},
  changeEditMode: (id, target) => {
    set(({ postIsOpen: prev }) => ({
      postIsOpen: { ...prev, [id]: { ...prev[id], [target]: !prev[id][target] } },
    }));
  },
  setInitialIsOpen: (postList) => {
    if (!postList) return;
    postList.forEach((post) => {
      set(({ postIsOpen: prev }) => ({ postIsOpen: { ...prev, [post.id]: { edit: false, photo: false } } }));
    });
  },
}));

export default useIsOpen;
