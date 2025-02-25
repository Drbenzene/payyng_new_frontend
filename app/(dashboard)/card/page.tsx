"use client";

import React, { useEffect, useState } from "react";
import { useUser } from "@/hooks/useUser";
import { BsGlobe } from "react-icons/bs";
import PayyngButton from "@/app/components/button/PayyngButton";
import { RiSecurePaymentFill } from "react-icons/ri";
import { FcAcceptDatabase } from "react-icons/fc";
import CreateCardModal from "@/app/components/modals/CreateCardModal";
import { useCard, useCardsTransactions } from "@/hooks/useCard";
import ContentLayout from "@/app/components/layouts/ContentLayout";
import { CardsSkeleton } from "@/app/components/skeletons/CardsSkeleton";
import { MdContentCopy } from "react-icons/md";
import { toast } from "sonner";
import CardTopupModal from "@/app/components/modals/CardTopup";
import PayyngTable from "@/app/components/tables/TransactionTable";
import moment from "moment";
import { currencyFormat } from "@/utils/helpers";
import PayyngBackButton from "@/app/components/back/PayyngBackButton";
import Image from "next/image";
function VirtualCardPage() {
  const { data: cards, refetch, isLoading } = useCard();
  const {
    data: transactions,
    isLoading: transactionLoading,
    refetch: refetchTransactions,
  } = useCardsTransactions();
  const [open, setOpen] = useState(false);
  const [showTopupModal, setShowTopupModal] = useState(false);
  const [selectedCard, setSelectedCard] = useState<any>();
  const { data: user } = useUser();

  console.log(transactions, "the transactions");

  const features = [
    {
      title: "International Payment",
      description: "Faster international payments",
      icon: <BsGlobe />,
    },
    {
      title: "Secure",
      description: "Your card is secure and safe",
      icon: <RiSecurePaymentFill />,
    },
    {
      title: "Globally accepted",
      description: "Accepted worldwide. Shop anywhere. Seamless transactions",
      icon: <BsGlobe />,
    },
    {
      title: "Works on all your favourite stores",
      description: "Shop on Amazon, Aliexpress, Itunes, and more seamlessley",
      icon: <FcAcceptDatabase />,
    },
  ];

  useEffect(() => {
    refetch();
    refetchTransactions();
  }, [refetch, refetchTransactions]);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied successfully");
  };

  const columns = [
    {
      id: "createdAt",
      name: "Date",
    },
    {
      id: "reference",
      name: "Reference",
    },
    {
      id: "narration",
      name: "Narration",
    },
    {
      id: "type",
      name: "Type",
    },
    {
      id: "amount",
      name: "Amount",
    },
    {
      id: "status",
      name: "Status",
    },
  ];
  return (
    <>
      {isLoading && <CardsSkeleton />}
      {!isLoading && cards?.length > 0 && (
        <ContentLayout>
          <div className="my-4">
            <PayyngBackButton />
          </div>
          <div className="flex flex-col gap-4">
            <p className="text-2xl font-semibold">Your Cards</p>
            <div>
              <p className="text-gray-500">
                Manage your virtual cards and make payments seamlessly
              </p>
            </div>

            <div className=" w-full md:w-40">
              <PayyngButton
                onClick={() => {
                  console.log("clicked");
                  setOpen(true);
                }}
                text={"Add New Card"}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2  gap-4 mt-4">
              {/* Display Cards */}
              {cards.map((card: any, index: number) => (
                <div
                  key={index}
                  className="bg-black rounded-2xl shadow-2xl p-6 text-white flex flex-col justify-between"
                >
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold">Visa Card</span>
                    <Image
                      height={48}
                      width={48}
                      src="https://img.icons8.com/color/48/000000/visa.png"
                      alt="Visa"
                      className="w-12 h-12"
                    />
                  </div>

                  <div className="mt-8">
                    {/* Card Number */}
                    <div className="text-2xl flex justify-start items-center font-mono tracking-widest">
                      {card.cardNumber || "**** **** **** ****"}
                      <button
                        onClick={() =>
                          handleCopy(card.cardNumber || "**** **** **** ****")
                        }
                        className="ml-4 text-red"
                      >
                        <MdContentCopy />
                      </button>
                    </div>

                    {/* Card Holder, Expiry, and CVV */}
                    <div className="mt-4 flex justify-between items-center">
                      <div>
                        <p className="text-sm text-gray-300">Card Holder</p>
                        <p className="text-lg font-semibold flex items-center">
                          {`${user?.firstName} ${user?.lastName}`}
                          <button
                            onClick={() =>
                              handleCopy(`${user?.firstName} ${user?.lastName}`)
                            }
                            className="ml-2 text-white"
                          >
                            <MdContentCopy />
                          </button>
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-300">Expires</p>
                        <p className="text-lg font-semibold flex items-center">
                          {card.valid || "MM/YY"}
                          <button
                            onClick={() => handleCopy(card.valid || "MM/YY")}
                            className="ml-2 text-white"
                          >
                            <MdContentCopy />
                          </button>
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-300">CVV</p>
                        <p className="text-lg font-semibold flex items-center">
                          {card.cvv2 || "***"}
                          <button
                            onClick={() => handleCopy(card.cvv2 || "***")}
                            className="ml-2 text-white"
                          >
                            <MdContentCopy />
                          </button>
                        </p>
                      </div>
                    </div>

                    {/* Card Address */}
                    <div className="mt-4">
                      <p className="text-sm text-gray-300">Card Address</p>
                      <p className="text-lg font-semibold flex items-center">
                        {card.address || "Not Provided"}
                        <button
                          onClick={() =>
                            handleCopy(card.address || "Not Provided")
                          }
                          className="ml-4 text-white"
                        >
                          <MdContentCopy />
                        </button>
                      </p>
                    </div>

                    <div className="mt-6">
                      <PayyngButton
                        onClick={() => {
                          setSelectedCard(card);
                          setShowTopupModal(true);
                        }}
                        bgColor="white"
                        textColor="black"
                        text={"Top up"}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ContentLayout>
      )}

      {!isLoading && cards?.length === 0 && (
        <div>
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-4xl w-full flex flex-col lg:flex-row gap-8">
            {/* Card Preview Section */}
            <div className="lg:w-1/2 bg-gradient-to-r from-black to-black rounded-2xl p-6 text-white flex flex-col justify-between">
              <div className="flex justify-between items-center">
                <span className="text-xl font-bold">Visa Card</span>
                <Image
                  src="https://img.icons8.com/color/48/000000/visa.png"
                  alt="Visa"
                  className="w-12 h-12"
                  height={48}
                  width={48}
                />
              </div>
              <div className="mt-8">
                <div className="text-2xl font-mono tracking-widest">
                  {"**** **** **** ****"}
                </div>
                <div className="mt-4 flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-300">Card Holder</p>
                    <p className="text-lg font-semibold">
                      {`${user?.firstName} ${user?.lastName}`}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-300">Expires</p>
                    <p className="text-lg font-semibold">{"MM/YY"}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Card Form Section */}
            <div className="lg:w-1/2">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">
                Get a prepaid card instantly
              </h2>
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-4 bg-gray-100 p-4 rounded-lg"
                >
                  <div className="p-3 bg-black rounded-lg text-white">
                    {feature.icon}
                  </div>
                  <div>
                    <p className="text-lg font-semibold">{feature.title}</p>
                    <p className="text-gray-500">{feature.description}</p>
                  </div>
                </div>
              ))}

              <div className="my-5">
                <PayyngButton
                  onClick={() => {
                    setOpen(true);
                  }}
                  text="CREATE CARD"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {!isLoading && cards?.length > 0 && (
        <div className="mt-10">
          <ContentLayout>
            <div className="flex flex-col gap-4 mt-8">
              <p className="text-2xl font-semibold">Recent Transactions</p>
              <div>
                <p className="text-gray-500">
                  View your recent transactions on your cards
                </p>
              </div>

              <div className="mt-4">
                <PayyngTable
                  columns={columns}
                  data={(transactions?.data || []).map((transaction: any) => ({
                    ...transaction,
                    amount: `USD ${currencyFormat(transaction.amount)}`,
                    createdAt: moment(transaction.createdAt).format(
                      "MMM Do YY, h:mm a"
                    ),
                    status:
                      transaction.status === "SUCCESS" ? "completed" : "Failed",
                    transactionType: transaction.type?.toLowerCase(),
                  }))}
                  loading={transactionLoading}
                />
              </div>
            </div>
          </ContentLayout>
        </div>
      )}

      {open && <CreateCardModal open={open} setOpen={setOpen} />}
      {showTopupModal && (
        <CardTopupModal
          open={showTopupModal}
          setOpen={setShowTopupModal}
          card={selectedCard}
        />
      )}
    </>
  );
}

export default VirtualCardPage;
