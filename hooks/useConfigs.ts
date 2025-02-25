import { useQuery, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEY } from "@/constants/queryKeys";
import APICall from "@/utils/ApiCall";
import { API_METHOD, API_PATH } from "@/constants/apiType";

export async function getConfigs() {
  const res = await APICall(API_PATH.GET_CONFIGS, API_METHOD.GET);
  return res?.data;
}

export function useConfig() {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: [QUERY_KEY.configs],
    queryFn: getConfigs,
    initialData: () => {
      return queryClient.getQueryData([QUERY_KEY.configs]);
    },
  });

  return query;
}
