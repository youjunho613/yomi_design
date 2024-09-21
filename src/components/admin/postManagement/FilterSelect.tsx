import { useSignType } from "@/service/sign/mutations";

interface IProps {
  onChangeFilter: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  filterOption: { category: string; signType: string };
}

export default function FilterSelect({ onChangeFilter, filterOption }: IProps) {
  const { fetchSignType } = useSignType();
  return (
    <div className="flex gap-10">
      <label htmlFor="postType" className="contents-center m-2 gap-2 rounded-full border border-black p-2">
        게시글 타입
        <select name="postType" id="postType" onChange={(e) => onChangeFilter(e)}>
          <option value="all" defaultValue={filterOption.category}>
            전체보기
          </option>
          <option value="signage">SIGNAGE</option>
          <option value="branding">BRANDING</option>
        </select>
      </label>
      <label htmlFor="signType" className="contents-center m-2 gap-2 rounded-full border border-black p-2">
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
