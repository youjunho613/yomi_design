import { IEstimateStatusItem, TEstimateStatus } from "@/app/admin/estimateList/page";

interface IProps {
  estimateStatus: IEstimateStatusItem;
  toggleStatus: TEstimateStatus;
  onChangeStatus: (status: TEstimateStatus) => void;
}

export default function TabButton(props: IProps) {
  const { estimateStatus, toggleStatus, onChangeStatus } = props;

  const statusColorStyle = () => {
    return toggleStatus === estimateStatus.status ? "bg-sub text-black" : "bg-main text-black";
  };

  return (
    <button
      onClick={() => {
        onChangeStatus(estimateStatus.status);
      }}
      className={`${statusColorStyle()} w-full px-3 py-2 rounded-md`}
    >
      {estimateStatus.label}
    </button>
  );
}
