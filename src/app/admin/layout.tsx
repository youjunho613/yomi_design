import Link from "next/link";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ul className="tab">
        <li className="tab-button-box">
          <Link href={"/admin/estimateList"} className="tab-button">
            문의
          </Link>
        </li>
        <li className="tab-button-box">
          <Link href={"/admin/management"} className="tab-button">
            게시물 관리
          </Link>
        </li>
        <li className="tab-button-box">
          <Link href={"/admin/create"} className="tab-button">
            게시물 등록
          </Link>
        </li>
      </ul>
      <div className="mt-10 my-2">{children}</div>
    </>
  );
}
