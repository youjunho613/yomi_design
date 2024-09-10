import Image from "next/image";

const WORKFLOW_CONTENT = [
  {
    icon: { src: "/contact/contact-icon001.svg", width: 77, height: 60 },
    title: "견적문의",
    content: (
      <div className="contents-center flex-col">
        <p>현장사진을 바탕으로</p>
        <p>견적서 제공</p>
      </div>
    ),
  },
  {
    icon: { src: "/contact/contact-icon002.svg", width: 53, height: 60 },
    title: "계약체결",
    content: (
      <div className="contents-center flex-col">
        <p>계약시 견적금의</p>
        <p>10% 선입금</p>
      </div>
    ),
  },
  {
    icon: { src: "/contact/contact-icon003.svg", width: 72, height: 41 },
    title: "현장실측",
    content: (
      <div className="contents-center flex-col">
        <p>현장 실측 및</p>
        <p>현장상담 진행</p>
      </div>
    ),
  },
  {
    icon: { src: "/contact/contact-icon004.svg", width: 54, height: 60 },
    title: "일정조율",
    content: (
      <div className="contents-center flex-col">
        <p>디자인 및</p>
        <p>시공 일정 조율</p>
      </div>
    ),
  },
  {
    icon: { src: "/contact/contact-icon005.svg", width: 60, height: 60 },
    title: "디자인작업",
    content: (
      <div className="contents-center flex-col">
        <p>디자인 작업 및</p>
        <p>피드백 과정</p>
        <p className="font-bold">[평균 일주일 소요] </p>
      </div>
    ),
  },
  {
    icon: { src: "/contact/contact-icon006.svg", width: 44, height: 60 },
    title: "중도금안내",
    content: (
      <div className="contents-center flex-col">
        <p>최종시안 확정 후</p>
        <p>중도금 60% 입금</p>
      </div>
    ),
  },
  {
    icon: { src: "/contact/contact-icon007.svg", width: 74, height: 60 },
    title: "제작 및 시공",
    content: (
      <div className="contents-center flex-col">
        <p>최종 시안을 토대로</p>
        <p>제작 및 시공</p>
        <p className="font-bold">[평균 일주일 소요]</p>
      </div>
    ),
  },
  {
    icon: { src: "/contact/contact-icon008.svg", width: 44, height: 60 },
    title: "잔금안내",
    content: (
      <div className="contents-center flex-col">
        <p>시공 피드백 진행 후</p>
        <p>잔금 30% 입금</p>
      </div>
    ),
  },
];
export default function Workflow() {
  return (
    <div className="mb-[70px] mt-[25px] w-full">
      <ul className="contents-between flex w-full flex-wrap gap-y-[72px]">
        {WORKFLOW_CONTENT.map((item, index) => {
          const { icon, title, content } = item;
          return (
            <div key={title} className="relative h-full w-1/4">
              <li className="flex h-[200px] flex-col items-center gap-2">
                <Image {...icon} alt={title} className="h-15" />
                <p className="bg-gray003 text-[30px] font-bold">{title}</p>
                {content}
              </li>
              {index !== 7 && index !== 3 && (
                <Image
                  src={"/contact/contact-next.svg"}
                  alt={"next-arrow"}
                  width={20}
                  height={31}
                  className="absolute right-0 top-1/2 -translate-y-1/2"
                />
              )}
            </div>
          );
        })}
      </ul>
    </div>
  );
}
