import { TEstimateStatusUpdate } from "@/app/admin/estimateList/page";
import useEstimate from "@/service/estimate/mutations";
import { Tables } from "@/supabase/type";

interface IProps {
  id: number;
  dataStatus: Tables<"estimate">["status"];
}

export default function StatusButton({ id, dataStatus }: IProps) {
  const { modifyEstimateMutation, deleteEstimateMutation } = useEstimate();

  const modifyHandler = async (status: TEstimateStatusUpdate | undefined) => {
    modifyEstimateMutation.mutate({ id, status });
  };

  const deleteHandler = () => {
    deleteEstimateMutation.mutate(id);
  };

  return (
    <>
      <button
        className="click-button flex-1 rounded-md border-pink-500 bg-pink-200 shadow-pink-500 lg:px-3 lg:py-2"
        disabled={dataStatus === "unconfirmed"}
        onClick={() => modifyHandler("unconfirmed")}
      >
        미확인
      </button>
      <button
        className="click-button flex-1 rounded-md border-orange-500 bg-orange-200 shadow-orange-500 lg:px-3 lg:py-2"
        disabled={dataStatus === "confirm"}
        onClick={() => modifyHandler("confirm")}
      >
        진행
      </button>
      <button
        className="click-button flex-1 rounded-md border-green-500 bg-green-200 shadow-green-500 lg:px-3 lg:py-2"
        disabled={dataStatus === "done"}
        onClick={() => modifyHandler("done")}
      >
        완료
      </button>
      <button
        className="click-button flex-1 rounded-md border-purple-500 bg-purple-200 shadow-purple-500 lg:px-3 lg:py-2"
        disabled={dataStatus === "hidden"}
        onClick={() => modifyHandler("hidden")}
      >
        숨김
      </button>
      <button
        className="click-button flex-1 rounded-md border-red-500 bg-red-200 shadow-red-500 lg:px-3 lg:py-2"
        onClick={deleteHandler}
      >
        삭제
      </button>
    </>
  );
}
