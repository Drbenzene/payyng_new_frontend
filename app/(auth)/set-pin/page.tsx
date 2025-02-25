"use client";

import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import PayyngButton from "@/app/components/button/PayyngButton";
import AuthTitle from "@/app/components/title/AuthTitle";
import { PayyngOTP } from "@/app/components/inputs/PayyngOTP";
import { useRouter } from "next/navigation";
import { setTransactionPin } from "@/hooks/useAuth";
import { APP_PATH } from "@/constants/appPath";

function Page() {
  const { replace } = useRouter();
  const setTransactionPinHandler = async (values: any) => {
    const res = await setTransactionPin({
      pin: Number(values.pin),
    });
    if (res) {
      replace(APP_PATH.OVERVIEW);
      console.log(res);
    }
  };
  return (
    <div>
      <AuthTitle
        title={"Set Transaction Pin  "}
        subtitle={"Enter a 4 digit pin to secure your transactions"}
      />
      <Formik
        initialValues={{
          pin: "",
          confirmPin: "",
        }}
        validationSchema={Yup.object({
          pin: Yup.string()
            .required("Transaction Pin is Required")
            .matches(/^[0-9]+$/, {
              message: "OTP must be a number",
              excludeEmptyString: true,
            })
            .min(4, "OTP must be 4 digits")
            .max(4, "OTP must be 4 digits"),
        })}
        onSubmit={async (values, { setSubmitting }) => {
          await setTransactionPinHandler(values);
          setSubmitting(false);
        }}
      >
        {({
          values,
          handleSubmit,
          setValues,
          isSubmitting,
          isValid,
          errors,
        }) => (
          <form className="flex space-y-3 flex-col" onSubmit={handleSubmit}>
            <div className="flex  justify-start space-y-10 items-start w-full">
              <PayyngOTP
                maxLength={4}
                pattern={""}
                value={values.pin}
                name={"pin"}
                id={"pin"}
                setValues={setValues}
                values={values}
                error={errors?.pin}
              />
            </div>

            <div className="w-full mt-40">
              <PayyngButton
                text={"PROCEED"}
                onClick={handleSubmit}
                disabled={isSubmitting || !isValid}
                isProcessing={isSubmitting}
              />
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
}

export default Page;
