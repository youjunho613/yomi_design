"use client";

import type { IAbout } from "@/app/about/content";
import { montserrat } from "@/app/fonts/font";
import useIsVisible from "@/hook/useIsVisible";
import { useRef } from "react";

interface IProps {
  index: number;
  item: IAbout;
}

export default function TextContent({ index, item }: IProps) {
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const isVisible = useIsVisible(paragraphRef);
  const visibilityClasses = isVisible ? "translate-y-0 opacity-100" : "translate-y-full opacity-10";

  const isOdd = index % 2 === 0;
  const textAlign = isOdd ? "text-left" : "text-right";

  return (
    <div className={`${textAlign} flex flex-col justify-between md:w-[28.7%]`}>
      <div className={`${montserrat.className}`}>
        <p
          ref={paragraphRef}
          className={`${visibilityClasses} relative z-10 text-[67px] leading-none text-gray002 duration-1000 md:text-[14vw] md:leading-[70%]`}
        >
          {item.index}
        </p>
        <h2 className="text:[17px] relative z-20 uppercase leading-none md:mt-[23px] md:text-[3vw] md:leading-[82.5%]">
          {item.label}
        </h2>
      </div>
      <p className="my-5 mb-2.5 break-keep text-[14px] leading-[120%] lg:text-[18px]">{item.content}</p>
    </div>
  );
}
