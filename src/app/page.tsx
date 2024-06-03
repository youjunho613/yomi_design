import MainPostList from "@/components/home/MainPostList";
import MainVisual from "@/components/home/MainVisual";

export default function Home() {
  return (
    <div className="responsive-layout my-7 flex  flex-col items-center justify-start gap-[18px]">
      <MainVisual />
      <MainPostList />
    </div>
  );
}
