"use client";

import { useState } from "react";

interface IProps {
  error: string;
}

export default function Error({ error }: IProps) {
  const [isOpened, setIsOpened] = useState(false);
  const onClickHandler = () => {
    setIsOpened(!isOpened);
  };
  return (
    <div className="contents-center w-full flex-col">
      <p className="font-bold lg:text-xl">오류가 발생하였습니다. 관리자에게 문의하세요.</p>
      <button onClick={onClickHandler}>자세히 보기</button>
      {isOpened && <p className="w-full select-none bg-black text-[#149414]">error message : {error}</p>}
    </div>
  );
}
