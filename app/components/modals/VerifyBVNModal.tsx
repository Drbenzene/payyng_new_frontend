import React, { useEffect, useState } from "react";
import ModalLayout from "../layouts/ModalLayout";
import PayyngInput from "../inputs/PayyngInput";
import PayyngButton from "../button/PayyngButton";
import { Formik } from "formik";
import * as Yup from "yup";
import { resolveAccountNumber, useNigeriaBanks } from "@/hooks/useNigeriaBanks";
import PayyngLoader from "../loader/PayyngLoader";
import { useUser, validateUserBVN } from "@/hooks/useUser";
import { toast } from "sonner";
import TransactionSuccess from "./TransactionSuccess";

interface IVerifyBVNModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

function VerifyBVNModal({ open, setOpen }: IVerifyBVNModalProps) {
  const { refetch } = useUser();

  const { data: banks } = useNigeriaBanks();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const validateBankAccount = async (values: any, setValues: any) => {
    console.log(values);
    setLoading(true);
    const res = await resolveAccountNumber(values);
    setLoading(false);
    if (res) {
      setValues({
        ...values,
        accountName: res.account_name,
      });
    }
  };

  const validateBVN = async (values: any) => {
    console.log(values);
    const res = await validateUserBVN(values);
    if (res) {
      toast.success("BVN Verified Successfully");
      refetch();
      setOpen(false);
      setSuccess(true);
    }
  };

  return (
    <ModalLayout
      maxWidth="max-w-[500px]"
      open={open}
      setOpen={setOpen}
      title="Verify BVN"
    >
      <div>
        <p className="text-2xl font-semibold text-gray-800">Verify your BVN</p>
        <p className="text-gray-500 mt-2 mb-5">
          Verify your BVN to continue enjoying exclusive features on Payyng
        </p>
      </div>

      <Formik
        initialValues={{
          bvn: "",
          bankCode: "",
          accountNumber: "",
          accountName: "",
        }}
        validationSchema={Yup.object({
          bvn: Yup.string().required("BVN is required"),
          bankCode: Yup.string().required("Bank is required"),
          accountNumber: Yup.string().required("Account  Number is required"),
          accountName: Yup.string().required("Account Name is required"),
        })}
        onSubmit={async (values, { setSubmitting }) => {
          await validateBVN(values);
          setSubmitting(false);
        }}
      >
        {({
          errors,
          touched,
          handleChange,
          setValues,
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
              label="BVN (Bank Verification Number)"
              name="bvn"
              value={values.bvn}
              onChange={handleChange}
              error={errors.bvn}
              touched={touched.bvn}
              id={"bvn"}
              type={"text"}
              placeholder={"22**********"}
              onBlur={handleBlur}
              maxLength={11}
            />
            <PayyngInput
              inputType="SELECT"
              label="Bank"
              name="bankCode"
              value={values.bankCode}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.bankCode}
              touched={touched.bankCode}
              id={"bankCode"}
              type={"text"}
              values={values}
              setValues={setValues}
              placeholder={"Select Bank"}
              data={(banks || []).map((bank: any) => ({
                value: bank.code,
                label: bank.name,
              }))}
            />
            <PayyngInput
              label="Account Number"
              name="accountNumber"
              value={values.accountNumber}
              onChange={(e) => {
                handleChange(e);
                if (e.target.value.length === 10) {
                  setValues({
                    ...values,
                    accountName: "",
                  });
                  validateBankAccount(
                    {
                      ...values,
                      accountNumber: e.target.value,
                    },
                    setValues
                  );
                }
              }}
              error={errors.accountNumber}
              touched={touched.accountNumber}
              id={""}
              type={""}
              placeholder={"01********"}
              onBlur={handleBlur}
              maxLength={10}
            />

            {loading && <PayyngLoader />}

            {values?.accountName && (
              <PayyngInput
                label="Account Name"
                name="accountName"
                value={values.accountName}
                onChange={handleChange}
                error={errors.accountName}
                touched={touched.accountName}
                id={"accountName"}
                type={"text"}
                placeholder={""}
                onBlur={handleBlur}
                disabled={true}
              />
            )}

            <PayyngButton
              disabled={loading || !isValid || isSubmitting}
              isProcessing={isSubmitting}
              text="PROCEED"
            />
          </form>
        )}
      </Formik>

      {success && (
        <TransactionSuccess
          description="BVN Verified Successfully. You can now enjoy exclusive features on Payyng"
          open={success}
          setOpen={setSuccess}
        />
      )}
    </ModalLayout>
  );
}

export default VerifyBVNModal;
