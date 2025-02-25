import APICall from "@/utils/ApiCall";
import { API_METHOD, API_PATH } from "@/constants/apiType";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEY } from "@/constants/queryKeys";

export async function createInvoice(payload: any) {
  const res = await APICall(
    API_PATH.CREATE_PAYPAL_INVOICE,
    API_METHOD.POST,
    payload
  );
  return res?.data;
}

async function getPaypalInvoices() {
  const res = await APICall(API_PATH.GET_PAYPAL_INVOICES, API_METHOD.GET);
  return res?.data;
}

export function usePaypal() {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: [QUERY_KEY.paypalInvoices],
    queryFn: getPaypalInvoices,
    initialData: () => {
      return queryClient.getQueryData([QUERY_KEY.paypalInvoices]);
    },
  });

  return query;
}
