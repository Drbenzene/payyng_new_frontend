"use client";

import React, { useState } from "react";
import ContentLayout from "@/app/components/layouts/ContentLayout";
import PayyngInput from "@/app/components/inputs/PayyngInput";
import PayyngButton from "@/app/components/button/PayyngButton";
import { Formik } from "formik";
import * as Yup from "yup";
import { Currency, electricityProviders } from "@/constants/constantValues";
import ConfirmTransactionModal from "@/app/components/modals/ConfirmTransactionModal";
import TransactionSuccess from "@/app/components/modals/TransactionSuccess";
import { purchaseElectricity, validateMeterNo } from "@/hooks/useBill";

function Page() {
  const [open, setOpen] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);
  const [meterInfo, setMeterInfo] = useState<any>(null);

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

  const validateMeterHandler = async (values: any) => {
    const res = await validateMeterNo({
      ...values,
      amount: 10000,
    });
    if (res) {
      console.log(res, "THE RES BACKKKK");
      setMeterInfo(res);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <p className="text-2xl font-semibold text-gray-800">Buy Electricity</p>
      <p className="text-gray-500 mt-2">
        Buy electricity units for any provider
      </p>
      <div className="md:w-[500px] w-full  bg-white rounded-xl shadow-lg p-5 mt-5">
        <ContentLayout>
          <div>
            <Formik
              initialValues={{
                amount: "",
                service: "",
                meter_number: "",
                meter_type: "",
              }}
              validationSchema={Yup.object({
                meter_number: Yup.string().required("Meter no is Required"),
                service: Yup.string().required(
                  "Electricity provider is required"
                ),
                amount: meterInfo
                  ? Yup.string().required("Amount is Required")
                  : Yup.string(),
              })}
              onSubmit={async (values, { setSubmitting }) => {
                if (!meterInfo) {
                  return validateMeterHandler(values);
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
                      label="Choose Electricity Provider"
                      placeholder="Select Electricity Provider"
                      name="service"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.service}
                      error={errors.service}
                      touched={touched.service}
                      values={values}
                      setValues={setValues}
                      id={"service"}
                      data={(electricityProviders || []).map((item: any) => ({
                        ...item,
                        value: item?.slug,
                        label: item?.name,
                      }))}
                      type={"text"}
                    />
                  </div>

                  <div>
                    <PayyngInput
                      inputType="TEXT"
                      label="Meter Number"
                      placeholder="Enter Meter Number"
                      name="meter_number"
                      type="text"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.meter_number}
                      error={errors.meter_number}
                      touched={touched.meter_number}
                      id={"meter_number"}
                      values={values}
                      setValues={setValues}
                    />
                  </div>

                  <div>
                    <PayyngInput
                      inputType="SELECT"
                      label="Choose Meter Type"
                      placeholder="Select Meter Type"
                      name="meter_type"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.meter_type}
                      error={errors.meter_type}
                      touched={touched.meter_type}
                      values={values}
                      setValues={setValues}
                      id={"meter_type"}
                      data={[
                        { value: "prepaid", label: "Prepaid" },
                        { value: "postpaid", label: "Postpaid" },
                      ]}
                      type={"text"}
                    />
                  </div>

                  {meterInfo && (
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
                      />
                    </div>
                  )}

                  {meterInfo && (
                    <div className="mt-2">
                      <p className="text-gray-500">
                        {meterInfo?.customer_name}
                      </p>
                      <p className="text-gray-500">{meterInfo?.address}</p>
                    </div>
                  )}

                  {!meterInfo && (
                    <div className="mt-5">
                      <PayyngButton
                        onClick={handleSubmit}
                        isProcessing={isSubmitting}
                        disabled={!isValid || isSubmitting}
                        text="VALIDATE METER"
                      />
                    </div>
                  )}

                  {meterInfo && (
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
