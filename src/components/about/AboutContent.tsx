import { IAbout } from "@/app/about/content";
import TextContent from "@/components/about/TextContent";
import Image from "next/image";

interface IProps {
  index: number;
  item: IAbout;
}

export default function AboutContents({ index, item }: IProps) {
  const isOdd = index % 2 === 0;
  const reverseClasses = isOdd ? "md:flex-row" : "md:flex-row-reverse";

  return (
    <li key={item.index} className={`flex ${reverseClasses} flex-col justify-between border-b border-black pb-[5.4vw]`}>
      <TextContent item={item} index={index} />
      <div className="contents-center w-fit md:w-[67.3%]">
        <ul className="flex gap-[2.4vw]">
          {item.image.map((img) => (
            <li key={img.src} className="aspect-square w-full max-w-[48.8%]">
              <Image src={img.src} alt={img.alt} width={200} height={200} className="w-full" />
            </li>
          ))}
        </ul>
      </div>
    </li>
  );
}
