import CreateInOutForm from "@/components/admin/inventory/CreateInOutForm";
import CreateInventoryForm from "@/components/admin/inventory/CreateInventoryForm";
import InOutTable from "@/components/admin/inventory/InOutTable";
import InventoryTable from "@/components/admin/inventory/InventoryTable";

export default function Page() {
  return (
    <div className="mt-2 flex flex-col gap-2 xl:mt-5 xl:gap-5">
      <CreateInventoryForm />
      <CreateInOutForm />
      <InventoryTable />
      <InOutTable />
    </div>
  );
}
