import { createClient } from "@supabase/supabase-js";
import { Database } from "./schema";

// const cookieStore = cookies();
export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";

export const supabase = createClient<Database>(SUPABASE_URL ?? "", process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "");

export const STORAGE_URL = `${process.env.NEXT_PUBLIC_SUPABASE_URL ?? ""}/storage/v1/object/public`;
