import { montserrat } from "@/app/fonts/font";

interface IProps {
  innerText: string[];
}

export default function AnimationText({ innerText }: IProps) {
  return (
    <section className="screen flex justify-center bg-black">
      <div className="relative flex h-full w-4/5 select-none items-center justify-start text-white">
        <div className={`${montserrat.className} flex w-fit flex-col text-[223px] font-black`}>
          {innerText.map((text, index) => {
            const isOdd = index % 2 === 0;
            const animateClasses = isOdd
              ? "translate-y-[60px] animate-before-typing"
              : "-translate-y-[60px] animate-after-typing";
            return (
              <p
                key={index}
                className={`w-[${text.length}.5ch] ${animateClasses} overflow-hidden whitespace-nowrap border-r-3 uppercase`}
              >
                {text}
              </p>
            );
          })}
        </div>
        <p className="absolute bottom-[60px] left-0 break-keep text-[40px]">Connect identity with Design</p>
      </div>
    </section>
  );
}
