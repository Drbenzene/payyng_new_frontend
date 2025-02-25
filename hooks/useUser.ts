import { useQuery, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEY } from "@/constants/queryKeys";
import APICall from "@/utils/ApiCall";
import { API_METHOD, API_PATH } from "@/constants/apiType";

export async function getUser() {
  const res = await APICall(API_PATH.GET_USER, API_METHOD.GET);
  return res?.data;
}

export async function validateUserBVN(payload: any) {
  const res = await APICall(API_PATH.VALIDATE_BVN, API_METHOD.POST, payload);
  return res;
}

export async function validateIdentity(payload: any) {
  const res = await APICall(
    API_PATH.VALIDATE_IDENTITY,
    API_METHOD.POST,
    payload
  );
  return res;
}

export function useUser() {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: [QUERY_KEY.user],
    queryFn: getUser,
    initialData: () => {
      return queryClient.getQueryData([QUERY_KEY.user]);
    },
  });

  return query;
}
