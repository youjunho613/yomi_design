import { MAIN_CATEGORY, SUB_CATEGORY, TMainSignType } from "@/app/category.constant";

interface IProps {
  mainCategory: string;
  subCategory: string;
}

export default function CategoryKor({ mainCategory, subCategory }: IProps) {
  const currentMainCategory = SUB_CATEGORY[mainCategory as TMainSignType];
  const mainCategoryLabel = MAIN_CATEGORY.find(({ id }) => id === mainCategory)?.label;
  const subCategoryLabel = currentMainCategory.find(({ id }) => id === subCategory)?.label;

  return {
    mainCategory: mainCategoryLabel,
    subCategory: subCategoryLabel,
    detail: `${mainCategoryLabel} > ${subCategoryLabel}`,
  };
}
