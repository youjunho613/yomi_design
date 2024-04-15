import EstimateForm from "@/components/estimate/EstimateForm";
import Info from "@/components/estimate/Info";

export default function page() {
  return (
    <div className="flex justify-between mt-12 px-12 gap-4">
      <Info />
      <EstimateForm />
    </div>
  );
}
