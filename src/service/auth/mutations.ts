import { useMutation, useQuery } from "@tanstack/react-query";
import queryOptions from "./queries";
import { checkUser, login, logout } from "./auth";
import { useRouter } from "next/navigation";

export const useAuth = () => {
  const router = useRouter();

  const getUser = useQuery({
    queryKey: queryOptions.all().queryKeys,
    queryFn: checkUser,
  });

  const loginMutation = useMutation({
    mutationKey: queryOptions.all().queryKeys,
    mutationFn: login,
    onSuccess: () => {
      router.push("/admin");
    },
    onError: (error) => {
      error.message;
    },
  });

  const logoutMutation = useMutation({
    mutationKey: queryOptions.all().queryKeys,
    mutationFn: logout,
    onSuccess: () => {
      router.push("/login");
    },
  });

  return { getUser, loginMutation, logoutMutation };
};
