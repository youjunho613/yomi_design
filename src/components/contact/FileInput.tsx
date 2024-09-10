import { UseFormRegisterReturn } from "react-hook-form";

interface IProps {
  id: string;
  label: string;
  fileList: FileList | undefined;
  register: UseFormRegisterReturn;
}
export default function FileInput({ id, label, fileList, register }: IProps) {
  return (
    <label className={`contents-center h-40 w-full border border-b-0 border-gray001 text-[18px]`} htmlFor={id}>
      <p className="flex h-full w-[27.8%] items-center bg-gray003 px-10">{label}</p>
      <div className="mx-10 h-36 w-full border border-gray001 px-2 py-2 text-[14px]">
        <span>{"<폴더 아이콘>　"}</span>
        <input type="file" accept="image/*" id={id} multiple={true} {...register} />
        {!!fileList && (
          <ul className="my-1 flex h-24 w-full select-none flex-col items-center overflow-y-scroll pb-2">
            {Array.from(fileList).map((photo) => (
              <li key={photo.name} className="flex w-full justify-start">
                <span>{photo.name}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </label>
  );
}
