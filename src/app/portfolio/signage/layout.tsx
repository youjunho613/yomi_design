interface IProps {
  children: React.ReactNode;
}

export default function Layout({ children }: IProps) {
  return <div className="layout contents-center mt-[15vw] flex-col md:mt-[100px]">{children}</div>;
}
