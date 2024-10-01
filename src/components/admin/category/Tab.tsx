import type { IIsOpen } from "@/app/admin/category/page";

interface IProps {
  isOpen: IIsOpen;
  handleOpen: (target: keyof IIsOpen) => void;
}

export default function Tab({ isOpen, handleOpen }: IProps) {
  return (
    <div className="flex w-full gap-2 p-2 xl:gap-10">
      <input
        type="button"
        value={isOpen.create ? "닫기" : "카테고리 추가"}
        className="click-button flex-1 border-black bg-white"
        onClick={() => {
          handleOpen("create");
        }}
      />
      <input
        type="button"
        value={isOpen.indexModify ? "닫기" : "카테고리 순서 변경"}
        className="click-button flex-1 border-black bg-white"
        onClick={() => {
          handleOpen("indexModify");
        }}
      />
    </div>
  );
}
