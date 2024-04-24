import Image from "next/image";
import { content, docs } from "./content";
import { myFont } from "../layout";

function page() {
  return (
    <div className="mt-7 flex justify-between pl-10">
      <div className="flex flex-col gap-7 align-baseline">
        <Image src="/introduce_logo.svg" width={182} height={27} alt="요미디자인은?" />
        <pre className={`leading-6 ${myFont.className}`}>{content}</pre>
        <div className="my-8 flex gap-7">
          {docs.map((doc) => (
            <div key={doc.name} className="contents-center flex-col gap-2.5">
              <Image src={doc.url} width={175} height={250} alt={doc.name} />
              <p className="text-sm">{doc.name}</p>
            </div>
          ))}
        </div>
        <Image src="/step_title.svg" width={97} height={25} alt="진행방법" />
        <Image src="/step.svg" width={573} height={230} alt="진행순서" />
      </div>
      <Image src="line_art.svg" width={251} height={915} className="-translate-y-7" alt="deco" />
    </div>
  );
}

export default page;
