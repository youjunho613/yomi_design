import { IFileList } from "@/app/admin/postManagement/page";
import usePost from "@/service/post/mutations";
import { STORAGE_URL, deleteStorage, fileToUrls } from "@/supabase/supabase";
import Image from "next/image";
import { ChangeEvent, useState } from "react";
import { toast } from "react-toastify";

interface IProps {
  postId: number;
  postPhotoUrl: string[];
  fileList: IFileList;
  onChangeFileHandler: (e: ChangeEvent<HTMLInputElement>, id: number | null) => void;
  initialFileListHandler: () => void;
}

export default function AddImage(props: IProps) {
  const { postId, postPhotoUrl, fileList, onChangeFileHandler, initialFileListHandler } = props;
  const { modifyPostMutation } = usePost();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPhotoUrl, setSelectedPhotoUrl] = useState<string[]>([]);

  const onChangeCheckboxHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { checked, id } = e.target;
    if (checked) {
      setSelectedPhotoUrl([...selectedPhotoUrl, id]);
    } else {
      setSelectedPhotoUrl(selectedPhotoUrl.filter((url) => url !== id));
    }
  };

  const onChangeIsOpen = () => {
    setIsOpen(!isOpen);
    setSelectedPhotoUrl([]);
  };

  const addImage = async (postId: number, beforePhotoUrl: string[]) => {
    const bucket = "post";
    const promiseText = { pending: "업로드 중 🚀", success: "업로드 성공 👌", error: "업로드 실패 🤯" };

    let newPhotoUrl: string[] = [];
    if (fileList.fileList) {
      newPhotoUrl = await toast.promise(fileToUrls({ bucket, fileList: fileList.fileList }), promiseText);
    }
    const photoUrl: string[] = [...beforePhotoUrl, ...newPhotoUrl];

    modifyPostMutation.mutate({ id: postId, request: { photoUrl } });
    initialFileListHandler();
  };

  const deleteImage = async (postId: number, deletePhotoUrl: string[]) => {
    const bucket = "post";
    const promiseText = { pending: "삭제 중 🚀", success: "삭제 성공 👌", error: "삭제 실패 🤯" };

    try {
      await toast.promise(deleteStorage({ bucket, fileList: deletePhotoUrl }), promiseText);
      const photoUrl = postPhotoUrl.filter((url) => !deletePhotoUrl.includes(url));
      modifyPostMutation.mutate({ id: postId, request: { photoUrl } });
    } catch (error) {
      toast.error("삭제 실패");
    }
  };

  return (
    <>
      <div className="contents-between px-3">
        <label htmlFor={`fileAdd${postId}`} className="click-button cursor-pointer border-black bg-white">
          이미지 추가
          <input
            type="file"
            accept="image/*"
            multiple={true}
            name={`fileAdd${postId}`}
            id={`fileAdd${postId}`}
            className="hidden"
            onChange={(e) => {
              onChangeFileHandler(e, postId);
            }}
          />
        </label>
        <button className="click-button cursor-pointer border-black bg-white" onClick={onChangeIsOpen}>
          이미지 삭제
        </button>
      </div>
      {fileList.id === postId && fileList.fileList && (
        <>
          <ul>
            {Array.from(fileList.fileList).map((file, index) => (
              <li key={index}>
                {index + 1}.{file.name}
              </li>
            ))}
          </ul>
          <div className="contents-between px-3">
            <label htmlFor={`done${postId}`} className="click-button cursor-pointer border-black bg-green-200">
              완료
              <input
                type="button"
                name={`done${postId}`}
                id={`done${postId}`}
                onClick={() => addImage(postId, postPhotoUrl)}
              />
            </label>
            <label htmlFor={`cancel${postId}`} className="click-button cursor-pointer border-black bg-red-200">
              취소
              <input type="button" name={`cancel${postId}`} id={`cancel${postId}`} onClick={initialFileListHandler} />
            </label>
          </div>
        </>
      )}
      {isOpen && (
        <ul className="flex w-full flex-col justify-center">
          {postPhotoUrl.map((url, index) => (
            <li key={index} className="flex w-full">
              <label htmlFor={url} className="relative mx-auto aspect-square w-4/5">
                <Image src={`${STORAGE_URL}/post/${url}`} alt={`${index}번째 사진 - ${url}`} fill sizes="20%" />
                <div className="absolute right-[1%] top-[1%] z-30 flex aspect-square rounded-full bg-white">
                  <input
                    type="checkbox"
                    name="photo"
                    id={url}
                    className="w-10"
                    onChange={(e) => onChangeCheckboxHandler(e)}
                  />
                </div>
              </label>
            </li>
          ))}
          <button className="click-button mx-auto" onClick={() => deleteImage(postId, selectedPhotoUrl)}>
            선택 항목 삭제
          </button>
        </ul>
      )}
    </>
  );
}
