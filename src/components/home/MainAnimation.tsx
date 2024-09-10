"use client";

import { montserrat } from "@/app/layout";
import Typewriter, { TypewriterClass } from "typewriter-effect";

export default function MainAnimation() {
  const typeWriter = (typewriter: TypewriterClass) => {
    typewriter
      .typeString("SIGN")
      .deleteAll()
      .typeString("BRANDING")
      .deleteAll()
      .typeString("YOUTHFUL SENSE")
      .deleteAll()
      .typeString("PROFESSIONAL")
      .deleteAll()
      .typeString("YOMI<br/>DESIGN")
      .start();
  };

  return (
    <section className="screen flex flex-col justify-center bg-black">
      <div className="layout relative mt-[110px] flex h-full w-4/5 select-none items-start justify-start text-white">
        <div className={`${montserrat.className} flex w-fit flex-col text-[11.5vw] font-black leading-[110%]`}>
          <Typewriter
            onInit={typeWriter}
            options={{ deleteSpeed: 10, delay: 50, wrapperClassName: "whitespace-pre-wrap break-all" }}
          />
        </div>
        {/* <div className={`${montserrat.className} flex w-fit flex-col text-[223px] font-black leading-[110%]`}>
          <Typewriter
            onInit={typeWriter}
            options={{ deleteSpeed: 10, delay: 50, wrapperClassName: "whitespace-pre-wrap break-all" }}
          />
        </div> */}
        <p className="absolute bottom-[60px] left-0 break-keep text-[40px]">Connect identity with Design</p>
      </div>
    </section>
  );
}
