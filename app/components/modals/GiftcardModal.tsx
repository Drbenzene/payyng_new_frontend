import React, { useState, useEffect } from "react";
import ModalLayout from "../layouts/ModalLayout";
import PayyngButton from "../button/PayyngButton";
import PayyngInput from "../inputs/PayyngInput";
import { Formik } from "formik";
import * as Yup from "yup";
import { Currency } from "@/constants/constantValues";
import { purchaseGiftCard } from "@/hooks/useGiftcard";
import { useConfig } from "@/hooks/useConfigs";
import { currencyFormat } from "@/utils/helpers";

interface GiftcardModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  setSuccess: (success: boolean) => void;
  card: any;
}

function GiftcardModal({
  open,
  setOpen,
  card,
  setSuccess,
}: GiftcardModalProps) {
  const { data: config } = useConfig();
  const [exchangeRate, setExchangeRate] = useState<number>(
    card?.recipientCurrencyCode === Currency.NGN ? 1 : 0
  );
  const [convertedAmount, setConvertedAmount] = useState<number>(0);

  console.log(config, "YEYYEYE");

  // Simulating an API fetch for exchange rate (Replace with actual API)
  useEffect(() => {
    if (card?.recipientCurrencyCode && config) {
      if (card?.recipientCurrencyCode === Currency.NGN) {
        setExchangeRate(config?.ngnSellRate);
      } else if (card?.recipientCurrencyCode === Currency.USD) {
        setExchangeRate(config?.usdSellRate);
      } else if (card?.recipientCurrencyCode === Currency.EUR) {
        setExchangeRate(config?.eurSellRate);
      } else if (card?.recipientCurrencyCode === Currency.GBP) {
        setExchangeRate(config?.gbpSellRate);
      } else {
        setExchangeRate(1);
      }

      // Define a mapping between currency codes and their corresponding buy rates
      const rateMapping: Record<string, string> = {
        USD: "usdSellRate",
        EUR: "eurSellRate",
        GBP: "gbpSellRate",
        NGN: "ngnSellRate",
        PAYPAL: "paypalSellRate",
      };

      // Find the corresponding rate key
      const rateKey = rateMapping[card.recipientCurrencyCode];

      console.log(rateKey, "THE RATE KEY");
      console.log(rateMapping, "THE RATE MAPPING");
      console.log(config[rateKey], "MAGIC");
      if (rateKey && config[rateKey]) {
        // setExchangeRate(parseFloat(config[rateKey]) || 1);
      } else {
        // setExchangeRate(config?.); // Fallback rate
      }
    }
  }, [card, config]);

  const purchaseGiftCardHandler = async (values: any) => {
    const payload = {
      currency: card?.recipientCurrencyCode,
      productId: card?.productId,
      quantity: 1,
      unitPrice: Number(values.amount),
    };
    const res = await purchaseGiftCard(payload);
    if (res) {
      setOpen(false);
      setSuccess(true);
    }
  };

  return (
    <ModalLayout
      maxWidth="max-w-[500px]"
      open={open}
      setOpen={setOpen}
      title={""}
    >
      <div className="p-4">
        <Formik
          initialValues={{
            amount: "",
            productId: card?.productId,
            quantity: 1,
          }}
          validationSchema={Yup.object({
            amount: Yup.string().required("Amount is Required"),
          })}
          onSubmit={async (values, { setSubmitting }) => {
            await purchaseGiftCardHandler(values);
            setSubmitting(false);
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            isSubmitting,
            setValues,
            handleSubmit,
            isValid,
          }) => (
            <form className="grid grid-cols-1 gap-y-4" onSubmit={handleSubmit}>
              {/* Gift Card Name */}
              <p className="text-2xl font-semibold text-gray-800">
                {card?.productName}
              </p>

              {/* Exchange Rate Display */}
              <div className="bg-gray-100 p-3 rounded-lg text-gray-700 text-sm flex justify-between items-center shadow-sm">
                <span>Exchange Rate:</span>
                <span className="font-semibold text-gray-900">
                  1 {card?.recipientCurrencyCode} ={" "}
                  {currencyFormat(exchangeRate)} {Currency.NGN}
                </span>
              </div>

              {/* Dynamic Input or Selection */}
              {card?.fixedRecipientDenominations?.length <= 0 && (
                <div className="relative">
                  <PayyngInput
                    inputType="CURRENCY"
                    label="Amount"
                    placeholder="Amount"
                    name="amount"
                    type="text"
                    onChange={(e) => {
                      handleChange(e);
                      const inputValue = Number(e.target.value) || 0;
                      setConvertedAmount(Number(inputValue) * exchangeRate);
                    }}
                    onBlur={handleBlur}
                    value={values.amount}
                    error={errors.amount}
                    touched={touched.amount}
                    values={values}
                    setValues={setValues}
                    id={"amount"}
                    currency={Currency.NGN}
                  />
                  {values.amount && (
                    <p className="text-xs text-gray-500 mt-1 text-right">
                      ≈ {currencyFormat(convertedAmount.toFixed(2))}{" "}
                      {card?.recipientCurrencyCode}
                    </p>
                  )}
                </div>
              )}

              {card?.fixedRecipientDenominations?.length > 0 && (
                <>
                  <p className="text-gray-500 mb-2">Select Amount</p>
                  <div className="grid grid-cols-4 gap-2">
                    {card?.fixedRecipientDenominations.map(
                      (item: any, index: number) => {
                        const isSelected = values.amount === item;
                        return (
                          <div
                            key={index}
                            className={`cursor-pointer border rounded-lg p-3 text-center transition duration-200 
                              ${
                                isSelected
                                  ? "border-black bg-gray-100 shadow-md"
                                  : "border-gray-300 hover:border-gray-500"
                              }`}
                            onClick={() => {
                              setValues({ ...values, amount: item });
                              setConvertedAmount(item * exchangeRate);
                            }}
                          >
                            <p
                              className={`${
                                isSelected
                                  ? "text-black font-semibold"
                                  : "text-gray-600"
                              }`}
                            >
                              {card?.recipientCurrencyCode} {item}
                            </p>
                          </div>
                        );
                      }
                    )}
                  </div>
                  {values.amount && (
                    <p className="text-xs text-gray-500 mt-1 text-right">
                      ≈ {currencyFormat(convertedAmount.toFixed(2))}{" "}
                      {Currency.NGN}
                    </p>
                  )}
                </>
              )}

              {/* Purchase Button */}
              <PayyngButton
                isProcessing={isSubmitting}
                disabled={!isValid || isSubmitting}
                text="PURCHASE GIFTCARD"
              />
            </form>
          )}
        </Formik>
      </div>
    </ModalLayout>
  );
}

export default GiftcardModal;
