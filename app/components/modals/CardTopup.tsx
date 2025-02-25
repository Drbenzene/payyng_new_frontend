import React from "react";
import ModalLayout from "../layouts/ModalLayout";
import { Formik } from "formik";
import * as Yup from "yup";
import PayyngInput from "../inputs/PayyngInput";
import PayyngButton from "../button/PayyngButton";
import { Currency } from "@/constants/constantValues";
import { topupCard } from "@/hooks/useCard";
import { toast } from "sonner";
import { useWallet } from "@/hooks/useWallet";
import { useCard } from "@/hooks/useCard";

interface CardTopup {
  open: boolean;
  setOpen: (open: boolean) => void;
  card: any;
}
function CardTopupModal({ open, setOpen, card }: CardTopup) {
  const { refetch } = useCard();
  const { data: wallets } = useWallet();
  console.log(wallets, "the walletttt");

  const topupcardHandler = async (values: any) => {
    const payload = {
      amount: Number(values.amount),
      id: card.id,
    };
    const res = await topupCard(payload);
    if (res) {
      toast.success("Card topup successfully");
      refetch();
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
            Topup Dollar 🇺🇸 Card
          </p>
        </div>

        <Formik
          initialValues={{
            amount: "",
          }}
          validationSchema={Yup.object({
            amount: Yup.string().required("Amount is Required"),
          })}
          onSubmit={async (values, { setSubmitting, setErrors }) => {
            const wallet = wallets?.find(
              (w: any) => w.currencyCode === Currency.USD
            );
            if (Number(wallet?.balance) < Number(values.amount)) {
              return setErrors({
                amount: "Insufficient balance",
              });
            }
            await topupcardHandler(values);
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
                  label="Enter Top-up Amount"
                  name="amount"
                  type="number"
                  value={values.amount}
                  onChange={handleChange}
                  error={errors.amount}
                  touched={touched.amount}
                  id={"amount"}
                  placeholder={"Enter Topup Amount"}
                  onBlur={handleBlur}
                  currency={Currency.USD}
                  values={values}
                  setValues={setValues}
                />

                <div className="bg-gray-100 my-3 rounded-lg p-4 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Topup fee</span>
                    <span> FREE</span>
                  </div>
                </div>
              </div>

              <div className="mt-5">
                <PayyngButton
                  disabled={isSubmitting || !isValid}
                  isProcessing={isSubmitting}
                  text={"CONTINUE"}
                />
              </div>
            </form>
          )}
        </Formik>
      </div>
    </ModalLayout>
  );
}

export default CardTopupModal;
