"use client";

import React, { useEffect, useState } from "react";
import ContentLayout from "@/app/components/layouts/ContentLayout";
import PayyngInput from "@/app/components/inputs/PayyngInput";
import PayyngButton from "@/app/components/button/PayyngButton";
import { Formik } from "formik";
import * as Yup from "yup";
import { Currency, internetProviders } from "@/constants/constantValues";
import ConfirmTransactionModal from "@/app/components/modals/ConfirmTransactionModal";
import TransactionSuccess from "@/app/components/modals/TransactionSuccess";
import {
  getCableTVBouquets,
  getInternetProviders,
  purchaseElectricity,
  validateSmartCard,
} from "@/hooks/useBill";
import Image from "next/image";
import PayyngLoader from "@/app/components/loader/PayyngLoader";

function Page() {
  const [open, setOpen] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);
  const [smartcardInfo, setSmartcardInfo] = useState<any>(null);
  const [bouquets, setBouquets] = useState<any>(null);
  const [processingBouquets, setProcessingBouquets] = useState(false);
  const [processingProviders, setProcessingProviders] = useState(false);
  const purchaseElectricityHandler = async (values: any) => {
    setProcessing(true);
    const res = await purchaseElectricity({
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

  const validateSmartCardHandler = async (values: any) => {
    const res = await validateSmartCard({
      ...values,
      month: 1,
    });
    if (res) {
      setSmartcardInfo(res);
    }
  };

  const getBouquets = async (service: string) => {
    setBouquets(null);
    setProcessingBouquets(true);
    const res = await getCableTVBouquets(service);
    setProcessingBouquets(false);
    if (res) {
      console.log(res, "THE BOIUQUET RES BACKK");
      setBouquets(res);
    }
  };

  //   useEffect(() => {
  //     const getInternetProvidersHandler = async () => {
  //       setProcessingProviders(true);
  //       const res = await getInternetProviders();
  //       setProcessingProviders(false);
  //       if (res) {
  //         setInternetProviders(res);
  //       }
  //     };
  //     getInternetProvidersHandler();
  //   }, []);

  return (
    <div className="flex flex-col justify-center items-center">
      <p className="text-2xl font-semibold text-gray-800">
        Internet Subscription
      </p>
      <p className="text-gray-500 mt-2">Renew your Internet subscription</p>
      <div className="md:w-[500px] w-full  bg-white rounded-xl shadow-lg p-5 mt-5">
        <ContentLayout>
          {processingProviders && <PayyngLoader />}
          {!processingProviders && (
            <div>
              <Formik
                initialValues={{
                  amount: "",
                  service: "",
                  account: "",
                  meter_type: "",
                  plan_id: "",
                }}
                validationSchema={Yup.object({
                  account: Yup.string().required("Meter no is Required"),
                  service: Yup.string().required(
                    "Electricity provider is required"
                  ),
                  amount: smartcardInfo
                    ? Yup.string().required("Amount is Required")
                    : Yup.string(),
                })}
                onSubmit={async (values, { setSubmitting }) => {
                  if (!smartcardInfo) {
                    return validateSmartCardHandler(values);
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
                    <div className="mb-2">
                      <label
                        htmlFor={"networkProvider"}
                        className="text-sm font-semibold text-gray-600 dark:text-gray-400 pb-5"
                      >
                        Choose Internet Provider
                      </label>
                      <div className="grid grid-cols-4 gap-2 mb-5 mt-2">
                        {internetProviders.map((item: any, index: number) => (
                          <div
                            key={index}
                            className={`flex cursor-pointer flex-col justify-center items-center ${
                              values.service === item?.slug
                                ? "bg-white border-b-2 border-black"
                                : ""
                            } ${values.service === item?.slug}`}
                            onClick={() => {
                              setValues({ ...values, service: item?.slug });
                              getBouquets(item?.slug);
                            }}
                          >
                            <div className="w-12 h-12 rounded-full my-3">
                              <Image
                                src={item?.image}
                                alt="Network"
                                width={50}
                                height={50}
                                className="w-full h-full rounded-full object-cover"
                              />
                            </div>
                            <p className="text-gray-500">
                              {item?.serviceID?.toUpperCase()}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {processingBouquets && <PayyngLoader />}
                    {bouquets && (
                      <div>
                        <PayyngInput
                          inputType="SELECT"
                          label="Choose Bouquet"
                          placeholder="Select Bouquet"
                          name="plan_id"
                          onChange={async (value: any) => {
                            const amount = bouquets.find(
                              (item: any) => item.id === value
                            )?.amount;
                            console.log(amount, "THE AMOUNT");
                            setValues({
                              ...values,
                              plan_id: value,
                              amount: amount?.toString(),
                            });
                            console.log(values, "THE VALUES AFTERRRR");
                          }}
                          onBlur={handleBlur}
                          value={values.plan_id}
                          error={errors.plan_id}
                          touched={touched.plan_id}
                          values={values}
                          setValues={setValues}
                          id={"plan_id"}
                          data={(bouquets || []).map((item: any) => ({
                            ...item,
                            value: item?.id,
                            label: item?.name,
                          }))}
                          type={"text"}
                        />

                        <div>
                          <PayyngInput
                            inputType="TEXT"
                            label="Smartcard Number"
                            placeholder="Enter Smartcard Number"
                            name="account"
                            type="text"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.account}
                            error={errors.account}
                            touched={touched.account}
                            id={"account"}
                            values={values}
                            setValues={setValues}
                          />
                        </div>

                        {smartcardInfo && (
                          <div className="mt-2">
                            <PayyngInput
                              inputType="CURRENCY"
                              label="Amount"
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
                              disabled={true}
                            />
                          </div>
                        )}

                        {smartcardInfo && (
                          <div className="mt-2">
                            <p className="text-gray-500">
                              {smartcardInfo?.customer_name}
                            </p>
                            <p className="text-gray-500">
                              {smartcardInfo?.address}
                            </p>
                          </div>
                        )}

                        {!smartcardInfo && (
                          <div className="mt-5">
                            <PayyngButton
                              onClick={handleSubmit}
                              isProcessing={isSubmitting}
                              disabled={!isValid || isSubmitting}
                              text="VALIDATE SMARTCARD"
                            />
                          </div>
                        )}

                        {smartcardInfo && (
                          <div className="mt-5">
                            <PayyngButton
                              onClick={handleSubmit}
                              isProcessing={isSubmitting}
                              disabled={!isValid || isSubmitting}
                              text="PROCEED"
                            />
                          </div>
                        )}
                      </div>
                    )}

                    {open && (
                      <ConfirmTransactionModal
                        open={open}
                        setOpen={setOpen}
                        title={"CONFIRM TRANSACTION"}
                        proceedHandler={(transactionPin: string) => {
                          purchaseElectricityHandler({
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
          description="Your electricity purchase was completed successful. Thanks for choosing Payyng"
          open={success}
          setOpen={setSuccess}
        />
      )}
    </div>
  );
}

export default Page;
