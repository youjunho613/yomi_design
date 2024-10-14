"use client";

import useInventory from "@/service/inventory/mutations";

export default function InventoryTable() {
  const { fetchInventory } = useInventory();
  const { data } = fetchInventory;

  return (
    <table className="w-full text-nowrap border border-black p-2 text-center">
      <thead>
        <tr className="border-b border-gray001">
          <th>제품명</th>
          <th>수량</th>
        </tr>
      </thead>

      <tbody>
        {data?.map((item) => (
          <tr key={item.id} className="border-b border-gray003 last:border-black">
            <td>
              {item.name}
              {item.spec ? ` / ${item.spec}` : ""}
              {item.maker ? ` / ${item.maker}` : ""}
            </td>
            <td>{item.quantity}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
