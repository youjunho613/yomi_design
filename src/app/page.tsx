import { COMPANY } from "@/app/company-info";
import IntroduceText from "@/components/home/IntroduceText";
import LinkButtons from "@/components/home/LinkButtons";
import MainAnimation from "@/components/home/MainAnimation";
import MainPostList from "@/components/home/MainPostList";
// import MainVisual from "@/components/home/MainVisual";

export default function Home() {
  return (
    <div>
      <h1 className="hidden">{COMPANY.name_em}</h1>
      <MainAnimation />
      {/* <MainVisual /> */}
      <div className="divider-pattern" />
      <section className="screen layout flex flex-col justify-between bg-white py-[4%]">
        <IntroduceText />
        <LinkButtons />
        <MainPostList />
      </section>
      <div className="divider-pattern" />
    </div>
  );
}
