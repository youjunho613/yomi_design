import usePost from "@/service/post/mutations";
import usePostPhotoModify from "@/store/usePostPhotoModify";
import { STORAGE_URL, fileToUrls } from "@/supabase/supabase";
import { Tables } from "@/supabase/type";
import Image from "next/image";
import type { ChangeEvent } from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import PhotoEditButton from "./PhotoEditButton";
import PreviewImage from "./PreviewImage";

interface Props {
  post: Tables<"board">;
}

type TModifyPhoto = Pick<Tables<"board">, "id" | "photoUrl">;

export default function PhotoList({ post }: Props) {
  const { TogglePhoto, photoArray, photoModifyIsOpen, TogglePhotoModify } = usePostPhotoModify();
  const { modifyPostMutation } = usePost();
  const [fileList, setFileList] = useState<FileList>();
  const [preview, setPreview] = useState<string[]>([]);

  const onChangeFile = ({ target: { files } }: ChangeEvent<HTMLInputElement>) => {
    if (!files) return;
    const fileArray = Array.from(files);
    const urls = fileArray.map((file) => URL.createObjectURL(file));
    setFileList(files);
    setPreview(urls);
  };

  const addPreviewPhoto = ({ target: { files } }: ChangeEvent<HTMLInputElement>) => {
    if (!files) return;
    setPreview((prev) => {
      if (!files) return prev;
      const fileArray = Array.from(files);
      const urls = fileArray.map((file) => URL.createObjectURL(file));
      return prev.concat(urls);
    });

    setFileList((prev) => {
      const dataTransfer = new DataTransfer();
      const prevFileArray = Array.from(prev || []);
      const fileArray = Array.from(files);
      const newFiles = [...prevFileArray, ...fileArray];
      newFiles.forEach((file) => {
        dataTransfer.items.add(file);
      });

      if (!files) return prev;
      return dataTransfer.files;
    });
  };

  const clearPhoto = () => {
    setPreview([]);
    setFileList(undefined);
  };

  const modifyPhoto = async ({ id, photoUrl }: TModifyPhoto) => {
    const isEmpty = !fileList || preview.length === 0;
    if (isEmpty) return alert("사진을 선택해주세요.");

    const newUrls = await toast.promise(fileToUrls({ bucket: "post", fileList }), {
      pending: "업로드 중 🚀",
      success: "업로드 성공 👌",
      error: "업로드 실패 🤯",
    });

    const modifyPhotoUrl = photoUrl.concat(newUrls);
    modifyPostMutation.mutate({ id, request: { photoUrl: modifyPhotoUrl } });

    clearPhoto();
    TogglePhotoModify();
    TogglePhoto(null);
    toast.success("수정되었습니다.");
  };

  return (
    <ul className="contents-between flex-col gap-5">
      <div className="contents-center gap-5">
        <input
          className="basic-button rounded-xl bg-green-500 px-4 py-3"
          type="button"
          value="저장"
          onClick={() => {
            modifyPhoto({ id: post.id, photoUrl: post.photoUrl });
          }}
        />
        <button className="basic-button rounded-xl bg-slate-500 px-4 py-3" onClick={TogglePhotoModify}>
          {photoModifyIsOpen ? "닫기" : "편집"}
        </button>
      </div>
      {post.photoUrl.map((url, index) => (
        <li key={url} className="contents-center relative flex gap-5">
          <Image width={500} height={500} src={`${STORAGE_URL}/post/${url}`} alt={`${index + 1}번째 사진`} />
          {photoModifyIsOpen && <PhotoEditButton post={post} index={index} />}
        </li>
      ))}

      {preview.length > 0 && (
        <ul className="contents-center relative mx-10 my-20 w-full gap-10 rounded-xl border border-slate-500 p-10">
          <p className="absolute left-2 top-0 -translate-y-full">미리보기</p>
          {preview.map((url, index) => (
            <PreviewImage key={url} url={url} index={index} />
          ))}
          <div className="contents-center absolute -bottom-1 right-2 translate-y-full gap-4">
            <label className="basic-button rounded-xl bg-green-500 px-4 py-3" htmlFor="addFile">
              추가
              <input
                className="hidden"
                accept="image/*"
                type="file"
                id="addFile"
                multiple
                onChange={(event) => {
                  addPreviewPhoto(event);
                }}
              />
            </label>
            <input
              className="basic-button rounded-2xl bg-red-700 px-4 py-3"
              type="button"
              value="취소"
              onClick={clearPhoto}
            />
          </div>
        </ul>
      )}
      {photoModifyIsOpen && preview.length === 0 && (
        <label className="basic-button rounded-xl bg-slate-500 px-4 py-3" htmlFor="file">
          추가
          <input
            className="hidden"
            accept="image/*"
            type="file"
            id="file"
            multiple
            onChange={(event) => {
              onChangeFile(event);
            }}
          />
        </label>
      )}
      <div className="contents-center gap-5">
        <input
          className="basic-button rounded-xl bg-green-500 px-4 py-3"
          type="button"
          value="저장"
          onClick={() => {
            modifyPhoto({ id: post.id, photoUrl: post.photoUrl });
          }}
        />
        <button className="basic-button rounded-xl bg-slate-500 px-4 py-3" onClick={TogglePhotoModify}>
          {photoModifyIsOpen ? "닫기" : "편집"}
        </button>
      </div>
    </ul>
  );
}
