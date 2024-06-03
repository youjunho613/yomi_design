import Image from "next/image";

export default function MainVisual() {
  return (
    <div className="contents-between w-full flex-col gap-[14px] md:flex-row-reverse md:items-end">
      <Image width={353} height={235} src="/home-logo.png" alt="로고" className="w-4/6 max-w-[353px] md:w-[36.8%]" />
      <div className="flex flex-col justify-center gap-[16px] md:w-[60.4%]">
        <Image
          width={530}
          height={143}
          src="/home-decs.png"
          alt="아이덴티티와 디자인을 연결하다"
          className="w-full max-w-[530px]"
        />
      </div>
    </div>
  );
}
