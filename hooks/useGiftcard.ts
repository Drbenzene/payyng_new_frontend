import { useQuery, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEY } from "@/constants/queryKeys";
import APICall from "@/utils/ApiCall";
import { API_METHOD, API_PATH } from "@/constants/apiType";

export async function getGiftcard() {
  const res = await APICall(API_PATH.GET_GIFTCARD_PRODUCTS, API_METHOD.GET);
  return res?.data;
}

export async function purchaseGiftCard(payload: any) {
  const res = await APICall(
    API_PATH.PURCHASE_GIFT_CARD,
    API_METHOD.POST,
    payload
  );
  return res?.data;
}

export function useGiftCard() {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: [QUERY_KEY.giftCard],
    queryFn: getGiftcard,
    initialData: () => {
      return queryClient.getQueryData([QUERY_KEY.giftCard]);
    },
  });

  return query;
}
