import usePost from "@/service/post/mutations";
import type { Tables } from "@/supabase/type";
import type { UseFormReturn } from "react-hook-form";
import { toast } from "react-toastify";
import type { IToggleState } from "./PostManage";

interface IProps {
  post: Tables<"board">;
  togglePhotoModifyHandler: (isOpen: boolean) => void;
  onChangeCategory: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  modifyTarget: IToggleState["modifyPostId"];
  category: IToggleState["selectedCategory"];
  reactForm: UseFormReturn<IModifyForm, any, undefined>;
}

export interface IModifyForm {
  title: string;
  address: string;
  mainCategory: string;
  subCategory: string;
}

export default function PostEditForm(props: IProps) {
  const { post, togglePhotoModifyHandler, onChangeCategory, modifyTarget, category, reactForm } = props;
  const { modifyPostMutation } = usePost();

  const postModifyHandler = (data: IModifyForm) => {
    if (!modifyTarget) return;

    modifyPostMutation.mutate({ id: modifyTarget, request: data });
    toast.success(`수정되었습니다.`);
  };

  return (
    <form
      onSubmit={reactForm.handleSubmit(postModifyHandler)}
      className="flex -translate-y-2 flex-col items-start justify-center border-[3px] border-black bg-sub p-2 text-main"
    >
      <p className="flex w-full items-center justify-between">
        게시물 ID :<span>{post.id}</span>
      </p>
      <label htmlFor="title">
        제목 :
        <input type="text" id="title" className="input" defaultValue={post.title} {...reactForm.register("title")} />
      </label>
      <label htmlFor="address">
        주소 :
        <input
          type="text"
          id="address"
          className="input"
          defaultValue={post.address}
          {...reactForm.register("address")}
        />
      </label>
      {/* <label htmlFor="mainCategory" className="w-full">
        대분류 :
        <select
          id="mainCategory"
          className="mb-2 w-full text-black"
          defaultValue={post.mainCategory}
          {...reactForm.register("mainCategory", { onChange: onChangeCategory })}
        >
          {MAIN_CATEGORY.map((category) => (
            <option key={category.id} value={category.id}>
              {category.label}
            </option>
          ))}
        </select>
      </label>
      <label htmlFor="subCategory" className="w-full">
        소분류 :
        <select
          id="subCategory"
          className="mb-2 w-full text-black"
          defaultValue={post.subCategory}
          {...reactForm.register("subCategory")}
        >
          <option value={undefined}>선택하세요.</option>
          {SUB_CATEGORY[category].map((category) => (
            <option key={category.id} value={category.id}>
              {category.label}
            </option>
          ))}
        </select>
      </label> */}
      <button
        type="button"
        className="basic-button mt-2 w-full self-center rounded-xl bg-main px-4 py-2 font-bold text-sub"
        onClick={() => togglePhotoModifyHandler(true)}
      >
        사진 수정
      </button>
      <button
        type="submit"
        className="basic-button mt-2 w-full self-center rounded-xl bg-main px-4 py-2 font-bold text-sub"
      >
        수정
      </button>
    </form>
  );
}
