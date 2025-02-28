"use client";

import React from "react";
import PayyngInput from "@/app/components/inputs/PayyngInput";
import { Formik } from "formik";
import * as Yup from "yup";
import PayyngButton from "@/app/components/button/PayyngButton";
import AuthTitle from "@/app/components/title/AuthTitle";
import { signUp } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { APP_PATH } from "@/constants/appPath";

function Page() {
  const { replace } = useRouter();
  const registerHandler = async (values: any) => {
    const res = await signUp(values);
    if (res) {
      console.log(res, "THE RESSSS OOOOO");
      localStorage.setItem("accessToken", res?.accessToken);
      replace(APP_PATH.VERIFY_EMAIL);
      console.log(res);
    }
  };

  return (
    <div>
      <AuthTitle
        title={"Sign up "}
        subtitle={"Sign up and start enjoying Payyng in 5 minutes"}
      />

      <Formik
        initialValues={{
          email: "",
          phoneNumber: "",
          password: "",
          confirmPassword: "",
          referralCode: "",
        }}
        validationSchema={Yup.object({
          email: Yup.string()
            .email("Invalid email address")
            .required("Email address is Required"),
          password: Yup.string()
            .min(6, "Must be 6 characters or more")
            .required("Required"),
          phoneNumber: Yup.string().required("Required"),
          confirmPassword: Yup.string()
            .oneOf([Yup.ref("password")], "Passwords must match")
            .required("Required"),
          // referralCode: Yup.string(),
        })}
        onSubmit={async (values, { setSubmitting }) => {
          await registerHandler(values);
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
            <PayyngInput
              inputType="PHONE"
              id={"phoneNumber"}
              label={"Phone Number"}
              name={"phoneNumber"}
              type={"phoneNumber"}
              placeholder={"Enter your phone number"}
              value={values.phoneNumber}
              onChange={handleChange}
              onBlur={handleBlur}
              setValues={setValues}
              values={values}
              error={errors.phoneNumber}
            />
            <PayyngInput
              id={"password"}
              label={"Password"}
              name={"password"}
              type={"password"}
              placeholder={"Enter your password"}
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <PayyngInput
              id={"confirmPassword"}
              label={"Confirm Password"}
              name={"confirmPassword"}
              type={"password"}
              placeholder={"Confirm your password"}
              value={values.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.confirmPassword}
            />

            <PayyngInput
              id={"referralCode"}
              label={"Referral Code"}
              name={"referralCode"}
              type={"referralCode"}
              placeholder={"Enter Your Referral Code (Optional) "}
              value={values.referralCode}
              error={errors.referralCode}
              onChange={handleChange}
              onBlur={handleBlur}
            />

            <div className="w-full mt-20">
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
