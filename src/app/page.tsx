import MainPostList from "@/components/home/MainPostList";
import MainVisual from "@/components/home/MainVisual";

export default function Home() {
  return (
    <div className="flex flex-col items-center gap-16">
      <MainVisual />
      <MainPostList />
    </div>
  );
}
