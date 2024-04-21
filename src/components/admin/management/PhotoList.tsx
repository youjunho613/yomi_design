import { STORAGE_URL, fileToUrls } from "@/supabase/supabase";
import Image from "next/image";
import PhotoEditButton from "./PhotoEditButton";
import usePostPhotoModify from "@/store/usePostPhotoModify";
import usePost from "@/service/post/mutations";
import { useState } from "react";
import type { ChangeEvent } from "react";
import { Tables } from "@/supabase/type";
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

  const modifyPhoto = ({ id, photoUrl }: TModifyPhoto) => {
    const isEmpty = !fileList || preview.length === 0;
    if (isEmpty) return alert("사진을 선택해주세요.");

    const newUrls = fileToUrls({ bucket: "post", fileList });
    const modifyPhotoUrl = photoUrl.concat(newUrls);
    modifyPostMutation.mutate({
      id,
      request: { photoUrl: modifyPhotoUrl },
    });

    clearPhoto();
    TogglePhotoModify();
    TogglePhoto(null);
  };

  return (
    <ul className="flex-col gap-5 contents-between">
      <div className="contents-center gap-5">
        <input
          className="basic-button px-4 py-3 rounded-xl bg-green-500"
          type="button"
          value="저장"
          onClick={() => {
            modifyPhoto({ id: post.id, photoUrl: post.photoUrl });
          }}
        />
        <button className="basic-button px-4 py-3 rounded-xl bg-slate-500" onClick={TogglePhotoModify}>
          {photoModifyIsOpen ? "닫기" : "편집"}
        </button>
      </div>
      {post.photoUrl.map((url, index) => (
        <li key={url} className="flex contents-center gap-5 relative">
          <Image width={500} height={500} src={`${STORAGE_URL}/post/${url}`} alt={`${index + 1}번째 사진`} />
          {photoModifyIsOpen && <PhotoEditButton post={post} index={index} />}
        </li>
      ))}

      {preview.length > 0 && (
        <ul className="contents-center gap-10 relative w-full my-20 mx-10 p-10 border border-slate-500 rounded-xl">
          <p className="absolute top-0 left-2 -translate-y-full">미리보기</p>
          {preview.map((url, index) => (
            <PreviewImage key={url} url={url} index={index} />
          ))}
          <div className="contents-center gap-4 absolute -bottom-1 right-2 translate-y-full">
            <label className="basic-button px-4 py-3 rounded-xl bg-green-500" htmlFor="addFile">
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
              className="basic-button px-4 py-3 rounded-2xl bg-red-700"
              type="button"
              value="취소"
              onClick={clearPhoto}
            />
          </div>
        </ul>
      )}
      {photoModifyIsOpen && preview.length === 0 && (
        <label className="basic-button px-4 py-3 rounded-xl bg-slate-500" htmlFor="file">
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
          className="basic-button px-4 py-3 rounded-xl bg-green-500"
          type="button"
          value="저장"
          onClick={() => {
            modifyPhoto({ id: post.id, photoUrl: post.photoUrl });
          }}
        />
        <button className="basic-button px-4 py-3 rounded-xl bg-slate-500" onClick={TogglePhotoModify}>
          {photoModifyIsOpen ? "닫기" : "편집"}
        </button>
      </div>
    </ul>
  );
}
