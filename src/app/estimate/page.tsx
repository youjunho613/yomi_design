import EstimateForm from "@/components/estimate/EstimateForm";

export default function page() {
  return (
    <div className="contents-center layout mt-12 flex-col gap-20 md:w-10/12 xl:flex-row xl:items-start">
      <EstimateForm />
    </div>
  );
}
