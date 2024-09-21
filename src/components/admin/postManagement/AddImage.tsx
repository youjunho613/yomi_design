import { IFileList } from "@/app/admin/postManagement/page";
import usePost from "@/service/post/mutations";
import { fileToUrls } from "@/supabase/supabase";
import { ChangeEvent } from "react";
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

  return (
    <>
      <div className="contents-center">
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
    </>
  );
}
