import EstimateForm from "@/components/estimate/EstimateForm";
import Info from "@/components/estimate/Info";

export default function page() {
  return (
    <div className="contents-center mx-auto mt-12 w-full flex-col gap-20 md:w-10/12 xl:flex-row xl:items-start">
      <Info />
      <EstimateForm />
    </div>
  );
}
