import React, { useEffect, useState } from "react";
import ModalLayout from "../layouts/ModalLayout";
import PayyngInput from "../inputs/PayyngInput";
import PayyngButton from "../button/PayyngButton";
import { Formik } from "formik";
import * as Yup from "yup";
import { updateUserProfile, useUser } from "@/hooks/useUser";
import { toast } from "sonner";

interface IUpdateAccountModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

function UpdateAccountModal({ open, setOpen }: IUpdateAccountModalProps) {
  const { refetch } = useUser();

  const updateProfileHandler = async (values: any) => {
    console.log(values);
    const res = await updateUserProfile(values);
    if (res) {
      toast.success("Profile Updated Successfully");
      await refetch();
      setOpen(false);
      window.location.reload();
    }
  };

  return (
    <ModalLayout
      maxWidth="max-w-[500px]"
      open={open}
      setOpen={setOpen}
      title="Verify BVN"
      hideCancel
    >
      <div>
        <p className="text-2xl font-semibold text-gray-800">
          Let's Meet You 😊
        </p>
        <p className="text-gray-500 mt-2 mb-5">
          Please provide the following details to continue enjoying exclusive
          features on Payyng
        </p>
      </div>

      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          dob: "",
        }}
        validationSchema={Yup.object({
          firstName: Yup.string().required("First Name is required"),
          lastName: Yup.string().required("Last Name is required"),
          dob: Yup.string().required("Date of Birth is required"),
        })}
        onSubmit={async (values, { setSubmitting }) => {
          await updateProfileHandler(values);
          setSubmitting(false);
        }}
      >
        {({
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          isSubmitting,
          isValid,
        }) => (
          <form
            className=" w-full flex-col justify-start items-stretch space-y-2"
            onSubmit={handleSubmit}
          >
            <PayyngInput
              label="First Name"
              name="firstName"
              value={values.firstName}
              onChange={handleChange}
              error={errors.firstName}
              touched={touched.firstName}
              id={"firstName"}
              type={"text"}
              placeholder={"John"}
              onBlur={handleBlur}
            />
            <PayyngInput
              label="Last Name"
              name="lastName"
              value={values.lastName}
              onChange={handleChange}
              error={errors.lastName}
              touched={touched.lastName}
              id={"lastName"}
              type={"text"}
              placeholder={"Doe"}
              onBlur={handleBlur}
            />

            <PayyngInput
              label="Date of Birth"
              name="dob"
              value={values.dob}
              onChange={handleChange}
              error={errors.dob}
              touched={touched.dob}
              id={"dob"}
              type={"date"}
              placeholder={"01/01/1990"}
              onBlur={handleBlur}
            />

            <PayyngButton
              disabled={!isValid || isSubmitting}
              isProcessing={isSubmitting}
              text="PROCEED"
            />
          </form>
        )}
      </Formik>
    </ModalLayout>
  );
}

export default UpdateAccountModal;
