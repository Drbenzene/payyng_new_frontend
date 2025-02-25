import React from "react";
import ModalLayout from "../layouts/ModalLayout";
import { Formik } from "formik";
import * as Yup from "yup";
import PayyngButton from "../button/PayyngButton";
import { updatePin } from "@/hooks/useAuth";
import { toast } from "sonner";
import { PayyngOTP } from "../inputs/PayyngOTP";

interface ChangeTransactionPin {
  open: boolean;
  setOpen: (open: boolean) => void;
}

function ChangeTransactionPin({ open, setOpen }: ChangeTransactionPin) {
  const updatetransactionPinHandler = async (values: any) => {
    const payload = {
      newPin: Number(values.newpin),
      currentPin: Number(values.currentPin),
    };
    const res = await updatePin(payload);
    if (res) {
      toast.success("Transaction Pin Updated Successfully");
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
            Transaction Pin Reset
          </p>
        </div>

        <Formik
          initialValues={{
            currentPin: "",
            newpin: "",
            confirmNewPin: "",
          }}
          validationSchema={Yup.object({
            currentPin: Yup.string().required("Current Password is Required"),
            newpin: Yup.string().required("New Password is Required"),
            confirmNewPin: Yup.string()
              .required("Confirm Password is Required")
              .oneOf([Yup.ref("newpin"), ""], "Passwords must match"),
          })}
          onSubmit={async (values, { setSubmitting, setErrors }) => {
            await updatetransactionPinHandler(values);
            setSubmitting(false);
          }}
        >
          {({
            values,
            errors,
            setValues,
            handleSubmit,
            isSubmitting,
            isValid,
          }) => (
            <form onSubmit={handleSubmit}>
              <div className="mt-5 grid grid-cols-1 gap-2 ">
                <PayyngOTP
                  label="Current Transaction Pin"
                  maxLength={4}
                  pattern={""}
                  value={values.currentPin}
                  name={"currentPin"}
                  id={"currentPin"}
                  setValues={setValues}
                  values={values}
                  error={errors?.currentPin}
                />

                <PayyngOTP
                  label="New  Pin"
                  maxLength={4}
                  pattern={""}
                  value={values.newpin}
                  name={"newpin"}
                  id={"newpin"}
                  setValues={setValues}
                  values={values}
                  error={errors?.newpin}
                />

                <PayyngOTP
                  maxLength={4}
                  pattern={""}
                  value={values.confirmNewPin}
                  name={"confirmNewPin"}
                  id={"confirmNewPin"}
                  setValues={setValues}
                  values={values}
                  error={errors?.confirmNewPin}
                  label="Confirm Transaction Pin"
                />
              </div>

              <div className="mt-5">
                <PayyngButton
                  disabled={isSubmitting || !isValid}
                  isProcessing={isSubmitting}
                  text={"CHANGE PIN"}
                />
              </div>
            </form>
          )}
        </Formik>
      </div>
    </ModalLayout>
  );
}

export default ChangeTransactionPin;
