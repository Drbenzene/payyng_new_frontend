"use client";

import React, { useState } from "react";
import ContentLayout from "@/app/components/layouts/ContentLayout";
import PayyngInput from "@/app/components/inputs/PayyngInput";
import PayyngButton from "@/app/components/button/PayyngButton";
import { Formik } from "formik";
import * as Yup from "yup";
import { networkProviders } from "@/constants/constantValues";
import Image from "next/image";
import ConfirmTransactionModal from "@/app/components/modals/ConfirmTransactionModal";
import TransactionSuccess from "@/app/components/modals/TransactionSuccess";
import { getDataProviderPlan, purchaseData } from "@/hooks/useBill";
import { Currency } from "@/constants/constantValues";
import PayyngLoader from "@/app/components/loader/PayyngLoader";
import { BillsPaymentSkeleton } from "@/app/components/skeletons/BillsSkeleton";

function Page() {
  const [open, setOpen] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);
  const [dataPlans, setDataPlans] = useState<any>(null);

  const purchaseDataHandler = async (values: any) => {
    setProcessing(true);
    const res = await purchaseData({
      ...values,
      amount: Number(values.amount),
      phone: values.phone.replace("+234", "0"),
    });
    setProcessing(false);
    if (res) {
      setOpen(false);
      setSuccess(true);
    }
    console.log(values);
  };

  const getDataProviderPlanHandler = async (network: string) => {
    setProcessing(true);
    setDataPlans(null);
    const res = await getDataProviderPlan(network);
    setProcessing(false);

    if (res) {
      console.log(res, "THE RES BACKKKK");
      setDataPlans(res[0]?.plans);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <p className="text-2xl font-semibold text-gray-800">Buy Data Plan</p>
      <p className="text-gray-500 mt-2">
        Buy data plan for any network provider
      </p>

      <div className="md:w-[500px] w-full  bg-white rounded-xl shadow-lg p-5 mt-5">
        <ContentLayout>
          <div>
            <Formik
              initialValues={{
                phone: "",
                amount: "",
                network: "",
                plan: "",
              }}
              validationSchema={Yup.object({
                phone: Yup.string().required("Required"),
                amount: Yup.string().required("Required"),
                network: Yup.string().required("Network provider is required"),
                plan: Yup.string().required("Data Plan is required"),
              })}
              onSubmit={async (values, { setSubmitting }) => {
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
                <form onSubmit={handleSubmit}>
                  <div className="mb-2">
                    <label
                      htmlFor={"networkProvider"}
                      className="text-sm font-semibold text-gray-600 dark:text-gray-400 pb-5"
                    >
                      Choose Network Provider
                    </label>
                    <div className="grid grid-cols-4 gap-2 mb-5 mt-2">
                      {networkProviders.map((item, index) => (
                        <div
                          key={index}
                          className={`flex cursor-pointer flex-col justify-center items-center ${
                            values.network === item?.slug
                              ? "bg-white border-b-2 border-black"
                              : ""
                          } ${values.network === item?.slug}`}
                          onClick={() => {
                            setValues({ ...values, network: item?.slug });
                            getDataProviderPlanHandler(item?.slug);
                          }}
                        >
                          <div className="w-12 h-12 rounded-full my-3">
                            <Image
                              src={item?.logo}
                              alt="Network"
                              width={50}
                              height={50}
                              className="w-full h-full rounded-full object-cover"
                            />
                          </div>
                          <p className="text-gray-500">{item?.name}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  {processing && <BillsPaymentSkeleton />}
                  {dataPlans && (
                    <>
                      <div>
                        <PayyngInput
                          inputType="SELECT"
                          label="Choose Data Plan"
                          placeholder="Select Data Plan"
                          name="plan"
                          onChange={async (value: any) => {
                            const amount = dataPlans.find(
                              (item: any) => item.plan_code === value
                            )?.amount;
                            console.log(amount, "THE AMOUNT");
                            setValues({
                              ...values,
                              plan: value,
                              amount: amount?.toString(),
                            });
                            console.log(values, "THE VALUES AFTERRRR");
                          }}
                          onBlur={handleBlur}
                          value={values.plan}
                          error={errors.plan}
                          touched={touched.plan}
                          values={values}
                          setValues={setValues}
                          id={"plan"}
                          data={(dataPlans || []).map((item: any) => ({
                            ...item,
                            value: item?.plan_code,
                            label: item?.name,
                          }))}
                          type={"text"}
                        />
                      </div>

                      <div>
                        <PayyngInput
                          inputType="PHONE"
                          label="Phone Number"
                          placeholder="Phone Number"
                          name="phone"
                          type="text"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.phone}
                          error={errors.phone}
                          touched={touched.phone}
                          id={"phone"}
                          values={values}
                          setValues={setValues}
                        />
                      </div>

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

                      <div className="mt-5">
                        <PayyngButton
                          onClick={handleSubmit}
                          isProcessing={isSubmitting}
                          disabled={!isValid || isSubmitting}
                          text="Buy Airtime"
                        />
                      </div>
                    </>
                  )}

                  {open && (
                    <ConfirmTransactionModal
                      open={open}
                      setOpen={setOpen}
                      title={"CONFIRM TRANSACTION"}
                      proceedHandler={(transactionPin: string) => {
                        purchaseDataHandler({
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
        </ContentLayout>
      </div>

      {success && (
        <TransactionSuccess
          description="Your airtime purchase was successful. Thanks for choosing Payyng"
          open={success}
          setOpen={setSuccess}
        />
      )}
    </div>
  );
}

export default Page;
