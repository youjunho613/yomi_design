import useCategory from "@/service/category/mutations";
import { useSignType } from "@/service/sign/mutations";
import { STORAGE_URL } from "@/supabase/supabase";
import { Tables } from "@/supabase/type";
import Image from "next/image";

interface IProps {
  post: Tables<"board"> & { category: Tables<"category"> | null };
  onChangeTextHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeSelectHandler: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export default function PostItemModify(props: IProps) {
  const { post, onChangeTextHandler, onChangeSelectHandler } = props;

  const { fetchSignType } = useSignType();
  const { fetchCategory } = useCategory();

  return (
    <div className="contents-center w-[20vw] flex-col border-b border-black xl:w-[15vw]">
      <div className="relative aspect-square w-[20vw] border border-t-0 border-black xl:w-[15vw]">
        <Image src={`${STORAGE_URL}/post/${post.photoUrl[0]}`} alt={post.title} fill sizes="20vw" />
      </div>
      <table className="flex w-full justify-between px-3 py-2 text-xs xl:text-base">
        <thead className="float-left w-1/3 text-center">
          <tr className="block">
            <th className="block">id</th>
            <th className="block">브랜드명</th>
            <th className="block">부제목</th>
            <th className="block">주소</th>
            <th className="block">업종</th>
            {/* <th className="block">시공</th> */}
            <th className="block">종류</th>
            <th className="block">게시글 타입</th>
            <th className="block">작성일</th>
          </tr>
        </thead>

        <tbody className="block w-2/3 overflow-x-hidden whitespace-nowrap text-center">
          <tr className="inline-block">
            <td className="block">{post.id}</td>

            <td className="block">
              <input
                type="text"
                name="title"
                className="w-full border text-center"
                placeholder={post.title}
                defaultValue={post.title}
                onChange={(e) => onChangeTextHandler(e)}
              />
            </td>
            <td className="block">
              <input
                type="text"
                name="subTitle"
                className="w-full border text-center"
                placeholder={post.subTitle}
                defaultValue={post.subTitle}
                onChange={(e) => onChangeTextHandler(e)}
              />
            </td>
            <td className="block">
              <input
                type="text"
                name="address"
                className="w-full border text-center"
                placeholder={post.address}
                defaultValue={post.address}
                onChange={(e) => onChangeTextHandler(e)}
              />
            </td>
            <td className="block">
              <select
                name="category"
                id="category"
                defaultValue={post.category?.id ?? ""}
                className="w-full border text-center"
                onChange={(e) => onChangeSelectHandler(e)}
              >
                {fetchCategory.data?.map((category) => (
                  <option key={category.id} value={category.id ?? 10}>
                    {category.kor_name}
                  </option>
                ))}
              </select>
            </td>
            {/* <td className="contents-between gap-2 border">
              <label htmlFor="design" className="flex flex-1 gap-0.5">
                <input
                  type="checkbox"
                  name="done"
                  id="design"
                  defaultChecked={post.done?.some((string) => string === "디자인")}
                  onChange={(e) => onChangeCheckboxHandler(e)}
                />
                디자인
              </label>
              <label htmlFor="produce" className="flex flex-1 gap-0.5">
                <input
                  type="checkbox"
                  name="done"
                  id="produce"
                  defaultChecked={post.done?.some((string) => string === "제작")}
                  onChange={(e) => onChangeCheckboxHandler(e)}
                />
                제작
              </label>
              <label htmlFor="construct" className="flex flex-1 gap-0.5">
                <input
                  type="checkbox"
                  name="done"
                  id="construct"
                  defaultChecked={post.done?.some((string) => string === "시공")}
                  onChange={(e) => onChangeCheckboxHandler(e)}
                />
                시공
              </label>
            </td> */}
            <td className="block">
              <select
                name="signType"
                id="signType"
                defaultValue={post.signTypeId ?? 1}
                className="w-full border text-center"
                onChange={(e) => onChangeSelectHandler(e)}
              >
                {fetchSignType.data?.map((sign) => (
                  <option key={sign.id} value={sign.id}>
                    {sign.kor_name}
                  </option>
                ))}
              </select>
            </td>
            <td className="block">
              <select
                name="postType"
                id="postType"
                className="w-full border text-center"
                defaultValue={post.type}
                onChange={(e) => onChangeSelectHandler(e)}
              >
                <option value="signage">signage</option>
                <option value="branding">branding</option>
              </select>
            </td>
            <td className="block">{post.created_at.slice(0, 10)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
