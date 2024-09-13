import { ABOUT_CONTENT } from "@/app/about/content";
import AboutContents from "@/components/about/AboutContent";
import PageTitle from "@/components/shared/PageTitle";

export default function Page() {
  return (
    <div className="layout contents-center mt-[100px] select-none flex-col">
      <PageTitle title="about" />
      <ul className="flex flex-col gap-[5.4vw]">
        {ABOUT_CONTENT.map((item, index) => (
          <AboutContents key={item.label} item={item} index={index} />
        ))}
      </ul>
    </div>
  );
}
