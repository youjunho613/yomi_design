import { COMPANY } from "@/app/company-info";
import IntroduceText from "@/components/home/IntroduceText";
import LinkButtons from "@/components/home/LinkButtons";
import MainAnimation from "@/components/home/MainAnimation";
import MainPostList from "@/components/home/MainPostList";

export default function Home() {
  return (
    <div>
      <h1 className="hidden">{COMPANY.name_em}</h1>
      <MainAnimation />
      <div className="divider-pattern" />
      <section className="layout flex w-screen flex-col justify-between bg-white py-[10%] xl:py-[8%]">
        <IntroduceText />
        <LinkButtons />
        <MainPostList />
      </section>
      <div className="divider-pattern-reverse" />
    </div>
  );
}
