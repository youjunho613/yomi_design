import usePostModify from "@/store/usePostModify";
import Text from "../Text";
import CategorySelect from "../form/CategorySelect";
import { Tables } from "@/supabase/type";

interface Props {
  post: Tables<"board">;
  name: keyof Tables<"board">;
  label: string;
}
export default function EditText({ post, name, label }: Props) {
  const { postIsOpen, modifyContent, onChangeModifyContent } = usePostModify();

  if (postIsOpen !== post.id) return <Text label={label} data={post[name]} />;
  if (postIsOpen === post.id && label === "종류") return <CategorySelect />;
  if (modifyContent === null) return <p>잘못된 경로입니다.</p>;

  return (
    <label htmlFor={name}>
      {`${label} : `}
      <input
        className="w-full p-2"
        name={name}
        id={name}
        value={modifyContent[name]}
        onChange={(event) => {
          onChangeModifyContent({ key: name, value: event.target.value });
        }}
      />
    </label>
  );
  {
    /* <input name={name} value={post[name]} onChange={(event) => onChange(name, editBoard[post.id][name])} /> */
  }
}
