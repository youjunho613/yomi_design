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
      <div
        className={`${isOpen ? "block" : "hidden"} fixed inset-0 z-40 max-h-screen overflow-y-auto overflow-x-hidden overscroll-contain`}
        onClick={openToggle}
      ></div>
      <div
        className={`${isOpen ? "translate-x-0" : "translate-x-full"} fixed right-0 top-0 z-40 mt-15 h-[calc(100vh-60px)] w-1/3 transform overflow-y-auto overflow-x-hidden overscroll-contain rounded-es-3xl bg-gray001 p-10 text-black shadow-md transition-transform duration-700 ease-in-out`}
      >
        {children}
        {/* <button className="close-button contents-center absolute right-1 top-1" onClick={onClose}>
          <span id="closeButton" className="before:after:absolute" />
        </button> */}
      </div>
    </>,
    document.getElementById("modal-root") as HTMLElement,
  );
}
