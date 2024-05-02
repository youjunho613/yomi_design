import { supabase } from "@/supabase/supabase";

interface ILogin {
  email: string;
  password: string;
}

export const checkUser = async () => {
  const { data } = await supabase.auth.getUser();

  return data;
};

export const login = async ({ email, password }: ILogin) => {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) return console.error(`${error.message}`);
  return data;
};

export const logout = async () => {
  const { error } = await supabase.auth.signOut();

  if (error) return console.error(`${error.message}`);
};
