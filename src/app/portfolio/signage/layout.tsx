interface IProps {
  children: React.ReactNode;
}

export default function Layout({ children }: IProps) {
  return <div className="layout contents-center mt-[100px] flex-col">{children}</div>;
}
