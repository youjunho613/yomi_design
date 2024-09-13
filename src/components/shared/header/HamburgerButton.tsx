interface IProps {
  isOpen: boolean;
  openToggle: () => void;
  className?: string;
}
export default function HamburgerButton({ isOpen, openToggle, className }: IProps) {
  return (
    <button className={`${className} contents-center group flex flex-col gap-1 xl:gap-2`} onClick={openToggle}>
      <span
        className={`h-[2px] w-[19px] rounded-full bg-black duration-200 xl:h-1 xl:w-8 ${isOpen && "translate-y-[6px] rotate-45 xl:translate-y-3"}`}
      />
      <span
        className={`h-[2px] w-[19px] rounded-full bg-black transition duration-700 xl:h-1 xl:w-8 ${isOpen && "scale-x-0"}`}
      />
      <span
        className={`h-[2px] w-[19px] rounded-full bg-black duration-200 xl:h-1 xl:w-8 ${isOpen && "-translate-y-[6px] -rotate-45 xl:-translate-y-3"}`}
      />
    </button>
  );
}
