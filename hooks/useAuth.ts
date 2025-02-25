import { useQuery, useQueryClient } from "@tanstack/react-query";
import APICall from "@/utils/ApiCall";
import { API_METHOD, API_PATH } from "@/constants/apiType";

export async function login(payload: any) {
  const res = await APICall(API_PATH.LOGIN, API_METHOD.POST, payload);
  return res?.data;
}

export async function verifyEmail(payload: any) {
  const res = await APICall(API_PATH.VERIFY_EMAIL, API_METHOD.POST, payload);
  return res;
}

export async function forgetPassword(payload: any) {
  const res = await APICall(API_PATH.FORGET_PASSWORD, API_METHOD.POST, payload);
  return res;
}

export async function resetPassword(payload: any) {
  const res = await APICall(API_PATH.RESET_PASSWORD, API_METHOD.POST, payload);
  return res;
}

export async function updatePin(payload: any) {
  const res = await APICall(API_PATH.UPDATE_PIN, API_METHOD.POST, payload);
  return res;
}

export async function changePassword(payload: any) {
  const res = await APICall(API_PATH.CHANGE_PASSWORD, API_METHOD.POST, payload);
  return res;
}

export async function setTransactionPin(payload: any) {
  const res = await APICall(
    API_PATH.SET_TRANSACTION_PIN,
    API_METHOD.POST,
    payload
  );
  return res;
}

export async function signUp(payload: any) {
  const res = await APICall(API_PATH.REGISTER, API_METHOD.POST, payload);
  return res?.data;
}

// export function useDraws() {
//     const queryClient = useQueryClient();

//     const query = useQuery({
//       queryKey: [QUERY_KEY.draws],
//       queryFn: fetchDraws,
//       initialData: () => {
//         return queryClient.getQueryData([QUERY_KEY.draws]);
//       },
//     });

//     return query;
//   }
