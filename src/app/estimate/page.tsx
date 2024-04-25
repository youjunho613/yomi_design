import EstimateForm from "@/components/estimate/EstimateForm";
import Info from "@/components/estimate/Info";

export default function page() {
  return (
    <div className="contents-center xl:items-start mx-auto mt-12 w-full flex-col gap-20 md:w-10/12 xl:flex-row">
      <Info />
      <EstimateForm />
    </div>
  );
}
