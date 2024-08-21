interface IProps {
  isOpen: boolean;
  openToggle: () => void;
}
export default function HamburgerButton({ isOpen, openToggle }: IProps) {
  return (
    <button className="contents-center group flex-col gap-2" onClick={openToggle}>
      <span className={`h-1 w-8 rounded-full bg-black duration-200 ${isOpen && "translate-y-3 rotate-45"}`} />
      <span className={`h-1 w-8 rounded-full bg-black transition duration-700 ${isOpen && "scale-x-0"}`} />
      <span className={`h-1 w-8 rounded-full bg-black duration-200 ${isOpen && "-translate-y-3 -rotate-45"}`} />
    </button>
  );
}
