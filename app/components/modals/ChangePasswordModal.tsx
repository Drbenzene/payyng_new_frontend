import React from "react";
import ModalLayout from "../layouts/ModalLayout";
import { Formik } from "formik";
import * as Yup from "yup";
import PayyngInput from "../inputs/PayyngInput";
import PayyngButton from "../button/PayyngButton";
import { toast } from "sonner";
import { changePassword } from "@/hooks/useAuth";

interface ChangePassword {
  open: boolean;
  setOpen: (open: boolean) => void;
}
function ChangePasswordModal({ open, setOpen }: ChangePassword) {
  const changePasswordHandler = async (values: any) => {
    const res = await changePassword(values);
    if (res) {
      toast.success("Password changed Successfully");
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
            Change Password
          </p>
        </div>

        <Formik
          initialValues={{
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
          }}
          validationSchema={Yup.object({
            currentPassword: Yup.string().required(
              "Current Password is Required"
            ),
            newPassword: Yup.string().required("New Password is Required"),
            confirmPassword: Yup.string()
              .required("Confirm Password is Required")
              .oneOf([Yup.ref("newPassword"), ""], "Passwords must match"),
          })}
          onSubmit={async (values, { setSubmitting, setErrors }) => {
            await changePasswordHandler(values);
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
                  inputType="PASSWORD"
                  label="Current Password"
                  name="currentPassword"
                  type="text"
                  placeholder="********"
                  value={values.currentPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.currentPassword}
                  touched={touched.currentPassword}
                  id="currentPassword"
                />

                <PayyngInput
                  inputType="PASSWORD"
                  label="New Password"
                  name="newPassword"
                  type="text"
                  placeholder="********"
                  value={values.newPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.newPassword}
                  touched={touched.newPassword}
                  id="newPassword"
                />

                <PayyngInput
                  inputType="PASSWORD"
                  label="Confirm Password"
                  name="confirmPassword"
                  type="text"
                  placeholder="********"
                  value={values.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.confirmPassword}
                  touched={touched.confirmPassword}
                  id="confirmPassword"
                />
              </div>

              <div className="mt-5">
                <PayyngButton
                  disabled={isSubmitting || !isValid}
                  isProcessing={isSubmitting}
                  text={"CHANGE PASSWORD"}
                />
              </div>
            </form>
          )}
        </Formik>
      </div>
    </ModalLayout>
  );
}

export default ChangePasswordModal;
