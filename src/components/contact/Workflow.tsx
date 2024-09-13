import Image from "next/image";

export default function Workflow() {
  const WORKFLOW_CONTENT = [
    {
      iconSrc: "/contact/contact-icon001.svg",
      iconSize: { width: 77, height: 60 },
      title: "견적문의",
      content: (
        <>
          <p>현장사진을 바탕으로</p>
          <p>견적서 제공</p>
          <br />
        </>
      ),
    },
    {
      iconSrc: "/contact/contact-icon002.svg",
      iconSize: { width: 53, height: 60 },
      title: "계약체결",
      content: (
        <>
          <p>계약시 견적금의</p>
          <p>10% 선입금</p>
          <br />
        </>
      ),
    },
    {
      iconSrc: "/contact/contact-icon003.svg",
      iconSize: { width: 72, height: 60 },
      title: "현장실측",
      content: (
        <>
          <p>현장 실측 및</p>
          <p>현장상담 진행</p>
          <br />
        </>
      ),
    },
    {
      iconSrc: "/contact/contact-icon004.svg",
      iconSize: { width: 54, height: 60 },
      title: "일정조율",
      content: (
        <>
          <p>디자인 및</p>
          <p>시공 일정 조율</p>
          <br />
        </>
      ),
    },
    {
      iconSrc: "/contact/contact-icon005.svg",
      iconSize: { width: 60, height: 60 },
      title: "디자인작업",
      content: (
        <>
          <p>디자인 작업 및</p>
          <p>피드백 과정</p>
          <p className="font-bold">[평균 일주일 소요] </p>
        </>
      ),
    },
    {
      iconSrc: "/contact/contact-icon006.svg",
      iconSize: { width: 44, height: 60 },
      title: "중도금안내",
      content: (
        <>
          <p>최종시안 확정 후</p>
          <p>중도금 60% 입금</p>
          <br />
        </>
      ),
    },
    {
      iconSrc: "/contact/contact-icon007.svg",
      iconSize: { width: 74, height: 60 },
      title: "제작 및 시공",
      content: (
        <>
          <p>최종 시안을 토대로</p>
          <p>제작 및 시공</p>
          <p className="font-bold">[평균 일주일 소요]</p>
        </>
      ),
    },
    {
      iconSrc: "/contact/contact-icon008.svg",
      iconSize: { width: 44, height: 60 },
      title: "잔금안내",
      content: (
        <>
          <p>시공 피드백 진행 후</p>
          <p>잔금 30% 입금</p>
          <br />
        </>
      ),
    },
  ];

  return (
    <div className="mb-[5.4vw] mt-[1.9vw] w-full xl:mb-[70px] xl:mt-[25px]">
      <ul className="contents-between flex h-full w-full flex-wrap gap-y-[5.6vw] xl:gap-y-[72px]">
        {WORKFLOW_CONTENT.map((item, index) => {
          const { iconSrc, iconSize, title, content } = item;
          return (
            <div key={title} className="relative flex h-fit w-[24%] items-center justify-center">
              <li className="flex h-fit flex-col items-center justify-end">
                <div
                  className={`relative`}
                  style={{
                    aspectRatio: `${iconSize.width}/${iconSize.height}`,
                    width: `${(iconSize.width / 1280) * 100}vw`,
                  }}
                >
                  <Image src={iconSrc} alt={title} fill sizes="3vw" />
                </div>
                <p className="my-4 bg-gray003 px-3 text-[2.3vw] font-bold leading-[110%] xl:text-[30px]">{title}</p>
                <div className="contents-center flex-col text-[2.3vw] md:text-[18px]">{content}</div>
              </li>
              {index !== 7 && index !== 3 && (
                <div className="absolute right-0 top-1/2 aspect-[20/31] w-[1.5vw] -translate-y-1/2 translate-x-1/2 xl:w-[20px]">
                  <Image src={"/contact/contact-next.svg"} alt={"next-arrow"} fill sizes="1.5vw" />
                </div>
              )}
            </div>
          );
        })}
      </ul>
    </div>
  );
}
