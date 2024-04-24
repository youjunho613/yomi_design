import Image from "next/image";

export default function Info() {
  return (
    <div className="contents-center w-1/2 flex-col gap-2.5 text-sm">
      <Image src="/main_logo.svg" alt="로고 이미지" width={300} height={300} />
    </div>
  );
}
