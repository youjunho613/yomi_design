import { TEstimateStatus } from "@/app/api/estimate";

interface Props {
  status: TEstimateStatus | "all";
  toggleStatus: TEstimateStatus | "all";
  onChangeStatus: (status: TEstimateStatus | "all") => void;
}
export default function TabButton({ status, toggleStatus, onChangeStatus }: Props) {
  const statusSwitching = () => {
    switch (status) {
      case "confirm":
        return { label: "진행", class: `${toggleStatus === "confirm" ? "bg-white" : "bg-yellow-500"} text-black` };
      case "done":
        return { label: "완료", class: `${toggleStatus === "done" ? "bg-white" : "bg-green-500"} text-black` };
      case "hidden":
        return {
          label: "숨김",
          class: `${toggleStatus === "hidden" ? "bg-white text-black" : "bg-black text-white"}`,
        };
      case "unconfirmed":
        return { label: "미확인", class: `${toggleStatus === "unconfirmed" ? "bg-white" : "bg-red-500"} text-black` };
      case "all":
        return {
          label: "모두보기",
          class: `${toggleStatus === "all" ? "bg-white text-black" : "bg-black text-white"}`,
        };
    }
  };

  return (
    <button
      onClick={(): void => onChangeStatus(status)}
      className={`${statusSwitching().class} w-full px-3 py-2 rounded-md`}
    >
      {statusSwitching().label}
    </button>
  );
}
