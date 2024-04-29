import { TEstimateStatusUpdate } from "@/app/admin/estimateList/page";
import useEstimate from "@/service/estimate/mutations";
import { Tables } from "@/supabase/type";

interface IProps {
  id: number;
  status: TEstimateStatusUpdate;
  dataStatus: Tables<"estimate">["status"];
}

export default function StatusButton({ id, status, dataStatus }: IProps) {
  const { modifyEstimateMutation } = useEstimate({});

  const modifyHandler = () => {
    modifyEstimateMutation.mutate({ id, status });
  };

  const switchStatus = () => {
    switch (status) {
      case "unconfirmed":
        return { text: "미확인", className: "bg-red-500 text-black" };
      case "confirm":
        return { text: "진행", className: "bg-yellow-500 text-black" };
      case "done":
        return { text: "완료", className: "bg-green-500 text-black" };
      case "hidden":
        return { text: "숨김", className: "bg-black text-white" };
    }
  };

  if (status === dataStatus) return <></>;

  return (
    <button className={`${switchStatus().className} rounded-md px-3 py-2`} onClick={modifyHandler}>
      {switchStatus().text}
    </button>
  );
}
