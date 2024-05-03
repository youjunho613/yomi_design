interface IProps {
  isOpen: boolean;
  openToggle: () => void;
}
export default function HamburgerButton({ isOpen, openToggle }: IProps) {
  return (
    <button className="contents-center group flex-col gap-1 sm:hidden" onClick={openToggle}>
      <span className={`h-0.5 w-5 rounded-full bg-black duration-200 ${isOpen && "translate-y-1.5 rotate-45"}`} />
      <span className={`h-0.5 w-5 rounded-full bg-black transition duration-200 ${isOpen && "scale-x-0"}`} />
      <span className={`h-0.5 w-5 rounded-full bg-black duration-200 ${isOpen && "-translate-y-1.5 -rotate-45"}`} />
    </button>
  );
}
