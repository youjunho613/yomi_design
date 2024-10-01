import useCategory from "@/service/category/mutations";
import type { Tables } from "@/supabase/type";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

interface ICategoryName {
  kor_name: string;
  eng_name: string;
}

interface IProps {
  categoryList: Tables<"category">[] | null | undefined;
}

export default function CreateForm({ categoryList }: IProps) {
  const { createCategoryMutation } = useCategory();
  const { register, reset, handleSubmit } = useForm<ICategoryName>();

  const createCategory = (categoryName: ICategoryName) => {
    if (!categoryList) return toast.error("카테고리를 불러오는데 실패하였습니다.");
    if (!categoryName.kor_name || !categoryName.eng_name) return toast.error("카테고리명을 입력해주세요.");
    if (categoryList.some((category) => category.kor_name === categoryName.kor_name)) {
      toast.error("이미 존재하는 카테고리 한글명입니다.");
      return;
    }
    if (categoryList.some((category) => category.eng_name === categoryName.eng_name)) {
      toast.error("이미 존재하는 카테고리 영문명입니다.");
      return;
    }

    createCategoryMutation.mutate(categoryName);
    reset();
    toast.success("카테고리가 추가되었습니다.");
  };
  return (
    <form
      className="flex flex-col gap-2 border-t border-dashed border-black p-2 xl:gap-10 xl:p-5"
      onSubmit={handleSubmit(createCategory)}
    >
      <div className="flex flex-col gap-2 xl:flex-row xl:gap-10">
        <input
          type="text"
          placeholder="카테고리 한글명"
          style={{ imeMode: "active" }}
          className="flex-1 border border-gray001 px-4 py-1 text-sm focus:bg-blue-100"
          {...register("kor_name")}
        />
        <input
          type="text"
          placeholder="카테고리 영문명"
          style={{ imeMode: "disabled" }}
          className="flex-1 border border-gray001 px-4 py-1 text-sm focus:bg-blue-100"
          {...register("eng_name")}
        />
      </div>
      <input type="submit" value={"추가"} className="click-button border-black bg-white" />
    </form>
  );
}
