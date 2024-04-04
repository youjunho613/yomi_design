import Text from "../Text";
import { Tables } from "@/../lib/supabase/schema";
import CategorySelect from "../form/CategorySelect";
import useSelect from "@/hook/useSelect";
import useIsOpen from "@/store/useIsOpen";
import usePostEdit from "@/store/usePostEdit";

interface Props {
  post: Tables<"board", "Row">;
  name: keyof Tables<"board", "Row">;
  label: string;
}
export default function EditText({ post, name, label }: Props) {
  const { editBoard, onChange } = usePostEdit();
  const { postIsOpen } = useIsOpen();
  const { signType, onChangeSelect } = useSelect();

  if (!editBoard) return <></>;
  if (!postIsOpen[post.id].edit) return <Text label={label} data={post[name]} />;
  return (
    <>
      {postIsOpen[post.id].edit && label === "종류" ? (
        <CategorySelect signType={signType} onChangeSelect={onChangeSelect} />
      ) : (
        <input name={name} value={post[name]} onChange={() => onChange(name, editBoard[post.id][name])} />
      )}
    </>
  );
}
