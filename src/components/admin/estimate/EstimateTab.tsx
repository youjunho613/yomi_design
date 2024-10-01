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

  const toggleStyle = "shadow-active-button mb-[0px] mt-[6px]";

  const statusColorStyle = (status: TEstimateStatusUpdate | undefined) => toggleStatus === status && toggleStyle;

  return (
    <div className="flex justify-around gap-10">
      {statusArray.map((item) => (
        <button
          key={item.status}
          className={`${statusColorStyle(item.status)} click-button w-full rounded-md border border-black bg-white px-3 py-2`}
          onClick={() => {
            onChangeStatus(item.status);
          }}
        >
          {item.label}
        </button>
      ))}
      <button
        className={`${toggleStatus === undefined && toggleStyle} click-button w-full rounded-md border-black px-3 py-2`}
        onClick={() => {
          onChangeStatus(undefined);
        }}
      >
        전체
      </button>
    </div>
  );
}
