import { useQuery, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEY } from "@/constants/queryKeys";
import APICall from "@/utils/ApiCall";
import { API_METHOD, API_PATH } from "@/constants/apiType";

export async function getNigeriaBanks() {
  const res = await APICall(API_PATH.GET_NIGERIA_BANKS, API_METHOD.GET);
  return res?.data;
}

export async function addNewBank(payload: any) {
  const res = await APICall(API_PATH.ADD_BANK, API_METHOD.POST, payload);
  return res?.data;
}

export async function resolveAccountNumber(payload: any) {
  const res = await APICall(
    API_PATH.RESOLVE_ACCOUNT_NUMBER,
    API_METHOD.POST,
    payload
  );
  return res?.data;
}

export function useNigeriaBanks() {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: [QUERY_KEY.nigeriaBanks],
    queryFn: getNigeriaBanks,
    initialData: () => {
      return queryClient.getQueryData([QUERY_KEY.nigeriaBanks]);
    },
  });

  return query;
}
