import EstimateForm from "@/components/estimate/EstimateForm";
import Info from "@/components/estimate/Info";

export default function page() {
  return (
    <div className="contents-center responsive-width my-6 flex-col gap-5 md:my-10">
      <Info />
      <EstimateForm />
    </div>
  );
}
