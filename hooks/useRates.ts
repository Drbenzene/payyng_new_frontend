import { useQuery, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEY } from "@/constants/queryKeys";
import APICall from "@/utils/ApiCall";
import { API_METHOD, API_PATH } from "@/constants/apiType";

export async function getRates() {
  const res = await APICall(API_PATH.GET_RATES, API_METHOD.GET);
  return res?.data;
}

export function useRates() {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: [QUERY_KEY.rates],
    queryFn: getRates,
    initialData: () => {
      return queryClient.getQueryData([QUERY_KEY.rates]);
    },
  });

  return query;
}
