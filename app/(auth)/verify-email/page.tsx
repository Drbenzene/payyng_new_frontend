"use client";

import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import PayyngButton from "@/app/components/button/PayyngButton";
import AuthTitle from "@/app/components/title/AuthTitle";
import { PayyngOTP } from "@/app/components/inputs/PayyngOTP";
import { useRouter } from "next/navigation";
import { verifyEmail } from "@/hooks/useAuth";
import { APP_PATH } from "@/constants/appPath";
import { toast } from "sonner";

function Page() {
  const { replace } = useRouter();
  const verifyEmailHandler = async (values: any) => {
    const res = await verifyEmail({
      code: values.otp,
    });
    if (res) {
      toast.success("Email Verified Successfully");
      replace(APP_PATH.SET_PIN);
    }
  };
  return (
    <div>
      <AuthTitle
        title={"Verify Email "}
        subtitle={
          "Enter the 4 digit code sent to your email address to verify your account"
        }
      />
      <Formik
        initialValues={{
          otp: "",
        }}
        validationSchema={Yup.object({
          otp: Yup.string()
            .required("OTP is Required")
            .matches(/^[0-9]+$/, {
              message: "OTP must be a number",
              excludeEmptyString: true,
            })
            .min(4, "OTP must be 4 digits")
            .max(4, "OTP must be 4 digits"),
        })}
        onSubmit={async (values, { setSubmitting }) => {
          await verifyEmailHandler(values);
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
                value={values.otp}
                name={"otp"}
                id={"otp"}
                setValues={setValues}
                values={values}
                error={errors?.otp}
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
