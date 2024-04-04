import EstimateForm from "@/components/estimate/EstimateForm";
import Info from "@/components/estimate/Info";

export default function page() {
  return (
    <div className="flex justify-between mt-[50px] px-[50px]">
      <Info />
      <EstimateForm />
    </div>
  );
}
