import { type TMainSignType } from "@/app/category.constant";
import { STORAGE_URL } from "@/supabase/supabase";
import type { Tables } from "@/supabase/type";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import PhotoEdit from "./PhotoEdit";
import Post from "./Post";
import PostEditButtons from "./PostEditButtons";
import type { IModifyForm } from "./PostEditForm";
import PostEditForm from "./PostEditForm";

interface IProps {
  post: Tables<"board">;
}

export interface IToggleState {
  openPostId: Tables<"board">["id"] | undefined;
  modifyPostId: Tables<"board">["id"] | undefined;
  photoModifyIsOpen: boolean;
  selectedCategory: TMainSignType;
}

const initialState: IToggleState = {
  selectedCategory: "logo",
  modifyPostId: undefined,
  openPostId: undefined,
  photoModifyIsOpen: false,
};

export default function PostManage({ post }: IProps) {
  const [toggleState, setToggleState] = useState<IToggleState>(initialState);
  const reactForm = useForm<IModifyForm>();
  const isOpen = (id: IToggleState["openPostId"]) => toggleState.openPostId === id;
  const isModifyOpen = (id: IToggleState["modifyPostId"]) => toggleState.modifyPostId === id;

  const toggleModifyHandler = (postId: number) => {
    if (isOpen(postId)) {
      setToggleState({ ...toggleState, openPostId: undefined });
      return;
    }

    if (toggleState.openPostId === undefined) {
      setToggleState({ ...toggleState, openPostId: postId });
      return;
    }

    if (
      confirm(`수정 중인 게시물이 있습니다.
수정을 취소하고 다른 게시물을 열까요?`)
    ) {
      setToggleState({ ...toggleState, openPostId: postId });
    }
  };

  const togglePhotoModifyHandler = (isOpen: boolean) => {
    setToggleState({ ...toggleState, photoModifyIsOpen: isOpen });
  };

  const closeHandler = () => {
    setToggleState({ ...toggleState, openPostId: undefined, modifyPostId: undefined, photoModifyIsOpen: false });
    reactForm.reset();
  };

  const onChangeCategory = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setToggleState({ ...toggleState, selectedCategory: event.target.value as TMainSignType });
  };

  const initialCategory = ({ id, mainCategory }: Pick<Tables<"board">, "id" | "mainCategory">) => {
    setToggleState({ ...toggleState, modifyPostId: id, selectedCategory: mainCategory as TMainSignType });
  };

  return (
    <li className="w-[47.4%] max-w-[230px]">
      <button className="w-full" type="button" onClick={() => toggleModifyHandler(post.id)}>
        <div className="relative aspect-square w-full border-2 border-black">
          <Image
            src={`${STORAGE_URL}/post/${post.photoUrl[0]}`}
            alt="시공 사진"
            width={500}
            height={500}
            loading="eager"
            className="aspect-square w-full"
          />
        </div>
        {!isModifyOpen(post.id) && <Post post={post} />}
      </button>
      {isModifyOpen(post.id) &&
        (toggleState.photoModifyIsOpen ? (
          <PhotoEdit post={post} closeHandler={() => togglePhotoModifyHandler(true)} />
        ) : (
          <PostEditForm
            post={post}
            togglePhotoModifyHandler={togglePhotoModifyHandler}
            onChangeCategory={onChangeCategory}
            modifyTarget={toggleState.modifyPostId}
            category={toggleState.selectedCategory}
            reactForm={reactForm}
          />
        ))}
      {isOpen(post.id) && (
        <PostEditButtons
          post={post}
          closeHandler={closeHandler}
          modifyTarget={toggleState.modifyPostId}
          initialCategory={initialCategory}
        />
      )}
    </li>
  );
}
