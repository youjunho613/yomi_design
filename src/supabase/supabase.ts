import { createClient } from "@supabase/supabase-js";
import uuid from "react-uuid";
import { Database } from "./type";

type TBucket = "estimate" | "post";

interface IUploadStorage {
  bucket: TBucket;
  id: string;
  file: File;
}

interface IFileToUrls {
  bucket: TBucket;
  fileList: FileList;
}

// const cookieStore = cookies();
export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
export const STORAGE_URL = `${process.env.NEXT_PUBLIC_SUPABASE_URL ?? ""}/storage/v1/object/public`;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";
export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY);

export const uploadStorage = async ({ bucket, id, file }: IUploadStorage) => {
  const { data, error } = await supabase.storage.from(bucket).upload(id, file);

  if (error) console.error("uploadStorage : ", error);
  return data;
};

export const fileToUrls = async ({ bucket, fileList }: IFileToUrls) => {
  const fileUrls: string[] = [];
  const files = Array.from(fileList);

  await Promise.all(
    files.map(async (file) => {
      const id = uuid();
      await uploadStorage({ bucket, id, file });
      fileUrls.push(id);
    }),
  );

  return fileUrls;
};
