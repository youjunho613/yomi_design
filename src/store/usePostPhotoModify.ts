import { Tables } from "@/supabase/type";
import { create } from "zustand";

type TBoard = Tables<"board">;

interface IPostEdit {
  photoIsOpen: number | null;
  TogglePhoto: (id: number | null) => void;
  photoModifyIsOpen: boolean;
  TogglePhotoModify: () => void;
  photoArray: string[] | null;
  reset: () => void;
  addPhoto: (photo: string) => void;
  setInitialPhoto: (photoArray: string[] | null) => void;
  sequenceChangeHandler: ({ index, target }: { index: number; target: number }) => void;

  editBoard: TBoard[] | null;
  setEditBoard: (postList: TBoard[] | null) => void;
  onChange: (id: number, name: keyof TBoard, value: any) => void;
  deleteOnePhoto: (index: number, postId: number) => void;
}

const usePostPhotoModify = create<IPostEdit>((set) => ({
  photoIsOpen: null,
  TogglePhoto: (id) => {
    set((state) => ({ ...state, photoIsOpen: id }));
  },
  photoModifyIsOpen: false,
  TogglePhotoModify: () => {
    set((state) => ({ ...state, photoModifyIsOpen: !state.photoModifyIsOpen }));
  },
  photoArray: null,
  setInitialPhoto: (photoArray) => {
    set((state) => ({ ...state, photoArray, initialPhoto: photoArray }));
  },
  reset: () => {
    set((state) => ({
      ...state,
      photoIsOpen: null,
      photoArray: null,
      initialPhoto: null,
    }));
  },
  addPhoto: (photo) => {
    set((state) => {
      if (!state.photoArray) return { ...state, photoArray: [photo] };
      return { ...state, photoArray: [...state.photoArray, photo] };
    });
  },
  sequenceChangeHandler: ({ index, target }) => {
    set((state) => {
      if (!state.photoArray) return state;
      const photoArray = state.photoArray;

      [photoArray[index], photoArray[target]] = [photoArray[target], photoArray[index]];
      return { ...state, photoArray };
    });
  },

  editBoard: null,
  setEditBoard: (postList) => {
    set((state) => ({ ...state, editBoard: postList }));
  },

  onChange: (id, name, value) => {
    set((state) => {
      const { editBoard } = state;
      if (!editBoard) return state;
      return {
        ...state,
        editBoard: {
          ...editBoard,
          [id]: { ...editBoard[id], [name]: value },
        },
      };
    });
  },

  deleteOnePhoto: (postId, index) => {
    set((state) => {
      const { editBoard } = state;
      if (!editBoard) return state;
      const currentPost = editBoard.find((post) => post.id === postId);
      if (!currentPost) return state;
      const photoUrl = currentPost.photoUrl.slice(index, 1);
      return {
        ...state,
        editBoard: {
          ...editBoard,
          photoUrl,
        },
      };
    });
  },
}));

export default usePostPhotoModify;
