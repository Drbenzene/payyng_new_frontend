import { useQuery, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEY } from "@/constants/queryKeys";
import APICall from "@/utils/ApiCall";
import { API_METHOD, API_PATH } from "@/constants/apiType";

export async function getCards() {
  const res = await APICall(API_PATH.GET_CARDS, API_METHOD.GET);
  return res?.data;
}

export async function createCard(payload: any) {
  const res = await APICall(API_PATH.CREATE_CARD, API_METHOD.POST, payload);
  return res?.data;
}

export async function topupCard(payload: any) {
  const res = await APICall(API_PATH.TOPUP_CARD, API_METHOD.POST, payload);
  return res?.data;
}

export async function getUserCardsTransactions() {
  const res = await APICall(API_PATH.GET_CARD_TRANSACTIONS, API_METHOD.GET);
  return res?.data;
}

export function useCard() {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: [QUERY_KEY.cards],
    queryFn: getCards,
    initialData: () => {
      return queryClient.getQueryData([QUERY_KEY.cards]);
    },
  });

  return query;
}

export function useCardsTransactions() {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: [QUERY_KEY.cardTransactions],
    queryFn: getUserCardsTransactions,
    initialData: () => {
      return queryClient.getQueryData([QUERY_KEY.cardTransactions]);
    },
  });

  return query;
}
