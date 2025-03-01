import { useQuery, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEY } from "@/constants/queryKeys";
import APICall from "@/utils/ApiCall";
import { API_METHOD, API_PATH } from "@/constants/apiType";

export async function purchaseAirtime(payload: any) {
  const res = await APICall(
    API_PATH.PURCHASE_AIRTIME,
    API_METHOD.POST,
    payload
  );
  return res?.data;
}

export async function validateMeterNo(payload: any) {
  const res = await APICall(
    API_PATH.VALIDATE_METER_NO,
    API_METHOD.POST,
    payload
  );
  return res?.data;
}

export async function validateBettingAccount(payload: any) {
  const res = await APICall(
    API_PATH.VALIDATE_BETTING_ACCOUNT,
    API_METHOD.POST,
    payload
  );
  return res?.data;
}

export async function purchaseElectricity(payload: any) {
  const res = await APICall(
    API_PATH.PURCHASE_ELECTRICITY,
    API_METHOD.POST,
    payload
  );
  return res?.data;
}

export async function validateSmartCard(payload: any) {
  const res = await APICall(
    API_PATH.VALIDATE_SMARTCARD,
    API_METHOD.POST,
    payload
  );
  return res?.data;
}

export async function getCableTVBouquets(service: string) {
  const res = await APICall(
    `${API_PATH.GET_BOUQUETS}?service=${service}`,
    API_METHOD.GET
  );
  return res?.data;
}

export async function getEducationList() {
  const res = await APICall(API_PATH.GET_EDUCATION_LIST, API_METHOD.GET);
  return res?.data;
}

export async function getBettingProviders() {
  const res = await APICall(API_PATH.GET_BETTING_PROVIDERS, API_METHOD.GET);
  return res?.data;
}

export async function getDataProviderPlan(network: string) {
  const res = await APICall(
    `${API_PATH.GET_DATA_PROVIDER_PLAN}?network=${network}`,
    API_METHOD.GET
  );
  return res?.data;
}

export async function purchaseEducation(payload: any) {
  const res = await APICall(
    API_PATH.PURCHASE_EDUCATION,
    API_METHOD.POST,
    payload
  );
  return res?.data;
}

export async function purchaseData(payload: any) {
  const res = await APICall(API_PATH.PURCHASE_DATA, API_METHOD.POST, payload);
  return res?.data;
}

export async function getInternetProviders() {
  const res = await APICall(API_PATH.GET_INTERNET_PROVIDERS, API_METHOD.GET);
  return res?.data;
}

export async function fundBettingAccount(payload: any) {
  const res = await APICall(API_PATH.FUND_BETTING, API_METHOD.POST, payload);
  return res?.data;
}
