import Image from "next/image";
import { content, docs } from "./content";

function page() {
  return (
    <div className="flex justify-between mt-[30px] pl-10">
      <div className="flex flex-col align-baseline gap-[30px]">
        {/* <Image src="/introduce_logo.svg" width={162} height={24} alt="요미디자인은?" /> */}
        <Image src="/introduce_logo.svg" width={180} height={27} alt="요미디자인은?" />
        <pre className="text-xs font-light leading-6">{content}</pre>
        <div className="flex gap-[30px]">
          {docs.map((doc) => (
            <div key={doc.name} className="contents-center flex-col gap-2.5">
              <Image src={doc.url} width={175} height={250} alt={doc.name} />
              <p className="text-xs">{doc.name}</p>
            </div>
          ))}
        </div>
        <Image src="/step_title.svg" width={97} height={25} alt="진행방법" />
        <Image src="/step.svg" width={573} height={230} alt="진행순서" />
      </div>
      <Image src="line_art.svg" width={251} height={915} className="-translate-y-[30px]" alt="deco" />
    </div>
  );
}

export default page;
