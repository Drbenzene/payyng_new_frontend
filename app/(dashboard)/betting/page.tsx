"use client";

import React, { useEffect, useState } from "react";
import ContentLayout from "@/app/components/layouts/ContentLayout";
import PayyngInput from "@/app/components/inputs/PayyngInput";
import PayyngButton from "@/app/components/button/PayyngButton";
import { Formik } from "formik";
import * as Yup from "yup";
import { Currency } from "@/constants/constantValues";
import ConfirmTransactionModal from "@/app/components/modals/ConfirmTransactionModal";
import TransactionSuccess from "@/app/components/modals/TransactionSuccess";
import {
  fundBettingAccount,
  getBettingProviders,
  validateBettingAccount,
} from "@/hooks/useBill";
import PayyngLoader from "@/app/components/loader/PayyngLoader";
import { BillsPaymentSkeleton } from "@/app/components/skeletons/BillsSkeleton";

function Page() {
  const [open, setOpen] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [processingProvider, setProcessingProvider] = useState(false);
  const [success, setSuccess] = useState(false);
  const [customerInfo, setCustomerInfo] = useState<any>(null);
  const [bettingProviders, setBettingProviders] = useState<any>(null);

  const fundBettingHandler = async (values: any) => {
    setProcessing(true);
    const res = await fundBettingAccount({
      ...values,
      amount: Number(values.amount),
    });
    setProcessing(false);
    if (res) {
      setOpen(false);
      setSuccess(true);
    }
    console.log(values);
  };

  const validateMeterHandler = async (values: any) => {
    const res = await validateBettingAccount(values);
    if (res) {
      setCustomerInfo(res);
    }
  };

  useEffect(() => {
    const getBettingProvidersHandler = async () => {
      setProcessingProvider(true);
      const res = await getBettingProviders();
      setProcessingProvider(false);
      if (res) {
        console.log(res, "THE PROVIDER RESSS");
        setBettingProviders(res);
      }
    };
    getBettingProvidersHandler();
  }, []);

  return (
    <div className="flex flex-col justify-center items-center">
      <p className="text-2xl font-semibold text-gray-800">Betting</p>
      <p className="text-gray-500 mt-2">Fund your betting account</p>
      <div className="md:w-[500px] w-full  bg-white rounded-xl shadow-lg p-5 mt-5">
        <ContentLayout>
          {processingProvider && <BillsPaymentSkeleton />}
          {!processingProvider && (
            <div>
              <Formik
                initialValues={{
                  phone: "",
                  amount: "",
                  bet_id: "",
                  customer_id: "",
                }}
                validationSchema={Yup.object({
                  customer_id: Yup.string().required("Customer ID is Required"),
                  bet_id: Yup.string().required("Beeting Partner is required"),
                })}
                onSubmit={async (values, { setSubmitting }) => {
                  if (!customerInfo) {
                    return await validateMeterHandler(values);
                    setSubmitting(false);
                  }
                  setOpen(true);
                  setSubmitting(false);
                }}
              >
                {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  isSubmitting,
                  isValid,
                  setValues,
                }) => (
                  <form
                    className="grid grid-cols-1 gap-y-4"
                    onSubmit={handleSubmit}
                  >
                    <div>
                      <PayyngInput
                        inputType="SELECT"
                        label="Choose Betting Partner"
                        placeholder="Select Betting"
                        name="bet_id"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.bet_id}
                        error={errors.bet_id}
                        touched={touched.bet_id}
                        values={values}
                        setValues={setValues}
                        id={"bet_id"}
                        data={(bettingProviders || []).map((item: any) => ({
                          ...item,
                          value: item?.id,
                          label: item?.title,
                        }))}
                        type={"text"}
                      />
                    </div>

                    <div>
                      <PayyngInput
                        inputType="TEXT"
                        label="Customer ID"
                        placeholder="Enter your customer ID"
                        name="customer_id"
                        type="text"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.customer_id}
                        error={errors.customer_id}
                        touched={touched.customer_id}
                        id={"customer_id"}
                      />
                    </div>

                    {customerInfo && (
                      <div className="mt-2">
                        <PayyngInput
                          inputType="CURRENCY"
                          label="Funding Amount"
                          placeholder="Amount"
                          name="amount"
                          type="text"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.amount}
                          error={errors.amount}
                          touched={touched.amount}
                          values={values}
                          setValues={setValues}
                          id={"amount"}
                          currency={Currency.NGN}
                        />
                      </div>
                    )}

                    {customerInfo && (
                      <div className="mt-2">
                        <p className="text-gray-500">{customerInfo?.name}</p>
                      </div>
                    )}

                    {!customerInfo && (
                      <div className="mt-5">
                        <PayyngButton
                          onClick={handleSubmit}
                          isProcessing={isSubmitting}
                          disabled={!isValid || isSubmitting}
                          text="VALIDATE BETTING ACCOUNT"
                        />
                      </div>
                    )}

                    {customerInfo && (
                      <div className="mt-5">
                        <PayyngButton
                          onClick={handleSubmit}
                          isProcessing={isSubmitting}
                          disabled={!isValid || isSubmitting}
                          text="PROCEED"
                        />
                      </div>
                    )}

                    {open && (
                      <ConfirmTransactionModal
                        open={open}
                        setOpen={setOpen}
                        title={"CONFIRM TRANSACTION"}
                        proceedHandler={(transactionPin: string) => {
                          fundBettingHandler({
                            ...values,
                            transactionPin: transactionPin,
                          });
                        }}
                        processing={processing}
                      />
                    )}
                  </form>
                )}
              </Formik>
            </div>
          )}
        </ContentLayout>
      </div>

      {success && (
        <TransactionSuccess
          description="Your betting account has been funded successfully. Thank you for using Payyng"
          open={success}
          setOpen={setSuccess}
        />
      )}
    </div>
  );
}

export default Page;
