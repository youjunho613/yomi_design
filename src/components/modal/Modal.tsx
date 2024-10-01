import ReactDOM from "react-dom";

import type { ReactNode } from "react";

interface IProps {
  isOpen: boolean;
  openToggle: () => void;
  children: ReactNode;
}

export default function Modal({ isOpen, openToggle, children }: IProps) {
  if (isOpen) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "auto";
  }

  return ReactDOM.createPortal(
    <>
      <div className={`${isOpen ? "block" : "hidden"} modal-overlay`} onClick={openToggle}></div>
      <div className={`${isOpen ? "translate-x-0" : "translate-x-full"} modal-inner`}>{children}</div>
    </>,
    document.getElementById("modal-root") as HTMLElement,
  );
}
