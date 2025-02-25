import { useQuery, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEY } from "@/constants/queryKeys";
import APICall from "@/utils/ApiCall";
import { API_METHOD, API_PATH } from "@/constants/apiType";

export async function getBank() {
  const res = await APICall(API_PATH.GET_BANKS, API_METHOD.GET);
  return res?.data;
}

export function useBank() {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: [QUERY_KEY.bank],
    queryFn: getBank,
    initialData: () => {
      return queryClient.getQueryData([QUERY_KEY.bank]);
    },
  });

  return query;
}
