import EstimateForm from "@/components/contact/EstimateForm";
import Workflow from "@/components/contact/Workflow";
import PageTitle from "@/components/shared/PageTitle";

export default function page() {
  return (
    <div className="layout contents-center mt-[100px] h-full flex-col">
      <PageTitle title="contact" />
      <Workflow />
      <div className="h-1 w-full bg-black" />
      <EstimateForm />
    </div>
  );
}
