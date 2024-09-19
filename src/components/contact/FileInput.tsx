import { UseFormRegisterReturn } from "react-hook-form";

interface IProps {
  id: string;
  label: string;
  fileList: FileList | undefined;
  register: UseFormRegisterReturn;
}
export default function FileInput({ id, label, fileList, register }: IProps) {
  return (
    <label className="estimate-label h-[120px] xl:h-40" htmlFor={id}>
      <span className="estimate-span">{label}</span>
      <div className="mx-10 my-2 flex h-[72px] w-10/12 flex-col border border-gray001 px-2 py-2 text-[14px] xl:my-0 xl:h-36 xl:w-full">
        <input
          type="file"
          accept="image/*"
          id={id}
          multiple={true}
          className="text-[8px] xl:text-[16px]"
          {...register}
        />
        {!!fileList && (
          <ul className="my-1 flex h-12 w-full select-none flex-col items-center overflow-y-scroll pb-2 xl:h-24">
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
