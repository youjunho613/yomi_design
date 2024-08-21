import Image from "next/image";

export default function Home() {
  return (
    <div className="">
      <div className="flex border border-black">
        <div className="flex flex-col">
          <Image src={"/example.jpg"} alt="" width={500} height={250} className="w-[55vw]" />
          <Image src={"/example.jpg"} alt="" width={500} height={250} className="w-[55vw]" />
          <Image src={"/example.jpg"} alt="" width={500} height={250} className="w-[55vw]" />
        </div>
        <div className="mx-auto w-fit">
          <div className="sticky top-1/3 mb-[30%] flex flex-col gap-10 px-4 text-3xl">
            <p>요미디자인은 디자인이 전부라고 생각하고 있습니다.</p>
            <p>디자인부터 제작·시공까지 직접합니다.</p>
            <button>더보기 &gt;</button>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center gap-10 border border-black p-4">
        <ul className="flex gap-2">
          <li>
            <Image src={"/example.jpg"} alt="" width={500} height={250} />
            <p>첫번째 단계</p>
          </li>
          <li>
            <Image src={"/example.jpg"} alt="" width={500} height={250} />
            <p>두번째 단계</p>
          </li>
          <li>
            <Image src={"/example.jpg"} alt="" width={500} height={250} />
            <p>세번째 단계</p>
          </li>
          <li>
            <Image src={"/example.jpg"} alt="" width={500} height={250} />
            <p>네번째 단계</p>
          </li>
        </ul>
        <button className="rounded-lg bg-sub px-4 py-3 text-main">문의하기</button>
      </div>
      <div className="flex flex-col border border-black p-4">
        <div className="flex gap-5">
          <h2>SIGNAGE</h2>
          <span>|</span>
          <p>디자인부터 제작 · 시공까지</p>
        </div>
        <div className="grid grid-flow-col-dense grid-cols-2">
          <Image src={"/example.jpg"} alt="123" width={1000} height={500} />
          <Image src={"/example.jpg"} alt="" width={500} height={250} />
          <Image src={"/example.jpg"} alt="" width={500} height={250} />
        </div>
      </div>
    </div>
  );
}
