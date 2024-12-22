export default function Page() {
  return (
    <div>
      <p>프로젝트 추적</p>
      <form action="" className="contents-center flex-col border border-black p-2">
        <fieldset className="w-full border border-black p-2">
          <legend>업체 정보</legend>
          <input type="text" placeholder="업체명" />
          <input type="text" placeholder="대표자" />
          <input type="text" placeholder="전화번호" />
          <input type="text" placeholder="주소" />
        </fieldset>
        <fieldset className="w-full border border-black p-2">
          <legend>프로젝트 정보</legend>
          <input type="text" placeholder="프로젝트명" />
          <input type="text" placeholder="프로젝트상태" />
          <input type="text" placeholder="견적" />
        </fieldset>
        <fieldset className="w-full border border-black p-2">
          <legend>날짜</legend>
          <input type="text" placeholder="시공일" />
          <input type="text" placeholder="문의일" />
        </fieldset>
        <fieldset className="w-full border border-black p-2">
          <legend>결제 정보</legend>
          <input type="text" placeholder="계약금 입금일" />
          <input type="text" placeholder="계약금 입금액" />
          <input type="text" placeholder="중도금 입금일" />
          <input type="text" placeholder="중도금 입금액" />
          <input type="text" placeholder="잔금 입금일" />
          <input type="text" placeholder="잔금 입금액" />
          <input type="text" placeholder="총 입금액" />
          <input type="text" placeholder="지출액" />
          <input type="text" placeholder="실행율" />
        </fieldset>
        <input type="button" value="등록" className="click-button w-fit border-black" />
      </form>
    </div>
  );
}
