"use client";

import useInventory from "@/service/inventory/mutations";

export default function InOutTable() {
  const { fetchInOut } = useInventory();
  const { data } = fetchInOut;

  return (
    <table className="w-full text-nowrap border border-black p-2 text-center">
      <thead>
        <tr className="flex flex-wrap justify-between border-b border-gray001">
          <th className="w-1/12">입출고 날짜</th>
          <th className="w-6/12">제품명</th>
          <th className="w-1/12">수량</th>
          <th className="w-1/12">위치</th>
          <th className="w-1/12">구매 가격</th>
          <th className="w-2/12">메모</th>
        </tr>
      </thead>
      <tbody>
        {data?.map((item) => (
          <tr key={item.id} className="flex flex-wrap justify-between border-b border-gray003 last:border-black">
            <td className="w-1/12">{item.date}</td>
            <td className="w-6/12">
              {item.inventory?.name} / {item.inventory?.spec} / {item.inventory?.maker}
            </td>
            <td className="w-1/12">{item.quantity}</td>
            <td className="w-1/12">{item.location}</td>
            <td className="w-1/12">{item.price?.toLocaleString("ko-KR")}</td>
            <td className="w-2/12">{item.memo}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
