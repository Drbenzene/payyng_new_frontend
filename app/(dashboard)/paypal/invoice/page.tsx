"use client";

import React, { Fragment, useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import PayyngInput from "@/app/components/inputs/PayyngInput";
import PayyngButton from "@/app/components/button/PayyngButton";
import ContentLayout from "@/app/components/layouts/ContentLayout";
import countryList, { Currency } from "@/constants/constantValues";
import { useUser } from "@/hooks/useUser";
import { createInvoice } from "@/hooks/usePaypal";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { APP_PATH } from "@/constants/appPath";
import { MdCancel } from "react-icons/md";
import { currencyFormat } from "@/utils/helpers";
import PayyngBackButton from "@/app/components/back/PayyngBackButton";
const InvoiceCreationForm = () => {
  interface Item {
    name: string;
    description: string;
    quantity: string;
    unit_amount: {
      currency_code: string;
      value: string;
    };
    tax: {
      name: string;
      percent: string;
    };
    discount: {
      percent: string;
      amount: {
        currency_code: string;
        value: string;
      };
    };
    unit_of_measure: string;
  }

  interface FormValues {
    items: Item[];
    configuration: {
      allow_tip: boolean;
      allow_partial_payment: boolean;
      minimum_amount_due: {
        currency_code: string;
        value: string;
      };
      tax_calculated_after_discount: boolean;
      tax_inclusive: boolean;
    };
    amount: {
      breakdown?: {
        label: string;
        amount: {
          currency_code: string;
          value: string;
        };
      };
    };
    currencyCode: string;
    note: string;
    term: string;
    memo: string;
    recipient: {
      recipientFirstName: string;
      recipientLastName: string;
      recipientEmail: string;
      recipientAddress: string;
      recipientCity: string;
      recipientState: string;
      countryCode: string;
      postalCode: string;
    };
  }

  const { push } = useRouter();
  const { data: user } = useUser();
  console.log(user, "THE USER HEHEHHEEH");

  const createInvoiceHandler = async (values: any) => {
    console.log(values, "THE VALUES");
    const res = await createInvoice(values);

    if (res) {
      console.log(res, "THE RES");
      toast.success("Invoice created successfully");
      push(APP_PATH.PAYPAL);
    }
  };
  return (
    <ContentLayout>
      <div className="my-5">
        <PayyngBackButton />
      </div>
      <p className="text-2xl font-semibold text-gray-800 mb-5">
        Create Invoice
      </p>
      <Formik<FormValues>
        initialValues={{
          items: [
            {
              name: "",
              description: "",
              quantity: "",
              unit_amount: {
                currency_code: "",
                value: "",
              },
              tax: {
                name: "Sales Tax",
                percent: "0.00",
              },
              discount: {
                percent: "0",
                amount: {
                  currency_code: "USD",
                  value: "0",
                },
              },
              unit_of_measure: "QUANTITY",
            },
          ],

          configuration: {
            allow_tip: true,
            allow_partial_payment: false,
            minimum_amount_due: {
              currency_code: Currency.USD,
              value: "0.00",
            },
            tax_calculated_after_discount: true,
            tax_inclusive: true,
          },
          amount: {
            // breakdown: {
            //   label: "Packing Charges",
            //   amount: {
            //     currency_code: "USD",
            //     value: "50.00",
            //   },
            // },
          },
          currencyCode: "USD",
          note: "Thank you for your business.",
          term: "No refunds after 30 days.",
          memo: "This is a long contract.",
          recipient: {
            recipientFirstName: "",
            recipientEmail: "",
            recipientLastName: "",
            recipientAddress: "",
            recipientCity: "",
            recipientState: "",
            countryCode: "",
            postalCode: "",
          },
        }}
        validationSchema={Yup.object({
          items: Yup.array().of(
            Yup.object().shape({
              name: Yup.string().required("Required"),
              description: Yup.string().required("Required"),
              quantity: Yup.number().required("Required"),
              unit_amount: Yup.object().shape({
                currency_code: Yup.string().required("Required"),
                value: Yup.string().required("Required"),
              }),
              tax: Yup.object().shape({
                name: Yup.string().required("Required"),
                percent: Yup.string().required("Required"),
              }),
              // discount: Yup.object().shape({
              //   percent: Yup.string().required("Required"),
              //   amount: Yup.object().shape({
              //     currency_code: Yup.string().required("Required"),
              //     value: Yup.string().required("Required"),
              //   }),
              // }),
              unit_of_measure: Yup.string().required("Required"),
            })
          ),
          // configuration: Yup.object().shape({
          //   // allow_partial_payment: Yup.object(),
          //   minimum_amount_due: Yup.object().shape({
          //     currency_code: Yup.string().required("Required"),
          //     value: Yup.string().required("Required"),
          //   }),
          //   // allow_tip: Yup.object(),
          //   tax_calculated_after_discount: Yup.boolean().required("Required"),
          //   tax_inclusive: Yup.boolean().required("Required"),
          // }),
          // amount: Yup.object().shape({
          //   breakdown: Yup.object().shape({
          //     label: Yup.string().required("Required"),
          //     amount: Yup.object().shape({
          //       currency_code: Yup.string().required("Required"),
          //       value: Yup.string().required("Required"),
          //     }),
          //   }),
          // }),
          currencyCode: Yup.string().required("Required"),
          note: Yup.string().required("Required"),
          term: Yup.string().required("Required"),
          memo: Yup.string().required("Required"),
          recipient: Yup.object().shape({
            recipientFirstName: Yup.string().required("Required"),
            recipientEmail: Yup.string().required("Required"),
            recipientLastName: Yup.string().required("Required"),
            recipientAddress: Yup.string().required("Required"),
            recipientCity: Yup.string().required("Required"),
            recipientState: Yup.string().required("Required"),
            countryCode: Yup.string().required("Required"),
            postalCode: Yup.string().required("Required"),
          }),
        })}
        onSubmit={async (values, { setSubmitting }) => {
          await createInvoiceHandler(values);
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
            <div className="flex flex-col md:flex-row justify-between items-start">
              <div className="w-auto">
                <p className="text-lg font-semibold text-gray-800">
                  INVOICE TO
                </p>
                <PayyngInput
                  id={"recipientEmail"}
                  label={"Recipient Email"}
                  name={"recipientEmail"}
                  type={"email"}
                  placeholder={"  Enter recipient email"}
                  value={values.recipient.recipientEmail}
                  onChange={(e) => {
                    setValues({
                      ...values,
                      recipient: {
                        ...values.recipient,
                        recipientEmail: e.target.value,
                      },
                    });
                  }}
                  onBlur={handleBlur}
                  error={errors.recipient?.recipientEmail}
                />
                <div className="flex justify-start space-x-3 items-center my-2">
                  <PayyngInput
                    id={"recipientFirstName"}
                    label={"Recipient First Name"}
                    name={"recipientFirstName"}
                    type={"text"}
                    placeholder={"  Enter recipient first name"}
                    value={values.recipient.recipientFirstName}
                    onChange={(e) => {
                      setValues({
                        ...values,
                        recipient: {
                          ...values.recipient,
                          recipientFirstName: e.target.value,
                        },
                      });
                    }}
                    onBlur={handleBlur}
                    error={errors.recipient?.recipientFirstName}
                  />
                  <PayyngInput
                    id={"recipientLastName"}
                    label={"Recipient Last Name"}
                    name={"recipientLastName"}
                    type={"text"}
                    placeholder={"  Enter recipient last name"}
                    value={values.recipient.recipientLastName}
                    onChange={(e) => {
                      setValues({
                        ...values,
                        recipient: {
                          ...values.recipient,
                          recipientLastName: e.target.value,
                        },
                      });
                    }}
                    onBlur={handleBlur}
                    error={errors.recipient?.recipientLastName}
                  />
                </div>
                <PayyngInput
                  id={"recipientAddress"}
                  label={"Address"}
                  name={"recipientAddress"}
                  type={"text"}
                  placeholder={"  Enter recipient address"}
                  value={values.recipient.recipientAddress}
                  onChange={(e) => {
                    setValues({
                      ...values,
                      recipient: {
                        ...values.recipient,
                        recipientAddress: e.target.value,
                      },
                    });
                  }}
                  onBlur={handleBlur}
                  error={errors.recipient?.recipientAddress}
                />

                <div className="flex justify-start space-x-3 items-center mt-2">
                  <PayyngInput
                    id={"recipientCity"}
                    label={"City"}
                    name={"recipientCity"}
                    type={"text"}
                    placeholder={"  Enter recipient city"}
                    value={values.recipient.recipientCity}
                    onChange={(e) => {
                      setValues({
                        ...values,
                        recipient: {
                          ...values.recipient,
                          recipientCity: e.target.value,
                        },
                      });
                    }}
                    onBlur={handleBlur}
                    error={errors.recipient?.recipientCity}
                  />
                  <PayyngInput
                    id={"recipientState"}
                    label={"State"}
                    name={"recipientState"}
                    type={"text"}
                    placeholder={"  Enter recipient state"}
                    value={values.recipient.recipientState}
                    onChange={(e) => {
                      setValues({
                        ...values,
                        recipient: {
                          ...values.recipient,
                          recipientState: e.target.value,
                        },
                      });
                    }}
                    onBlur={handleBlur}
                    error={errors.recipient?.recipientState}
                  />
                </div>

                <div className="my-2">
                  <PayyngInput
                    id={"postalCode"}
                    label={"Postal Code"}
                    name={"postalCode"}
                    type={"text"}
                    placeholder={"  Enter postal code"}
                    value={values.recipient.postalCode}
                    onChange={(e) => {
                      setValues({
                        ...values,
                        recipient: {
                          ...values.recipient,
                          postalCode: e.target.value,
                        },
                      });
                    }}
                    onBlur={handleBlur}
                    error={errors.recipient?.postalCode}
                  />
                </div>
                <PayyngInput
                  inputType="SELECT"
                  id={"countryCode"}
                  label={"Country"}
                  name={"countryCode"}
                  type={"text"}
                  placeholder={" Choose country"}
                  value={values.recipient.countryCode}
                  onChange={(value: any) => {
                    setValues({
                      ...values,
                      recipient: {
                        ...values.recipient,
                        countryCode: value,
                      },
                    });
                  }}
                  onBlur={handleBlur}
                  error={errors.recipient?.countryCode}
                  data={countryList}
                  setValues={setValues}
                  values={values}
                />
              </div>

              <div>
                <PayyngInput
                  inputType="SELECT"
                  id={`currencyCode`}
                  label={" Choose Currency"}
                  name={`currencyCode`}
                  type={"text"}
                  placeholder={" Choose currency"}
                  value={values.currencyCode}
                  onChange={(value: any) => {
                    setValues({
                      ...values,
                      currencyCode: value,
                    });
                  }}
                  onBlur={handleBlur}
                  error={errors.currencyCode}
                  data={[
                    { label: "USD", value: Currency.USD },
                    { label: "GBP", value: Currency.GBP },
                    { label: "EUR", value: Currency.EUR },
                  ]}
                  setValues={setValues}
                  values={values}
                />
              </div>
            </div>

            {/* //MAP ON THE ITEM ARRAYS AND, ADD BUTTONS FOR THEM TO ADD OR RWMOVE ITEMS TOO  */}

            <div className="flex flex-col md:flex-row justify-between items-start w-full">
              <div className="w-full shadow-lg rounded-xl p-5  ">
                <p className="text-lg font-semibold text-gray-800">
                  PRODUCT/SERVICES
                </p>
                <div>
                  {values.items.map((item, index) => (
                    <Fragment key={index}>
                      <div className="flex justify-items-end justify-end items-end">
                        <button
                          type="button"
                          onClick={() => {
                            setValues({
                              ...values,
                              items: values.items.filter((_, i) => i !== index), // Remove the item by index
                            });
                          }}
                          className="text-red-500 flex justify-end items-end"
                        >
                          <MdCancel size={30} />
                        </button>
                      </div>

                      <div
                        key={index}
                        className="flex flex-col w-full flex-1 md:flex-row space-x-3 md:items-center mb-4"
                      >
                        <PayyngInput
                          id={`items[${index}].name`}
                          label={"Name"}
                          name={`items[${index}].name`}
                          type={"text"}
                          placeholder={"  Enter item name"}
                          value={item.name}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          // error={errors.items?.[index]?.name}
                        />
                        <PayyngInput
                          id={`items[${index}].quantity`}
                          label={"Quantity"}
                          name={`items[${index}].quantity`}
                          type={"text"}
                          placeholder={"  Enter quantity"}
                          value={item.quantity}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          // error={errors.items?.[index]?.quantity}
                        />
                        <PayyngInput
                          id={`items[${index}].unit_amount.value`}
                          label={"Amount"}
                          name={`items[${index}].unit_amount.value`}
                          type={"text"}
                          placeholder={"  Enter amount"}
                          value={item.unit_amount.value}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          // error={errors.items?.[index]?.unit_amount?.value}
                        />
                        {/* <PayyngInput
                          id={`items[${index}].tax.name`}
                          label={"Tax"}
                          name={`items[${index}
                        ].tax.name`}
                          type={"text"}
                          placeholder={"  Enter tax name"}
                          value={item.tax.name}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={errors.items?.[index]?.tax?.name}
                        /> */}

                        {/* //THE CURRENCY SELCT INPUT HERE  */}
                        <PayyngInput
                          inputType="SELECT"
                          id={`items[${index}].unit_amount.currency_code`}
                          label={"Currency"}
                          name={`items[${index}].unit_amount.currency_code`}
                          type={"text"}
                          placeholder={" Choose currency"}
                          value={item.unit_amount.currency_code}
                          onChange={(value: any) => {
                            setValues({
                              ...values,
                              items: values.items.map((item, i) => {
                                if (i === index) {
                                  return {
                                    ...item,
                                    unit_amount: {
                                      ...item.unit_amount,
                                      currency_code: value,
                                    },
                                  };
                                }
                                return item;
                              }),
                            });
                          }}
                          onBlur={handleBlur}
                          // error={
                          //   errors.items?.[index]?.unit_amount?.currency_code
                          // }
                          data={[
                            { label: "USD", value: Currency.USD },
                            { label: "GBP", value: Currency.GBP },
                            { label: "EUR", value: Currency.EUR },
                          ]}
                          setValues={setValues}
                          values={values}
                        />
                      </div>

                      <PayyngInput
                        inputType="TEXTAREA"
                        id={`items[${index}].description`}
                        label={"Description"}
                        name={`items[${index}].description`}
                        type={"text"}
                        placeholder={"  Enter item description"}
                        value={item.description}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        // error={errors.items?.[index]?.description as string}
                      />

                      <p>
                        <span className="text-gray-800 font-semibold">
                          Amount:
                        </span>
                        <span className="text-gray-800 font-semibold">
                          {values?.currencyCode}{" "}
                          {currencyFormat(
                            Number(item.quantity) *
                              Number(item.unit_amount.value)
                          )}
                        </span>
                      </p>
                    </Fragment>
                  ))}
                </div>

                {/* //ADD BUTTON TO ADD MORE ITEMS */}
                <div className="flex justify-end mt-5">
                  <PayyngButton
                    onClick={() => {
                      setValues({
                        ...values,
                        items: [
                          ...values.items,
                          {
                            name: "",
                            description: "",
                            quantity: "",
                            unit_amount: {
                              currency_code: "",
                              value: "",
                            },
                            tax: {
                              name: "",
                              percent: "",
                            },
                            discount: {
                              percent: "",
                              amount: {
                                currency_code: "",
                                value: "",
                              },
                            },
                            unit_of_measure: "",
                          },
                        ],
                      });
                    }}
                    text={"ADD ITEM"}
                  />
                </div>
              </div>
            </div>

            <div className="">
              <PayyngButton
                isProcessing={isSubmitting}
                disabled={isSubmitting || !isValid}
                text={"SEND INVOICE"}
              />
            </div>
          </form>
        )}
      </Formik>
    </ContentLayout>
  );
};

export default InvoiceCreationForm;
