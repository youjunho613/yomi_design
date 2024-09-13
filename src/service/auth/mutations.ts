import { useQuery } from "@tanstack/react-query";
import { checkUser } from "./auth";

export default function useAuth() {
  const queryKey = ["user"] as const;
  const fetchUser = useQuery({ queryKey, queryFn: checkUser });

  return { fetchUser };
}
