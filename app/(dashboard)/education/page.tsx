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
import { getEducationList, purchaseEducation } from "@/hooks/useBill";
import { BillsPaymentSkeleton } from "@/app/components/skeletons/BillsSkeleton";

function Page() {
  const [open, setOpen] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);
  const [educationList, setEducationList] = useState<any>(null);
  const [showJamb, setShowJamb] = useState(false);

  const purchaseEducationHandler = async (values: any) => {
    setProcessing(true);
    const res = await purchaseEducation({
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

  useEffect(() => {
    if (typeof window !== "undefined") {
      const getEducationListHandler = async () => {
        const res = await getEducationList();
        if (res) {
          setEducationList(res);
        }
      };
      //ensure that this is triggered once

      getEducationListHandler();
    }
  }, []);

  return (
    <div className="flex flex-col justify-center items-center">
      <p className="text-2xl font-semibold text-gray-800">Education</p>
      <p className="text-gray-500 mt-2">Purchase Education PIN</p>
      <div className="md:w-[500px] w-full  bg-white rounded-xl shadow-lg p-5 mt-5">
        {!educationList && <BillsPaymentSkeleton />}

        {educationList && (
          <ContentLayout>
            <div>
              <Formik
                initialValues={{
                  amount: "",
                  account: "",
                  id: "",
                }}
                validationSchema={Yup.object({
                  id: Yup.string().required("Education is Required"),
                  amount: Yup.string().required("Amount is Required"),
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
                  <form
                    className="grid grid-cols-1 gap-y-4"
                    onSubmit={handleSubmit}
                  >
                    {educationList && (
                      <div>
                        <PayyngInput
                          inputType="SELECT"
                          label="Choose Education"
                          placeholder="Select Education"
                          name="id"
                          onChange={async (value: any) => {
                            const selectedEducation = educationList.find(
                              (item: any) => item.id === value
                            );
                            const amount = selectedEducation?.amount;
                            if (
                              selectedEducation?.name
                                ?.toLowerCase()
                                .includes("jamb")
                            ) {
                              setShowJamb(true);
                            } else {
                              setShowJamb(false);
                            }

                            console.log(amount, "THE AMOUNT");
                            setValues({
                              ...values,
                              id: value,
                              amount: amount?.toString(),
                            });
                            console.log(values, "THE VALUES AFTERRRR");
                          }}
                          onBlur={handleBlur}
                          value={values.id}
                          error={errors.id}
                          touched={touched.id}
                          values={values}
                          setValues={setValues}
                          id={"id"}
                          data={(educationList || []).map((item: any) => ({
                            ...item,
                            value: item?.id,
                            label: item?.name,
                          }))}
                          type={"text"}
                        />
                      </div>
                    )}

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

                    {showJamb && (
                      <div>
                        <PayyngInput
                          inputType="TEXT"
                          label="Jamb Registration Number"
                          placeholder="Enter Jamb Registration Number"
                          name="account"
                          type="text"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.account}
                          error={errors.account}
                          touched={touched.account}
                          id={"account"}
                        />
                      </div>
                    )}

                    <div className="mt-5">
                      <PayyngButton
                        onClick={handleSubmit}
                        isProcessing={isSubmitting}
                        disabled={!isValid || isSubmitting}
                        text="PROCEED"
                      />
                    </div>

                    {open && (
                      <ConfirmTransactionModal
                        open={open}
                        setOpen={setOpen}
                        title={"CONFIRM TRANSACTION"}
                        proceedHandler={(transactionPin: string) => {
                          purchaseEducationHandler({
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
        )}
      </div>

      {success && (
        <TransactionSuccess
          description="Your education pin purchase was completed successful. Please check your email for the pin details. Thanks for choosing Payyng"
          open={success}
          setOpen={setSuccess}
        />
      )}
    </div>
  );
}

export default Page;
