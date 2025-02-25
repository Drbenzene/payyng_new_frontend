import React from "react";
import ModalLayout from "../layouts/ModalLayout";
import { Formik } from "formik";
import * as Yup from "yup";
import PayyngInput from "../inputs/PayyngInput";
import PayyngButton from "../button/PayyngButton";
import { Currency } from "@/constants/constantValues";
import { useConfig } from "@/hooks/useConfigs";
import { createCard } from "@/hooks/useCard";
import { toast } from "sonner";
import { useWallet } from "@/hooks/useWallet";
import { useCard } from "@/hooks/useCard";

interface CreateCardModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}
function CreateCardModal({ open, setOpen }: CreateCardModalProps) {
  const { refetch } = useCard();
  const { data: config } = useConfig();
  const { data: wallet } = useWallet();
  console.log(config, "the configggg");
  console.log(wallet, "the walletttt");
  const createCardHandler = async (values: any) => {
    const payload = {
      amount: Number(values.amount),
      currency: Currency.USD,
    };
    const res = await createCard(payload);
    if (res) {
      toast.success("Card created successfully");
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
            Create Dollar 🇺🇸 Card
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
            await createCardHandler(values);
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
                  label="Enter Topup Amount"
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
                    <span className="text-muted-foreground">
                      Card creation fee
                    </span>
                    <span>- ${config?.cardCreationFee}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      Amount we'll charge
                    </span>
                    <span>
                      = {Currency.USD}{" "}
                      {Number(values?.amount || 0) +
                        Number(config?.cardCreationFee)}
                    </span>
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

export default CreateCardModal;
