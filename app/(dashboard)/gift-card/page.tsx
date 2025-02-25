"use client";

import React, { useState } from "react";
import { useGiftCard } from "@/hooks/useGiftcard";
import Image from "next/image";
import { motion } from "framer-motion";
import ContentLayout from "@/app/components/layouts/ContentLayout";
import PayyngInput from "@/app/components/inputs/PayyngInput";
import { Formik, FormikHelpers, FormikValues } from "formik";
import { GiftCardSkeleton } from "@/app/components/skeletons/giftCardSkeleton";
import GiftcardModal from "@/app/components/modals/GiftcardModal";
import TransactionSuccess from "@/app/components/modals/TransactionSuccess";
import { useConfig } from "@/hooks/useConfigs";

function Giftcard() {
  const { data: giftcards, isLoading } = useGiftCard();
  const { data: config } = useConfig();

  const [selectedGiftCard, setSelectedGiftCard] = useState<any>(null);
  const [open, setOpen] = useState(false);
  const [success, setSuccess] = useState(false);

  console.log(config, "THE CONFIG");

  return (
    <div>
      <ContentLayout>
        <p className="text-2xl mb-3 font-semibold text-gray-800">Gift Cards</p>
        <Formik
          initialValues={{ search: "" }}
          onSubmit={function (
            values: FormikValues,
            formikHelpers: FormikHelpers<FormikValues>
          ): void | Promise<any> {
            throw new Error("Function not implemented.");
          }}
        >
          {({ values, handleChange, handleBlur, handleSubmit }) => (
            <form onSubmit={handleSubmit} className="mb-10">
              <PayyngInput
                placeholder="Search for Gift Cards..."
                label={""}
                id={"search"}
                name={"search"}
                type={"text"}
                value={values.search}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </form>
          )}
        </Formik>
        {isLoading && <GiftCardSkeleton />}
        {!isLoading && giftcards && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {giftcards &&
              giftcards?.content?.map((giftcard: any) => (
                <motion.div
                  onClick={() => {
                    setSelectedGiftCard(giftcard);
                    setOpen(true);
                  }}
                  initial={{ opacity: 0, y: 100 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  whileHover={{ scale: 1.05 }}
                  className="flex flex-col justify-start cursor-pointer items-start border rounded-xl p-4 border-gray-400"
                  key={giftcard?.name}
                >
                  <div className="w-12 h-12 rounded-full my-3">
                    <Image
                      src={giftcard?.logoUrls[0]}
                      alt={giftcard.name}
                      width={50}
                      height={50}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className=" text-gray-500">{giftcard?.productName}</p>
                  </div>
                </motion.div>
              ))}
          </div>
        )}
      </ContentLayout>

      {open && (
        <GiftcardModal
          setSuccess={setSuccess}
          card={selectedGiftCard}
          setOpen={setOpen}
          open={open}
        />
      )}

      {success && (
        <TransactionSuccess
          description="Gift Card Purchase Successful 🎉. Thanks for choosing Payyng"
          setOpen={setSuccess}
          open={success}
        />
      )}
    </div>
  );
}

export default Giftcard;
