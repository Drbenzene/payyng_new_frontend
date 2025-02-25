"use client";

import React, { useState } from "react";
import PayyngInput from "@/app/components/inputs/PayyngInput";
import { Formik } from "formik";
import * as Yup from "yup";
import PayyngButton from "@/app/components/button/PayyngButton";
import AuthTitle from "@/app/components/title/AuthTitle";
import { useRouter } from "next/navigation";
import { forgetPassword, resetPassword } from "@/hooks/useAuth";
import { toast } from "sonner";
import { PayyngOTP } from "@/app/components/inputs/PayyngOTP";
import { APP_PATH } from "@/constants/appPath";

function Page() {
  const { push } = useRouter();
  const [showNewPassword, setShowNewPassword] = useState(false);
  const resetPasswordHandler = async (values: any) => {
    console.log(values, "THE VALUES ");
    const res = await forgetPassword(values);
    if (res) {
      toast.success("Password reset link sent to your email");
      setShowNewPassword(true);
    }
  };

  const changePasswordHandler = async (values: any) => {
    const res = await resetPassword(values);
    if (res) {
      toast.success("Password reset successfully");
      push(APP_PATH.LOGIN);
    }
  };
  return (
    <div>
      {!showNewPassword && (
        <>
          <AuthTitle
            title={"Reset Password "}
            subtitle={
              "Enter your email address to reset your password and regain access to your account"
            }
          />
          <Formik
            initialValues={{
              email: "",
            }}
            validationSchema={Yup.object({
              email: Yup.string()
                .email("Invalid email address")
                .required("Required"),
            })}
            onSubmit={async (values, { setSubmitting }) => {
              await resetPasswordHandler(values);
              setSubmitting(false);
            }}
          >
            {({
              values,
              handleChange,
              handleBlur,
              handleSubmit,
              errors,
              setValues,
              isSubmitting,
              isValid,
            }) => (
              <form className="flex space-y-3 flex-col" onSubmit={handleSubmit}>
                <PayyngInput
                  id={"email"}
                  label={"Email Address"}
                  name={"email"}
                  type={"email"}
                  placeholder={"Enter your email address"}
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.email}
                />

                <div className="w-full mt-20">
                  <PayyngButton
                    text={"PROCEED"}
                    onClick={handleSubmit}
                    isProcessing={isSubmitting}
                    disabled={isSubmitting || !isValid}
                  />
                </div>

                <p
                  onClick={() => {
                    push("/login");
                  }}
                  className="text-500 text-right"
                >
                  Remember your password?{" "}
                  <span className="text-500 text-right underline cursor-pointer font-extrabold">
                    Login
                  </span>
                </p>
              </form>
            )}
          </Formik>
        </>
      )}

      {showNewPassword && (
        <>
          <AuthTitle
            title={"Reset Password "}
            subtitle={
              "Enter the OTP code sent to your email and your new password"
            }
          />

          <Formik
            initialValues={{
              code: "",
              password: "",
              confirmPassword: "",
            }}
            validationSchema={Yup.object({
              code: Yup.string().required("Required"),
              password: Yup.string()
                .min(6, "Must be 6 characters or more")
                .required("Required"),
              confirmPassword: Yup.string()
                .oneOf([Yup.ref("password")], "Passwords must match")
                .required("Required"),
            })}
            onSubmit={async (values, { setSubmitting }) => {
              await changePasswordHandler(values);
              setSubmitting(false);
            }}
          >
            {({
              values,
              handleChange,
              handleBlur,
              handleSubmit,
              errors,
              setValues,
              isSubmitting,
              isValid,
            }) => (
              <form className="flex space-y-3 flex-col" onSubmit={handleSubmit}>
                <PayyngOTP
                  id={"code"}
                  name={"code"}
                  value={values.code}
                  error={errors.code}
                  values={values}
                  setValues={setValues}
                  maxLength={4}
                  pattern={""}
                  label="Enter OTP Code"
                />
                <PayyngInput
                  id={"password"}
                  label={"Enter Your New Password"}
                  name={"password"}
                  type={"password"}
                  placeholder={"**********"}
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.password}
                  inputType="PASSWORD"
                />

                <PayyngInput
                  id={"confirmPassword"}
                  label={"Confirm Password"}
                  name={"confirmPassword"}
                  type={"password"}
                  placeholder={"**********"}
                  value={values.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.confirmPassword}
                  inputType="PASSWORD"
                />

                <div className="w-full mt-20">
                  <PayyngButton
                    text={"RESET PASSWORD"}
                    onClick={handleSubmit}
                    isProcessing={isSubmitting}
                    disabled={isSubmitting || !isValid}
                  />
                </div>

                <p
                  onClick={() => {
                    push("/login");
                  }}
                  className="text-500 text-right"
                >
                  Remember your password?{" "}
                  <span className="text-500 text-right underline cursor-pointer font-extrabold">
                    Login
                  </span>
                </p>
              </form>
            )}
          </Formik>
        </>
      )}
    </div>
  );
}

export default Page;
