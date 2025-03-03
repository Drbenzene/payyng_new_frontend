import React from "react";
import ModalLayout from "../layouts/ModalLayout";
import { Formik } from "formik";
import * as Yup from "yup";
import PayyngInput from "../inputs/PayyngInput";
import PayyngButton from "../button/PayyngButton";
import { Currency } from "@/constants/constantValues";
import { fundWallet } from "@/hooks/useWallet";

interface AddMoneyModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}
function AddMoneyModal({ open, setOpen }: AddMoneyModalProps) {
  const walletTopupHandler = async (values: any) => {
    const payload = {
      amount: Number(values.amount),
      redirectUrl: window.location.href /* Redirect to the current page */,
    };
    const res = await fundWallet(payload);
    if (res) {
      sessionStorage.setItem("paystackRef", res.reference);
      // OPEN THE PAYSTACK PAYMENT LINK IN A NEW WINDOW
      window.open(res.authorization_url, "_blank");
      setOpen(false);
    }
  };

  return (
    <ModalLayout
      maxWidth="max-w-[450px]"
      open={open}
      setOpen={setOpen}
      title={""}
    >
      <div>
        <div className="flex flex-col justify-start items-center">
          <p className="text-gray-500 text-start mt-2 text-2xl font-extrabold">
            Fund Your Wallet
          </p>
        </div>

        <Formik
          initialValues={{
            amount: "",
          }}
          validationSchema={Yup.object({
            amount: Yup.string().required("Amount is Required"),
          })}
          onSubmit={async (values, { setSubmitting }) => {
            await walletTopupHandler(values);
            setSubmitting(false);
            console.log(values);
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            setValues,
            handleSubmit,
            isSubmitting,
            isValid,
          }) => (
            <form onSubmit={handleSubmit}>
              <div className="mt-5">
                <PayyngInput
                  inputType="CURRENCY"
                  label="Amount"
                  name="amount"
                  type="number"
                  value={values.amount}
                  onChange={handleChange}
                  error={errors.amount}
                  touched={touched.amount}
                  id={"amount"}
                  placeholder={"Enter Topup Amount"}
                  onBlur={handleBlur}
                  currency={Currency.NGN}
                  values={values}
                  setValues={setValues}
                />
              </div>

              <div className="mt-5">
                <PayyngButton
                  disabled={isSubmitting || !isValid}
                  isProcessing={isSubmitting}
                  text={"ADD MONEY"}
                />
              </div>
            </form>
          )}
        </Formik>
      </div>
    </ModalLayout>
  );
}

export default AddMoneyModal;
