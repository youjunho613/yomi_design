interface IProps {
  isOpen: boolean;
  openToggle: () => void;
}
export default function HamburgerButton({ isOpen, openToggle }: IProps) {
  return (
    <button className="hamburger-button" onClick={openToggle}>
      <span className={`${isOpen && "translate-y-1.5 rotate-45"}`} />
      <span className={`${isOpen && "scale-x-0"} transition`} />
      <span className={`${isOpen && "-translate-y-1.5 -rotate-45"}`} />
    </button>
  );
}
