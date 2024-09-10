import Image from "next/image";

export default function IntroduceText() {
  return (
    <div className="contents-center flex-col">
      <Image src={"/home-logo.svg"} alt="logo" width={300} height={131} />
      <h2 className="text-[50px]">간판은? 요미디자인!</h2>
      <p className="text-[18px]">매장의 얼굴 = 간판, 디자인부터 제작, 시공까지 한 번에 요미디자인에서 진행해 보세요.</p>
    </div>
  );
}
