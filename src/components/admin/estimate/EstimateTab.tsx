import type { IEstimateStatusItem, TEstimateStatusUpdate } from "@/app/admin/estimateList/page";

interface IProps {
  toggleStatus: TEstimateStatusUpdate | undefined;
  onChangeStatus: (status: TEstimateStatusUpdate | undefined) => void;
}

const statusArray: IEstimateStatusItem[] = [
  { status: "unconfirmed", label: "미확인" },
  { status: "confirm", label: "진행" },
  { status: "done", label: "완료" },
  { status: "hidden", label: "숨김" },
];

export default function EstimateTab(props: IProps) {
  const { toggleStatus, onChangeStatus } = props;

  const statusColorStyle = (status: TEstimateStatusUpdate | undefined) =>
    toggleStatus === status ? "bg-sub text-white" : "bg-main text-black";

  return (
    <div className="flex justify-around gap-10">
      {statusArray.map((item) => (
        <button
          key={item.status}
          className={`${statusColorStyle(item.status)} w-full rounded-md px-3 py-2`}
          onClick={() => {
            onChangeStatus(item.status);
          }}
        >
          {item.label}
        </button>
      ))}
      <button
        className={`${toggleStatus === undefined && "bg-sub text-white"} w-full rounded-md px-3 py-2`}
        onClick={() => {
          onChangeStatus(undefined);
        }}
      >
        전체
      </button>
    </div>
  );
}
