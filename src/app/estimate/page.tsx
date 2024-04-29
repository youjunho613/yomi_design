import EstimateForm from "@/components/estimate/EstimateForm";
import Info from "@/components/estimate/Info";

export default function page() {
  return (
    <div className="contents-center layout mt-12 flex-col gap-20 md:w-10/12 xl:flex-row xl:items-start">
      <Info />
      <EstimateForm />
    </div>
  );
}
