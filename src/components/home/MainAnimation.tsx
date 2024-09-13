"use client";

import { montserrat } from "@/app/fonts/font";
import { useEffect, useState } from "react";

const initialTypingEffect = { text: "", index: 0, count: 0 };

export default function MainAnimationCopy() {
  const [typingEffect, setTypingEffect] = useState(initialTypingEffect);
  const typeText = ["SIGN", "BRANDING", "YOUTHFUL SENSE", "PROFESSIONAL", "YOMI DESIGN"];
  const speed = 50;

  const typingFunc = () => {
    if (typingEffect.count === typeText[typingEffect.index].length) {
      setTypingEffect((prev) => ({ text: "", index: prev.index + 1, count: 0 }));
      return;
    }

    setTypingEffect((prev) => ({
      text: prev.text + typeText[prev.index][prev.count],
      index: prev.index,
      count: prev.count + 1,
    }));
  };

  const stopTyping = (intervalFunc: NodeJS.Timeout) => {
    setTypingEffect({ text: "YOMI DESIGN", index: typeText.length, count: typeText[typeText.length - 1].length });
    clearInterval(intervalFunc);
  };

  useEffect(() => {
    const timer = setInterval(typingFunc, speed);

    if (typingEffect.index === typeText.length) {
      stopTyping(timer);
      return;
    }

    return () => {
      clearTimeout(timer);
    };
  }, [typingEffect.text]);

  return (
    <section className="screen flex flex-col justify-center bg-black">
      <div className="layout relative flex h-full w-4/5 select-none items-center justify-start text-white xl:mt-[110px] xl:items-start">
        <p className={`${montserrat.className} flex w-fit text-[11.5vw] font-black leading-[110%]`}>
          {typingEffect.text}
        </p>
        <p className="absolute bottom-[60px] left-0 break-keep text-[3vw]">Connect identity with Design</p>
      </div>
    </section>
  );
}
