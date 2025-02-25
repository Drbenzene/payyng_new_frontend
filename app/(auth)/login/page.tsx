"use client";

import React from "react";
import PayyngInput from "@/app/components/inputs/PayyngInput";
import { Formik } from "formik";
import * as Yup from "yup";
import PayyngButton from "@/app/components/button/PayyngButton";
import AuthTitle from "@/app/components/title/AuthTitle";
import { useRouter } from "next/navigation";
import { login } from "@/hooks/useAuth";
import { APP_PATH } from "@/constants/appPath";
import { toast } from "sonner";

function Page() {
  const { push } = useRouter();
  const loginHandler = async (values: any) => {
    const res = await login(values);
    if (res) {
      toast.success(
        `Welcome back ${res?.user?.firstName && res?.user?.firstName}`
      );
      localStorage.setItem("accessToken", res?.token);
      push(APP_PATH.OVERVIEW);
    }
  };

  return (
    <div>
      <AuthTitle
        title={"Sign in to your account"}
        subtitle={
          "Enter your email address and password to sign in to your account"
        }
      />
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={Yup.object({
          email: Yup.string()
            .email("Invalid email address")
            .required("Required"),
          password: Yup.string()
            .min(6, "Must be 6 characters or more")
            .required("Required"),
        })}
        onSubmit={async (values, { setSubmitting }) => {
          await loginHandler(values);
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
              inputType="PASSWORD"
              id={"password"}
              label={"Password"}
              name={"password"}
              type={"password"}
              placeholder={"Enter your password"}
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <p
              className="text-sm text-black font-semibold text-right w-full cursor-pointer"
              onClick={() => push("/reset-password")}
            >
              Forget Password
            </p>

            <div className="w-full mt-20">
              <PayyngButton
                onClick={handleSubmit}
                disabled={isSubmitting || !isValid}
                text={"LOGIN"}
                isProcessing={isSubmitting}
              />
            </div>

            <p className="text-sm text-black font-semibold text-center w-full">
              Don't have an account?{" "}
              <span
                className="text-primary cursor-pointer"
                onClick={() => push("/sign-up")}
              >
                Sign Up
              </span>
            </p>
          </form>
        )}
      </Formik>
    </div>
  );
}

export default Page;
