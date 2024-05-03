import Image from "next/image";
import { docs } from "./content";

function page() {
  return (
    <div className="mt-7 flex items-start justify-around gap-10 pl-10">
      <div className="flex w-full flex-col gap-7 align-baseline">
        <Image src="/introduce-title.png" width={182} height={27} alt="요미디자인은?" />
        <div className="break-keep leading-6">
          <p>
            [아이덴티티와 디자인을 연결하다]라는 슬로건을 가지고 시작한 저희 요미디자인은 다양한 분야의 사인물과
            인쇄물을 디자인부터 제작 및 시공까지 도와드리는 전문적인 기업입니다.
          </p>
          <p>
            요미디자인은 20 - 30대 직원들로 구성되어 있으며, 트렌디한 디자인은 물론 고품질을 바탕으로 꼼꼼하고
            책임감있게 제작하고 시공합니다.
          </p>
          <p>
            브랜드를 기억하는 것에 있어서 큰 영향을 주며, 정체성을 가장 잘 나타낼 수 있는 로고부터 매장의 얼굴인
            간판까지 함께 고민해드리고 만들어드리겠습니다.
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
