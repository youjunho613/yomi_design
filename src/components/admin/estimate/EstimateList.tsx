import { Tables } from "@/supabase/type";
import Estimate from "./Estimate";

interface IProps {
  data: Tables<"estimate">[] | null | undefined;
}

export default function EstimateList({ data }: IProps) {
  return (
    <ul className="mt-10 flex flex-wrap justify-between gap-7 rounded-lg bg-black px-5 py-10">
      {!data || data.length === 0 ? (
        <p className="w-full rounded-lg bg-white px-5 py-10">문의가 없습니다.</p>
      ) : (
        data.map((estimate) => <Estimate key={estimate.id} estimate={estimate} />)
      )}
    </ul>
  );
}
