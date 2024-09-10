"use client";

import type { IAbout } from "@/app/about/content";
import { montserrat } from "@/app/layout";
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
    <div className={`${textAlign} flex w-[28.7%] flex-col justify-between`}>
      <div className={`${montserrat.className}`}>
        <p
          ref={paragraphRef}
          className={`${visibilityClasses} relative z-10 text-[180px] leading-[126px] text-gray002 duration-1000`}
        >
          {item.index}
        </p>
        <h2 className="relative z-20 mt-[23px] text-[40px] uppercase leading-[33px]">{item.label}</h2>
      </div>
      <p className="break-keep text-[18px] leading-[22px]">{item.content}</p>
    </div>
  );
}
