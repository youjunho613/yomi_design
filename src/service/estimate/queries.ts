import { getEstimateList } from "./estimateService";

const queryKeys = {
  all: ["estimate"] as const,
  detail: (estimateId: string) => [...queryKeys.all, estimateId] as const,
};

const queryOptions = {
  all: () => ({
    queryKeys: queryKeys.all,
    queryFn: () => getEstimateList(),
  }),
};

export default queryOptions;
