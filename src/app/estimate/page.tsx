import EstimateForm from "@/components/estimate/EstimateForm";
import Info from "@/components/estimate/Info";

export default function page() {
  return (
    <div className="mt-12 flex justify-between gap-4 px-12">
      <Info />
      <EstimateForm />
    </div>
  );
}
