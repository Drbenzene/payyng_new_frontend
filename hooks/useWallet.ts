import { useQuery, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEY } from "@/constants/queryKeys";
import APICall from "@/utils/ApiCall";
import { API_METHOD, API_PATH } from "@/constants/apiType";

async function getWallet() {
  const res = await APICall(API_PATH.GET_WALLET, API_METHOD.GET);
  return res?.data;
}

export async function fundWallet(payload: any) {
  const res = await APICall(API_PATH.FUND_WALLET, API_METHOD.POST, payload);
  return res?.data;
}

export async function exchangeWallet(payload: any) {
  const res = await APICall(API_PATH.EXCHANGE_FUNDS, API_METHOD.POST, payload);
  return res?.data;
}

export function useWallet() {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: [QUERY_KEY.wallet],
    queryFn: getWallet,
    initialData: () => {
      return queryClient.getQueryData([QUERY_KEY.wallet]);
    },
  });

  return query;
}
