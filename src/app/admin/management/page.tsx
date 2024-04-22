"use client";

import Text from "@/components/admin/Text";
import EditButton from "@/components/admin/management/EditButton";
import EditText from "@/components/admin/management/EditText";
import PhotoList from "@/components/admin/management/PhotoList";
import usePost from "@/service/post/mutations";
import usePostPhotoModify from "@/store/usePostPhotoModify";

export default function Page() {
  const { fetchPosts } = usePost();
  const { isError, isLoading, data } = fetchPosts;
  const { photoIsOpen, TogglePhoto, setInitialPhoto } = usePostPhotoModify();

  if (isError) return <p>에러가 발생했습니다.</p>;
  if (isLoading) return <p>로딩 중...</p>;
  if (!data) return <p>업로드된 게시물이 없습니다.</p>;

  const toggleOpen = ({ id, photos }: { id: number; photos: string[] }) => {
    TogglePhoto(id);
    setInitialPhoto(photos);
  };

  const toggleClose = () => {
    TogglePhoto(null);
    setInitialPhoto(null);
  };

  return (
    <ul className="flex flex-col gap-7 bg-sub mt-10 px-5 py-10 rounded-lg">
      {data.map((post) => (
        <li className="flex flex-col gap-4 bg-main rounded-lg px-5 py-10" key={post.id}>
          <div className="w-full flex flex-col gap-5">
            <Text label="게시물 ID" data={post.id} />
            <EditText label="제목" name="title" post={post} />
            <EditText label="주소" name="address" post={post} />
            <EditText label="종류" name="subCategory" post={post} />
            {photoIsOpen === post.id ? (
              <button className="basic-button px-4 py-2" onClick={toggleClose}>
                닫기
              </button>
            ) : (
              <button
                className="basic-button px-4 py-2"
                onClick={() => {
                  toggleOpen({ id: post.id, photos: post.photoUrl });
                }}
              >
                사진보기
              </button>
            )}
          </div>
          {photoIsOpen === post.id && <PhotoList post={post} />}
          <EditButton post={post} />
        </li>
      ))}
    </ul>
  );
}
