import { checkUser } from "./auth";

const queryKeys = {
  all: ["auth"] as const,
};

const queryOptions = {
  all: () => ({
    queryKeys: queryKeys.all,
    queryFn: () => checkUser(),
  }),
};

export default queryOptions;
