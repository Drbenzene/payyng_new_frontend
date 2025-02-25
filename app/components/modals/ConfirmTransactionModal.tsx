import React, { useState } from "react";
import ModalLayout from "../layouts/ModalLayout";
import { PayyngOTP } from "../inputs/PayyngOTP";
import { Formik } from "formik";
import * as Yup from "yup";
import PayyngButton from "../button/PayyngButton";

interface ConfirmTransactionModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  title: string;
  proceedHandler: (transactionPin: string) => void;
  processing: boolean;
}

function ConfirmTransactionModal({
  open,
  setOpen,
  title,
  proceedHandler,
  processing,
}: ConfirmTransactionModalProps) {
  const handleCancel = () => {};
  return (
    <div>
      <ModalLayout
        maxWidth="max-w-[400px]"
        open={open}
        setOpen={() => {
          if (processing) {
            return;
          }
          setOpen(false);
        }}
        title={title}
      >
        <div>
          <p className="text-2xl font-semibold text-gray-800">
            Enter transaction pin
          </p>

          <Formik
            initialValues={{
              transactionPin: "",
            }}
            validationSchema={Yup.object({
              transactionPin: Yup.string().required("Required"),
            })}
            onSubmit={async (values, { setSubmitting }) => {
              console.log(values);
              await proceedHandler(values.transactionPin);
              setSubmitting(false);
            }}
          >
            {({
              values,
              errors,
              handleSubmit,
              isSubmitting,
              isValid,
              setValues,
            }) => (
              <form
                onSubmit={handleSubmit}
                className=" justify-start items-start grid grid-cols-1 gap-2 mt-5"
              >
                <p className="text-sm text-gray-500">
                  Please enter your 4 digit transaction pin to confirm this
                  transaction
                </p>

                <PayyngOTP
                  name="transactionPin"
                  label=""
                  value={values.transactionPin}
                  error={errors.transactionPin}
                  setValues={setValues}
                  values={values}
                  maxLength={4}
                  pattern={""}
                  id={"transactionPin"}
                />

                <div className="mt-5">
                  <PayyngButton
                    disabled={!isValid || isSubmitting || processing}
                    text={"CONFIRM"}
                    isProcessing={isSubmitting || processing}
                    onClick={handleSubmit}
                  />
                </div>
              </form>
            )}
          </Formik>
        </div>
      </ModalLayout>
    </div>
  );
}

export default ConfirmTransactionModal;
