import type { TImageToggle } from "./Estimate";

interface IProps {
  text: string;
  toggle: TImageToggle;
  isOpen: boolean;
  openChangeHandler: (target: TImageToggle) => void;
}

export default function ImageToggleButton({ text, toggle, isOpen, openChangeHandler }: IProps) {
  return (
    <button
      className="w-full bg-sub px-3 py-2 text-white"
      onClick={() => {
        openChangeHandler(toggle);
      }}
    >
      {text} {isOpen ? "접기" : "펼치기"}
    </button>
  );
}
