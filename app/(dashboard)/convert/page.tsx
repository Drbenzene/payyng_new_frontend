"use client";

import { Suspense, useState } from "react";
import ContentLayout from "@/app/components/layouts/ContentLayout";
import PayyngButton from "@/app/components/button/PayyngButton";
import PayyngConversionInput from "@/app/components/inputs/PayyngConversionInput";
import { Formik } from "formik";
import * as Yup from "yup";
import { useSearchParams } from "next/navigation";
import { useRates } from "@/hooks/useRates";
import { useConfig } from "@/hooks/useConfigs";
import { currencyFormat } from "@/utils/helpers";
import { exchangeWallet } from "@/hooks/useWallet";
import { toast } from "sonner";
import TransactionSuccess from "@/app/components/modals/TransactionSuccess";
import { Currency } from "@/constants/constantValues";

function CurrencyConverter() {
  const { data: rates } = useRates();
  const { data: config } = useConfig();
  const [open, setOpen] = useState(false);
  // Mock balances and rates for demo
  console.log(rates, "THE RATES");
  console.log(config, "THE CONFIG");

  const searchParams = useSearchParams();
  const currency = searchParams.get("currency");

  const exchangeHandler = async (values: any) => {
    if (values.convertFrom === values.convertTo) {
      return toast.error("You can't exchange the same currency");
    }
    const res = await exchangeWallet({
      ...values,
      amount: Number(values.amount),
    });
    if (res) {
      toast.success("Exchange successful");
      setOpen(true);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center">
      <p className="text-2xl font-semibold text-gray-800">Convert Currency</p>
      <p className="text-gray-500 mt-2">
        Enter amount and choose currency to convert from
      </p>
      <div className="md:w-[500px] w-full  bg-white rounded-xl shadow-lg p-5 mt-5">
        <ContentLayout>
          <div className="space-y-4">
            <Formik
              initialValues={{
                amount: "",
                convertToAmount: "",
                convertFrom: currency || "",
                convertTo: Currency.NGN || "",
              }}
              validationSchema={Yup.object({
                amount: Yup.number().required("Amount is required"),
                convertFrom: Yup.string().required("Currency is required"),
                convertTo: Yup.string().required("Currency is required"),
              })}
              onSubmit={async (values, { setSubmitting }) => {
                await exchangeHandler(values);
                setSubmitting(false);
              }}
            >
              {({
                values,
                handleChange,
                handleBlur,
                setValues,
                isSubmitting,
                isValid,
                handleSubmit,
                errors,
              }) => (
                <form onSubmit={handleSubmit} className="mb-10">
                  <PayyngConversionInput
                    placeholder="0.00"
                    label={"Amount to convert"}
                    id={"convertFrom"}
                    name={"convertFrom"}
                    valueName={"amount"}
                    amountValue={values.amount}
                    type={"text"}
                    value={values.convertFrom}
                    onChange={(value: any) => {
                      console.log(value, "THE vavaav");
                      const inputValue = Number(value) || 0;
                      const rate = rates?.find(
                        (rate: any) =>
                          rate.code ===
                          `${values?.convertFrom}-${values?.convertTo}`
                      )?.rate;
                      setValues({
                        ...values,
                        convertToAmount: (inputValue * rate).toFixed(2),
                        amount: value,
                      });
                    }}
                    onBlur={handleBlur}
                    currency={values?.convertFrom}
                    values={values}
                    setValues={setValues}
                  />

                  <div className="bg-gray-100 my-3 rounded-lg p-4 space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        Conversion Fee
                      </span>
                      <span>- {config?.conversionPercentage} %</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        Amount we'll convert
                      </span>
                      <span>
                        = {values?.convertFrom}{" "}
                        {currencyFormat(Number(values?.amount) || 0)}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        Today's rate
                      </span>
                      <span>
                        x{" "}
                        {currencyFormat(
                          rates?.find(
                            (rate: any) =>
                              rate.code ===
                              `${values?.convertFrom}-${values?.convertTo}`
                          )?.rate
                        )}
                      </span>
                    </div>
                  </div>

                  <PayyngConversionInput
                    placeholder="0.00"
                    label={"Amount you will receive"}
                    id={"convertTo"}
                    name={"convertTo"}
                    type={"text"}
                    value={values?.convertTo}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    disabled={true}
                    currency={values?.convertTo}
                    amountValue={values.convertToAmount}
                    values={values}
                    setValues={setValues}
                    error={errors.convertTo}
                  />

                  <div className="mt-5">
                    <PayyngButton
                      isProcessing={isSubmitting}
                      disabled={isSubmitting || !isValid}
                      text={"CONTINUE"}
                    />
                  </div>
                </form>
              )}
            </Formik>
          </div>
        </ContentLayout>
      </div>

      {open && (
        <TransactionSuccess
          description="Your Exchange was completed successfully. Thanks for using Payyng"
          open={open}
          setOpen={setOpen}
        />
      )}
    </div>
  );
}

export default function WrappedPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CurrencyConverter />
    </Suspense>
  );
}
