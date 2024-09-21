"use client";

import AddImage from "@/components/admin/postManagement/AddImage";
import EditButtons from "@/components/admin/postManagement/EditButtons";
import FilterSelect from "@/components/admin/postManagement/FilterSelect";
import PostItem from "@/components/admin/postManagement/PostItem";
import PostItemModify from "@/components/admin/postManagement/PostItemModify";
import NullPost from "@/components/portfolio/NullPost";
import Error from "@/components/shared/Error";
import Loading from "@/components/shared/loading/Loading";
import usePost from "@/service/post/mutations";
import { Tables, TablesUpdate } from "@/supabase/type";
import { ChangeEvent, useEffect, useState } from "react";

interface IFilters {
  category: "all" | "signage" | "branding";
  signType: "all" | Tables<"sign">["eng_name"];
}

export interface IFileList {
  id: number | null;
  fileList: FileList | null;
}

export interface IPost {
  modifyId: number | null;
  deleteId: number | null;
}

export interface IOpenPostHandlerProps {
  target: keyof IPost | "init";
  postId?: number;
}

export default function Page() {
  const [filterOption, setFilterOption] = useState<IFilters>({ category: "all", signType: "all" });

  const initialFileList = { id: null, fileList: null };
  const [fileList, setFileList] = useState<IFileList>(initialFileList);

  const initialPost = { modifyId: null, deleteId: null };
  const [openPost, setOpenPost] = useState<IPost>(initialPost);

  const [modifyPost, setModifyPost] = useState<TablesUpdate<"board"> | null>(null);
  console.log("modifyPost :", modifyPost);

  const onChangeTextHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "title") {
      setModifyPost({ ...modifyPost, title: e.target.value });
      return;
    }

    if (e.target.name === "subTitle") {
      setModifyPost({ ...modifyPost, subTitle: e.target.value });
      return;
    }

    if (e.target.name === "address") {
      setModifyPost({ ...modifyPost, address: e.target.value });
      return;
    }
  };

  const onChangeSelectHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    if (e.target.name === "category") {
      setModifyPost({ ...modifyPost, categoryId: Number(e.target.value) });
      return;
    }

    if (e.target.name === "signType") {
      setModifyPost({ ...modifyPost, signTypeId: Number(e.target.value) });
      return;
    }

    if (e.target.name === "postType") {
      if (e.target.value !== "signage" && e.target.value !== "branding") return;
      setModifyPost({ ...modifyPost, type: e.target.value });
      return;
    }
  };

  const initialModifyPost = () => {
    setModifyPost(null);
  };

  const { fetchPostListAll } = usePost();
  const { data, isError, isLoading, error } = fetchPostListAll;
  const [filteredData, setFilteredData] = useState(data);

  const onChangeFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.name === "signType") {
      setFilterOption({ ...filterOption, signType: e.target.value });
      return;
    }

    if (e.target.name === "postType") {
      if (e.target.value !== "all" && e.target.value !== "signage" && e.target.value !== "branding") return;
      setFilterOption({ ...filterOption, category: e.target.value });
      return;
    }
  };

  const onChangeFileHandler = (e: ChangeEvent<HTMLInputElement>, id: number | null) => {
    if (!e.target.files) return;
    setFileList({ fileList: e.target.files, id });
  };

  const initialFileListHandler = () => {
    setFileList(initialFileList);
  };

  const openPostHandler = ({ target, postId }: IOpenPostHandlerProps) => {
    if (target === "init" || postId === undefined) {
      setOpenPost(initialPost);
      return;
    }
    setOpenPost({ ...openPost, [target]: postId });
  };

  useEffect(() => {
    const filterData = data
      ?.filter((post) => {
        if (filterOption.category === "all") return post;
        return post.type === filterOption.category;
      })
      .filter((post) => {
        if (filterOption.signType === "all") return post;
        return post.signType === filterOption.signType;
      });

    setFilteredData(filterData);
  }, [filterOption]);

  if (isLoading) return <Loading />;
  if (isError) return <Error error={error.message} />;
  if (!filteredData) return <NullPost status="undefined" />;

  return (
    <div>
      <FilterSelect onChangeFilter={onChangeFilter} filterOption={filterOption} />

      <ul className="flex flex-wrap gap-[1vw]">
        {filteredData.length === 0 ? (
          <div className="contents-center my-10 w-full">
            <NullPost status="null" />
          </div>
        ) : (
          filteredData.map((post) => (
            <li key={post.id} className="flex w-[20vw] flex-col border border-black xl:w-[15vw]">
              {openPost.modifyId === post.id ? (
                <PostItemModify
                  post={post}
                  onChangeTextHandler={onChangeTextHandler}
                  onChangeSelectHandler={onChangeSelectHandler}
                />
              ) : (
                <PostItem post={post} />
              )}
              <div className="flex w-full flex-col gap-4 py-2">
                <EditButtons
                  postId={post.id}
                  postPhotoUrl={post.photoUrl}
                  openPost={openPost}
                  modifyPost={modifyPost}
                  openPostHandler={openPostHandler}
                  initialModifyPost={initialModifyPost}
                />
                <AddImage
                  postId={post.id}
                  postPhotoUrl={post.photoUrl}
                  fileList={fileList}
                  onChangeFileHandler={onChangeFileHandler}
                  initialFileListHandler={initialFileListHandler}
                />
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
