import Link from "next/link";

export default function NotFound() {
  return (
    <div className="contents-center flex-col gap-10 text-lg">
      <h2 className="text-center">
        <p>
          죄송합니다.
          <br />
          요청하신 페이지를 찾을 수 없습니다.
        </p>
      </h2>
      <p className="text-center">
        방문하시려는 페이지의 주소가 잘못 입력되었거나
        <br />
        페이지의 주소가 변경 혹은 삭제되어 요청하신 페이지를 찾을 수 없습니다.
        <br />
        입력하신 주소가 정확한지 다시 한번 확인해 주시기 바랍니다.
        <br />
        감사합니다.
      </p>
      <Link href="/" className="rounded-3xl bg-sub px-4 py-2 text-xl text-main">
        홈으로
      </Link>
    </div>
  );
}
