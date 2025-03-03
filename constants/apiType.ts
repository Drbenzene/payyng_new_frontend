export const API_METHOD = {
  POST: "POST" as const,
  GET: "GET" as const,
  PUT: "PUT" as const,
  DELETE: "DELETE" as const,
  PATCH: "PATCH" as const,
};

export const API_PATH = {
  LOGIN: "auth/login",
  VERIFY_EMAIL: "auth/verify-email",
  FORGET_PASSWORD: "auth/forget-password",
  RESET_PASSWORD: "auth/reset-password",
  REGISTER: "auth/register",
  SET_TRANSACTION_PIN: "auth/set-pin",
  UPDATE_PIN: "auth/change-pin",
  CHANGE_PASSWORD: "auth/change-password",
  VALIDATE_IDENTITY: "identity",

  GET_USER: "user",
  GET_WALLET: "wallet",
  GET_WALLET_ACCOUNT: "wallet-account",
  EXCHANGE_FUNDS: "wallet/exchange",

  FUND_WALLET: "wallet/initialize-payment",
  GET_GIFTCARD_PRODUCTS: "giftcard/products",
  GET_TRANSACTIONS: "transaction/me",

  GET_CONFIGS: "wallet/config",
  GET_RATES: "rates",
  CREATE_PAYPAL_INVOICE: "paypal",
  GET_PAYPAL_INVOICES: "paypal",

  GET_NIGERIA_BANKS: "wallet/banks",
  ADD_BANK: "bank",
  GET_BANKS: "bank/me",
  VALIDATE_BVN: "user/verify-bvn",
  UPDATE_PROFILE: "user/update-profile",
  RESOLVE_ACCOUNT_NUMBER: "wallet/resolve-account",

  // BILLS
  GET_BILLS: "bills",
  VALIDATE_METER_NO: "payscribe/validate-meterno",
  VALIDATE_BETTING_ACCOUNT: "payscribe/validate-betting-account",
  GET_BOUQUETS: "payscribe/bouquets",
  GET_EDUCATION_LIST: "payscribe/education",
  GET_BETTING_PROVIDERS: "payscribe/betting",
  GET_DATA_PROVIDER_PLAN: "payscribe/data",
  GET_INTERNET_PROVIDERS: "payscribe/internet",

  VALIDATE_SMARTCARD: "payscribe/validate-smartcard",
  PURCHASE_ELECTRICITY: "payscribe/purchase-electricity",
  PURCHASE_AIRTIME: "payscribe/purchase-airtime",
  PURCHASE_EDUCATION: "payscribe/purchase-education",
  PURCHASE_DATA: "payscribe/purchase-data",
  FUND_BETTING: "payscribe/fund-betting",
  PURCHASE_GIFT_CARD: "giftcard/purchase",

  //VIRTUAL CARDS
  CREATE_CARD: "card/create",
  TOPUP_CARD: "card/top-up",
  GET_CARDS: "card/me",
  GET_CARD_TRANSACTIONS: "card/transactions",
};
