import Image from "next/image";
import { docs } from "./content";

function page() {
  return (
    <div className="mt-7 flex items-start justify-around gap-10 px-6">
      <div className="flex w-full flex-col gap-7 align-baseline">
        <Image src="/introduce-title.png" width={182} height={27} alt="요미디자인은?" />
        <div className="break-keep leading-6">
          <p>브랜드의 아이덴티티를 디자인과 연결하며,</p>
          <p className="mb-6">다양한 분야의 사인물을 제작 및 시공까지 한 번에 도와드리는 전문적인 기업입니다.</p>
          <p>고객님의 브랜드를 위해 저희는 전문 디자이너가 디자인하며,</p>
          <p className="mb-6">본사 소속 전문 시공팀이 직접 제작하고 시공해드립니다.</p>
          <p className="mb-6">
            다양한 경험과 노하우를 바탕으로 아이덴티티에 가장 적합한 사인물을 제안해 드릴 것을 약속드립니다.
          </p>
        </div>
        <div className="my-8 flex flex-col gap-7 lg:flex-row">
          {docs.map((doc) => (
            <div key={doc.name} className="contents-center flex-col gap-2.5">
              <Image src={doc.url} width={175} height={250} alt={doc.name} />
              <p className="text-sm">{doc.name}</p>
            </div>
          ))}
        </div>
        <div className="flex w-full flex-col gap-10">
          <Image src="/introduce-step.png" width={573} height={438} alt="진행방법" />
        </div>
      </div>
      <Image
        src="/introduce-line-art.png"
        width={251}
        height={915}
        className="hidden -translate-y-7 md:block"
        alt="deco"
      />
    </div>
  );
}

export default page;
