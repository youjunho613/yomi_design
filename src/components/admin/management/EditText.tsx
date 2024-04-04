import { Tables } from "@/../lib/supabase/schema";
import useIsOpen from "@/store/useIsOpen";
import usePostEdit from "@/store/usePostEdit";
import Text from "../Text";
import CategorySelect from "../form/CategorySelect";

interface Props {
  post: Tables<"board", "Row">;
  name: keyof Tables<"board", "Row">;
  label: string;
}
export default function EditText({ post, name, label }: Props) {
  const { editBoard, onChange } = usePostEdit();
  const { postIsOpen } = useIsOpen();

  if (!editBoard) return <></>;
  if (!postIsOpen[post.id].edit) return <Text label={label} data={post[name]} />;
  return (
    <>
      {postIsOpen[post.id].edit && label === "종류" ? (
        <CategorySelect />
      ) : (
        <input name={name} value={post[name]} onChange={() => onChange(name, editBoard[post.id][name])} />
      )}
    </>
  );
}
