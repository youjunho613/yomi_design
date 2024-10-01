import { useSignType } from "@/service/sign/mutations";

interface IProps {
  onChangeFilter: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  filterOption: { category: string; signType: string };
}

export default function FilterSelect({ onChangeFilter, filterOption }: IProps) {
  const { fetchSignType } = useSignType();
  return (
    <div className="flex w-full gap-10 text-sm xl:text-base">
      <label
        htmlFor="postType"
        className="contents-center m-1 flex-col gap-2 border border-black p-1 xl:m-2 xl:rounded-full xl:p-2"
      >
        게시글 타입
        <select name="postType" id="postType" onChange={(e) => onChangeFilter(e)}>
          <option value="all" defaultValue={filterOption.category}>
            전체보기
          </option>
          <option value="signage">SIGNAGE</option>
          <option value="branding">BRANDING</option>
        </select>
      </label>
      <label
        htmlFor="signType"
        className="contents-center m-1 flex-col gap-2 border border-black p-1 xl:m-2 xl:rounded-full xl:p-2"
      >
        간판 종류
        <select name="signType" id="signType" onChange={(e) => onChangeFilter(e)}>
          <option value="all" defaultValue={filterOption.signType}>
            전체보기
          </option>
          {fetchSignType.data?.map((sign) => (
            <option key={sign.id} value={sign.eng_name}>
              {sign.kor_name}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}
