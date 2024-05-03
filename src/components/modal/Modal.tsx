import ReactDOM from "react-dom";

import type { ReactNode } from "react";

interface IProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  className?: {
    overlay: string;
    modal: string;
  };
}

export default function Modal({ open, onClose, children, className }: IProps) {
  if (open) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "auto";
  }

  return ReactDOM.createPortal(
    <>
      <div
        className={`${className?.overlay} ${open ? "modal-overlay-open" : "modal-overlay-close"} modal-overlay`}
        onClick={onClose}
      ></div>
      <div className={`${className?.modal} ${open ? "modal-open" : "modal-close"} modal`}>
        {children}
        <button className="close-button" onClick={onClose}>
          <span id="closeButton" />
        </button>
      </div>
    </>,
    document.getElementById("modal-root") as HTMLElement,
  );
}
