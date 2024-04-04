import { Tables } from "@/../lib/supabase/schema";
import { create } from "zustand";

interface IPostEdit {
  editBoard: Tables<"board", "Row">[] | null;
  setEditBoard: (postList: Tables<"board", "Row">[] | null) => void;
  onChange: (name: keyof Tables<"board", "Row">, value: any) => void;
  sequenceChangeHandler: (index: number, postId: number, target: number) => void;
  deleteOnePhoto: (index: number, postId: number) => void;
}

const usePostEdit = create<IPostEdit>((set) => ({
  editBoard: null,
  setEditBoard: (postList) => {
    set(() => ({ editBoard: postList }));
  },
  onChange: (name, value) => {
    set(({ editBoard }) => {
      if (!editBoard) return {};
      return { ...editBoard, [name]: value };
    });
  },
  sequenceChangeHandler: (postId, index, target) => {
    set(({ editBoard }) => {
      if (!editBoard) return {};
      const changedPhoto = editBoard.find((post) => post.id === postId)?.photoUrl;
      if (!changedPhoto) return {};
      [changedPhoto[index], changedPhoto[target]] = [changedPhoto[target], changedPhoto[index]];
      return { ...editBoard, photoUrl: changedPhoto };
    });
  },
  deleteOnePhoto: (postId, index) => {
    set(({ editBoard }) => {
      if (!editBoard) return {};
      const currentPost = editBoard.find((post) => post.id === postId);
      if (!currentPost) return {};
      return { ...editBoard, photoUrl: currentPost.photoUrl.splice(index, 1) };
    });
  },
}));

export default usePostEdit;
