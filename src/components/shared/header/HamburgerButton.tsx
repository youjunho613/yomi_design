interface IProps {
  isOpen: boolean;
  openToggle: () => void;
  className?: string;
}
export default function HamburgerButton({ isOpen, openToggle, className }: IProps) {
  return (
    <button className={`${className} contents-center group flex flex-col gap-2`} onClick={openToggle}>
      <span
        className={`h-[2px] w-[28px] rounded-full bg-black duration-200 ${isOpen && "translate-y-[10px] rotate-45"}`}
      />
      <span className={`h-[2px] w-[28px] rounded-full bg-black transition duration-700 ${isOpen && "scale-x-0"}`} />
      <span
        className={`h-[2px] w-[28px] rounded-full bg-black duration-200 ${isOpen && "-translate-y-[10px] -rotate-45"}`}
      />
    </button>
  );
}
