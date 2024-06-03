import Image from "next/image";
import { docs } from "./content";

function page() {
  return (
    <div className="responsive-layout my-6 flex items-start justify-around gap-12">
      <div className="introduce-text flex flex-col align-baseline">
        <Image src="/introduce-title.png" width={120} height={27} alt="요미디자인은?" className="md:w-40" />
        <div className="mt-[18px]">
          <p>
            [아이덴티티와 디자인을 연결하다]라는 슬로건을 가지고 시작한 저희 요미디자인은 브랜드의 아이덴티티를 디자인과
            연결하여 다양한 분야의 사인물을 제작 및 시공까지 한 번에 도와드리는 전문가입니다.
          </p>
          <br />
          <p>
            직원들은 20 ~ 30대 청년들로 구성되어 있으며, 감각적이고 트렌디한 디자인은 물론 고품질을 바탕으로 꼼꼼하고
            책임감있게 제작하고 시공합니다.
          </p>
          <br />
          <p>
            고객님의 브랜드를 위해 저희는 시각디자인 전문 디자이너가 디자인하며, 본사 소속 전문 시공팀이 직접 제작하고
            시공해드립니다.
          </p>
          <br />
          <p>
            수년간 겪은 다양한 경험과 노하우를 바탕으로 브랜드 아이덴티티에 가장 적합한 사인물을 제안해 드릴 것을
            약속드립니다.
          </p>
          <br />
        </div>
        <div className="mt-5 flex gap-3 text-[8px]">
          {docs.map((doc) => (
            <div key={doc.name} className="flex-col gap-2.5">
              <Image src={doc.url} width={175} height={250} alt={doc.name} className="border border-black002" />
              <p className="text-center">{doc.name}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="hidden h-[100vh] w-[36%] overflow-hidden md:block">
        <Image src="/introduce-line-art.png" width={251} height={915} className="w-full" alt="deco" />
      </div>
    </div>
  );
}

export default page;
