import { useQuery, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEY } from "@/constants/queryKeys";
import APICall from "@/utils/ApiCall";
import { API_METHOD, API_PATH } from "@/constants/apiType";

export async function getTransactions() {
  const res = await APICall(API_PATH.GET_TRANSACTIONS, API_METHOD.GET);
  return res?.data;
}

export function useTransaction() {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: [QUERY_KEY.transactions],
    queryFn: getTransactions,
    initialData: () => {
      return queryClient.getQueryData([QUERY_KEY.transactions]);
    },
  });

  return query;
}
