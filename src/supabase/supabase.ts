import { createClient } from "@supabase/supabase-js";
import { Database } from "./type";
import uuid from "react-uuid";

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

export const supabase = createClient<Database>(SUPABASE_URL ?? "", process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "");

export const uploadStorage = async ({ bucket, id, file }: IUploadStorage) => {
  const { data, error } = await supabase.storage.from(bucket).upload(id, file);

  if (error) console.error("uploadStorage : ", error);
  return data;
};

export const fileToUrls = ({ bucket, fileList }: IFileToUrls) => {
  const fileUrls: string[] = [];
  const files = Array.from(fileList);
  files.forEach(async (file) => {
    const uid = uuid();
    await uploadStorage({ bucket, id: uid, file });
    fileUrls.push(uid);
  });

  return fileUrls;
};

export const STORAGE_URL = `${process.env.NEXT_PUBLIC_SUPABASE_URL ?? ""}/storage/v1/object/public`;