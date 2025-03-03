export const transactionColumns = [
  {
    id: "createdAt",
    name: "Date",
  },
  {
    id: "reference",
    name: "Reference",
  },
  {
    id: "transactionType",
    name: "Type",
  },
  {
    id: "amount",
    name: "Amount",
  },
  {
    id: "status",
    name: "Status",
  },
];

const countryList = [
  { label: "Afghanistan", value: "AF" },
  { label: "Åland Islands", value: "AX" },
  { label: "Albania", value: "AL" },
  { label: "Algeria", value: "DZ" },
  { label: "American Samoa", value: "AS" },
  { label: "Andorra", value: "AD" },
  { label: "Angola", value: "AO" },
  { label: "Anguilla", value: "AI" },
  { label: "Antarctica", value: "AQ" },
  { label: "Antigua and Barbuda", value: "AG" },
  { label: "Argentina", value: "AR" },
  { label: "Armenia", value: "AM" },
  { label: "Australia", value: "AU" },
  { label: "Austria", value: "AT" },
  { label: "Azerbaijan", value: "AZ" },
  { label: "Bahamas", value: "BS" },
  { label: "Bahrain", value: "BH" },
  { label: "Bangladesh", value: "BD" },
  { label: "Barbados", value: "BB" },
  { label: "Belarus", value: "BY" },
  { label: "Belgium", value: "BE" },
  { label: "Belize", value: "BZ" },
  { label: "Benin", value: "BJ" },
  { label: "Bhutan", value: "BT" },
  { label: "Bolivia", value: "BO" },
  { label: "Bosnia and Herzegovina", value: "BA" },
  { label: "Botswana", value: "BW" },
  { label: "Brazil", value: "BR" },
  { label: "Brunei", value: "BN" },
  { label: "Bulgaria", value: "BG" },
  { label: "Burkina Faso", value: "BF" },
  { label: "Burundi", value: "BI" },
  { label: "Cambodia", value: "KH" },
  { label: "Cameroon", value: "CM" },
  { label: "Canada", value: "CA" },
  { label: "Cape Verde", value: "CV" },
  { label: "Central African Republic", value: "CF" },
  { label: "Chad", value: "TD" },
  { label: "Chile", value: "CL" },
  { label: "China", value: "CN" },
  { label: "Colombia", value: "CO" },
  { label: "Comoros", value: "KM" },
  { label: "Congo", value: "CG" },
  { label: "Congo (Democratic Republic)", value: "CD" },
  { label: "Costa Rica", value: "CR" },
  { label: "Croatia", value: "HR" },
  { label: "Cuba", value: "CU" },
  { label: "Cyprus", value: "CY" },
  { label: "Czech Republic", value: "CZ" },
  { label: "Denmark", value: "DK" },
  { label: "Djibouti", value: "DJ" },
  { label: "Dominican Republic", value: "DO" },
  { label: "Ecuador", value: "EC" },
  { label: "Egypt", value: "EG" },
  { label: "El Salvador", value: "SV" },
  { label: "Estonia", value: "EE" },
  { label: "Ethiopia", value: "ET" },
  { label: "Finland", value: "FI" },
  { label: "France", value: "FR" },
  { label: "Germany", value: "DE" },
  { label: "Ghana", value: "GH" },
  { label: "Greece", value: "GR" },
  { label: "Greenland", value: "GL" },
  { label: "Guatemala", value: "GT" },
  { label: "Honduras", value: "HN" },
  { label: "Hungary", value: "HU" },
  { label: "Iceland", value: "IS" },
  { label: "India", value: "IN" },
  { label: "Indonesia", value: "ID" },
  { label: "Iran", value: "IR" },
  { label: "Iraq", value: "IQ" },
  { label: "Ireland", value: "IE" },
  { label: "Israel", value: "IL" },
  { label: "Italy", value: "IT" },
  { label: "Jamaica", value: "JM" },
  { label: "Japan", value: "JP" },
  { label: "Jordan", value: "JO" },
  { label: "Kenya", value: "KE" },
  { label: "Kuwait", value: "KW" },
  { label: "Lebanon", value: "LB" },
  { label: "Malaysia", value: "MY" },
  { label: "Mexico", value: "MX" },
  { label: "Netherlands", value: "NL" },
  { label: "New Zealand", value: "NZ" },
  { label: "Nigeria", value: "NG" },
  { label: "Norway", value: "NO" },
  { label: "Pakistan", value: "PK" },
  { label: "Peru", value: "PE" },
  { label: "Philippines", value: "PH" },
  { label: "Poland", value: "PL" },
  { label: "Portugal", value: "PT" },
  { label: "Qatar", value: "QA" },
  { label: "Romania", value: "RO" },
  { label: "Russia", value: "RU" },
  { label: "Saudi Arabia", value: "SA" },
  { label: "Singapore", value: "SG" },
  { label: "South Africa", value: "ZA" },
  { label: "South Korea", value: "KR" },
  { label: "Spain", value: "ES" },
  { label: "Sri Lanka", value: "LK" },
  { label: "Sweden", value: "SE" },
  { label: "Switzerland", value: "CH" },
  { label: "Thailand", value: "TH" },
  { label: "Turkey", value: "TR" },
  { label: "Ukraine", value: "UA" },
  { label: "United Arab Emirates", value: "AE" },
  { label: "United Kingdom", value: "GB" },
  { label: "United States of America", value: "US" },
  { label: "Venezuela", value: "VE" },
  { label: "Vietnam", value: "VN" },
  { label: "Zambia", value: "ZM" },
  { label: "Zimbabwe", value: "ZW" },
];

export default countryList;

export enum Currency {
  USD = "USD",
  NGN = "NGN",
  GBP = "GBP",
  EUR = "EUR",
  CAD = "CAD",
  AUD = "AUD",
  JPY = "JPY",
  CNY = "CNY",
  INR = "INR",
  SAR = "SAR",
  AED = "AED",
  ZAR = "ZAR",
  GHS = "GHS",
  KES = "KES",
  UGX = "UGX",
  RWF = "RWF",
  TZS = "TZS",
  XAF = "XAF",
  XCD = "XCD",
  XPF = "XPF",
  XOF = "XOF",
}

export const currencyArray = [
  { label: "USD", value: Currency.USD },
  { label: "NGN", value: Currency.NGN },
  { label: "GBP", value: Currency.GBP },
  { label: "EUR", value: Currency.EUR },
];

export const networkProviders = [
  {
    name: "MTN",
    logo: "/mtn.svg",
    id: 1,
    slug: "mtn",
  },
  {
    id: 2,
    name: "Airtel",
    logo: "/airtel-nigeria.svg", // Glo Nigeria
    slug: "airtel",
  },
  {
    id: 3,
    name: "Glo",
    logo: "/globacom-limited.svg", // Glo Nigeria
    slug: "glo",
  },
  {
    id: 4,
    name: "9mobile",
    logo: "/9mobile.svg",
    slug: "9mobile",
  },
];

export const electricityProviders = [
  {
    slug: "ikedc",
    serviceID: "ikeja-electric",
    name: "Ikeja Electric Payment - IKEDC",
    minimium_amount: "500",
    maximum_amount: 400000,
    convinience_fee: "N0.00",
    product_type: "flexible",
    image:
      "https://vtpass.com/resources/products/200X200/Ikeja-Electric-Payment-PHCN.jpg",
  },
  {
    slug: "ekedc",
    serviceID: "eko-electric",
    name: "Eko Electric Payment - EKEDC",
    minimium_amount: "1000",
    maximum_amount: 100000,
    convinience_fee: "N0.00",
    product_type: "flexible",
    image:
      "https://vtpass.com/resources/products/200X200/Eko-Electric-Payment-PHCN.jpg",
  },
  {
    slug: "aedc",
    serviceID: "abuja-electric",
    name: "Abuja Electricity Distribution Company- AEDC",
    minimium_amount: "900",
    maximum_amount: 1000000,
    convinience_fee: "0.00 %",
    product_type: "flexible",
    image: "https://vtpass.com/resources/products/200X200/Abuja-Electric.jpg",
  },
  {
    slug: "kedco",
    serviceID: "kano-electric",
    name: "KEDCO - Kano Electric",
    minimium_amount: "500",
    maximum_amount: 500000,
    convinience_fee: "N0.00",
    product_type: "flexible",
    image: "https://vtpass.com/resources/products/200X200/Kano-Electric.jpg",
  },
  {
    slug: "phedc",
    serviceID: "portharcourt-electric",
    name: "PHED - Port Harcourt Electric",
    minimium_amount: "100",
    maximum_amount: 10000000,
    convinience_fee: "N0.00",
    product_type: "flexible",
    image:
      "https://vtpass.com/resources/products/200X200/Port-Harcourt-Electric.jpg",
  },
  {
    slug: "jed",
    serviceID: "jos-electric",
    name: "Jos Electric - JED",
    minimium_amount: "1000",
    maximum_amount: 500000,
    convinience_fee: "N0.00",
    product_type: "flexible",
    image: "https://vtpass.com/resources/products/200X200/Jos-Electric-JED.jpg",
  },
  {
    slug: "kaduna",
    serviceID: "kaduna-electric",
    name: "Kaduna Electric - KAEDCO",
    minimium_amount: "1100",
    maximum_amount: 100000,
    convinience_fee: "N0.00",
    product_type: "flexible",
    image:
      "https://vtpass.com/resources/products/200X200/Kaduna-Electric-KAEDCO.jpg",
  },
  {
    slug: "eedc",
    serviceID: "enugu-electric",
    name: "Enugu Electric - EEDC",
    minimium_amount: "500",
    maximum_amount: 500000,
    convinience_fee: "N0.00",
    product_type: "flexible",
    image:
      "https://vtpass.com/resources/products/200X200/Enugu-Electric-EEDC.jpg",
  },
  {
    slug: "ibedc",
    serviceID: "ibadan-electric",
    name: "IBEDC - Ibadan Electricity Distribution Company",
    minimium_amount: "2000",
    maximum_amount: 500000,
    convinience_fee: "N0.00",
    product_type: "flexible",
    image:
      "https://vtpass.com/resources/products/200X200/IBEDC-Ibadan-Electricity-Distribution-Company.jpg",
  },
  {
    slug: "bedc",
    serviceID: "benin-electric",
    name: "Benin Electricity - BEDC",
    minimium_amount: "500",
    maximum_amount: 500000,
    convinience_fee: "N0.00",
    product_type: "flexible",
    image:
      "https://vtpass.com/resources/products/200X200/Benin-Electricity-BEDC.jpg",
  },
  {
    slug: "aba",
    serviceID: "aba-electric",
    name: "Aba Electric Payment - ABEDC",
    minimium_amount: "10",
    maximum_amount: 400000,
    convinience_fee: "N0.00",
    product_type: "flexible",
    image:
      "https://vtpass.com/resources/products/200X200/Aba-Electric-Payment-ABEDC.jpg",
  },
  // {
  //   serviceID: "yola",
  //   name: "Yola Electric Disco Payment - YEDC",
  //   minimium_amount: "500",
  //   maximum_amount: 500000,
  //   convinience_fee: "N0.00",
  //   product_type: "fix",
  //   image:
  //     "https://vtpass.com/resources/products/200X200/Yola-Electric-Payment-IKEDC.jpg",
  // },
];

export const cableTVProviders = [
  {
    slug: "dstv",
    serviceID: "dstv",
    name: "DSTV Subscription",
    minimium_amount: "1",
    maximum_amount: 500000,
    convinience_fee: "N0.00",
    product_type: "fix",
    image:
      "https://vtpass.com/resources/products/200X200/Pay-DSTV-Subscription.jpg",
  },
  {
    slug: "gotv",
    serviceID: "gotv",
    name: "Gotv Payment",
    minimium_amount: "1",
    maximum_amount: 500000,
    convinience_fee: "N0.00",
    product_type: "fix",
    image: "https://vtpass.com/resources/products/200X200/Gotv-Payment.jpg",
  },
  {
    slug: "startimes",
    serviceID: "startimes",
    name: "Startimes Subscription",
    minimium_amount: "50",
    maximum_amount: 200000,
    convinience_fee: "N0.00",
    product_type: "flexible",
    image:
      "https://vtpass.com/resources/products/200X200/Startimes-Subscription.jpg",
  },
  {
    slug: "dstvshomax",
    serviceID: "showmax",
    name: "ShowMax",
    minimium_amount: "100",
    maximum_amount: 100000,
    convinience_fee: "N0.00",
    product_type: "fix",
    image: "https://vtpass.com/resources/products/200X200/ShowMax.jpg",
  },
];

export const educationProvider = [
  {
    slug: "neco",
    serviceID: "waec",
    name: "WAEC Result Checker PIN",
    minimium_amount: "10",
    maximum_amount: 1000000,
    convinience_fee: "N0.00",
    product_type: "fix",
    image:
      "https://vtpass.com/resources/products/200X200/WAEC-Result-Checker-PIN.jpg",
  },
  {
    slug: "jamb",
    serviceID: "jamb",
    name: "JAMB PIN VENDING (UTME & Direct Entry)",
    minimium_amount: "3000",
    maximum_amount: 50000,
    convinience_fee: "N0.00",
    product_type: "fix",
    image:
      "https://vtpass.com/resources/products/200X200/JAMB-PIN-VENDING-(UTME-&-Direct-Entry).jpg",
  },
];

export const internetProviders = [
  {
    slug: "smile",
    serviceID: "smile",
    name: "Smile Data",
    minimium_amount: "1000",
    maximum_amount: 100000,
    convinience_fee: "N0.00",
    product_type: "flexible",
    image:
      "https://www.vtpass.com/resources/products/200X200/Smile-Payment.jpg",
  },
  {
    slug: "spectranet",
    serviceID: "spectranet",
    name: "Spectranet Subscription",
    minimium_amount: "1000",
    maximum_amount: 100000,
    convinience_fee: "N0.00",
    product_type: "flexible",
    image: "https://www.vtpass.com/resources/products/200X200/Spectranet.jpg",
  },
];
