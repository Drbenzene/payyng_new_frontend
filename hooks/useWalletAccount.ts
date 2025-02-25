import { useQuery, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEY } from "@/constants/queryKeys";
import APICall from "@/utils/ApiCall";
import { API_METHOD, API_PATH } from "@/constants/apiType";

async function getWalletAccounts() {
  const res = await APICall(API_PATH.GET_WALLET_ACCOUNT, API_METHOD.GET);
  return res?.data;
}

export function useWalletAccount() {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: [QUERY_KEY.walletAccount],
    queryFn: getWalletAccounts,
    initialData: () => {
      return queryClient.getQueryData([QUERY_KEY.walletAccount]);
    },
  });

  return query;
}
