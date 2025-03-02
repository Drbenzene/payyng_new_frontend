"use client";

import React, { useEffect, useState } from "react";
import BalanceCard from "@/app/components/cards/BalanceCard";
import PayyngTable from "@/app/components/tables/TransactionTable";
import BillsCard from "@/app/components/cards/BillsCard";
import ContentLayout from "@/app/components/layouts/ContentLayout";
import Image from "next/image";
import { useUser } from "@/hooks/useUser";
import { useTransaction } from "@/hooks/useTransaction";
import moment from "moment";
import { currencyFormat } from "@/utils/helpers";
import PayyngButton from "@/app/components/button/PayyngButton";
import VerifyBVNModal from "@/app/components/modals/VerifyBVNModal";
import { useRouter } from "next/navigation";
import { APP_PATH } from "@/constants/appPath";

function Page() {
  const { push } = useRouter();
  const [open, setOpen] = useState(false);
  const { data: user, isLoading } = useUser();
  const {
    data: transactions,
    isLoading: transactionLoading,
    refetch,
  } = useTransaction();

  const quickActions = [
    { name: "Pay Bills", image: "/invoice.svg", route: APP_PATH.BILLS },
    { name: "Account", image: "/account.png", route: APP_PATH.ACCOUNTS },
    {
      name: "Paypal",
      image: "/paypal-svgrepo-com.svg",
      route: APP_PATH.PAYPAL,
    },
  ];

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
      id: "transactionType",
      name: "Transaction Type",
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

  useEffect(() => {
    refetch();
  }, [refetch]);
  return (
    <div>
      <p className="text-2xl font-semibold text-gray-800">
        Welcome {user?.firstName ? user?.firstName : "Back"} 👋
      </p>

      {user?.tier === 0 && (
        <ContentLayout>
          <p className="text-gray-800 mb-5 text-xl font-extrabold">
            Complete your KYC
          </p>
          <div className="flex space-y-4 flex-col md:flex-row items-center w-full justify-between">
            <div>
              <p className="text-gray-500">
                Complete your KYC to enjoy more features
              </p>
            </div>
            <div className="md:w-auto w-full">
              <PayyngButton
                onClick={() => {
                  setOpen(true);
                }}
                text={"VERIFY BVN"}
              />
            </div>
          </div>
        </ContentLayout>
      )}

      {user?.tier === 1 && user?.idVerificationStatus === "NOT_SUBMITTED" && (
        <ContentLayout>
          <p className="text-gray-800 mb-5 text-xl font-extrabold">
            Verify your ID
          </p>
          <div className="flex space-y-2 flex-col md:flex-row items-center w-full justify-between">
            <div>
              <p className="text-gray-500">
                Verify your ID to unlock international remittance, cards &
                payment features on Payyng
              </p>
            </div>
            <div className="md:w-auto w-full">
              <PayyngButton
                onClick={() => {
                  push(APP_PATH.VERIFICATION);
                }}
                text={"VERIFY ID"}
              />
            </div>
          </div>
        </ContentLayout>
      )}

      {/* //ID VERIFICATION HANDLER GOES HEREE */}

      <div className="w-full mt-5">
        <p className="text-gray-800 mb-5 font-extrabold">Your Balances</p>
        <div>
          <ContentLayout>
            <BalanceCard />
          </ContentLayout>
        </div>

        <div className="mt-5">
          <ContentLayout>
            <p className="text-gray-800 mb-5 font-extrabold text-xl">
              Quick Actions
            </p>
            <div className="flex flex-row md:space-x-10 space-x-1 mt-4">
              {quickActions.map((item: any, index: number) => (
                <div
                  onClick={() => {
                    push(item.route);
                  }}
                  key={index}
                  className="cursor-pointer"
                >
                  <div className=" h-28 w-28 flex justify-start items-start  flex-col my-3 border rounded-xl p-4 border-gray-400">
                    <Image
                      src={item?.image}
                      alt={"bills"}
                      width={30}
                      height={30}
                      className="w-10 h-10"
                    />
                    <p className="text-gray-500 mt-5 text-sm">{item.name} </p>
                  </div>
                </div>
              ))}
            </div>
          </ContentLayout>
        </div>

        <div className="bg-white rounded-md w-full p-5 mt-5">
          <PayyngTable
            columns={columns}
            data={(transactions?.data || []).map((transaction: any) => ({
              ...transaction,
              amount: `${transaction?.currency} ${currencyFormat(
                transaction.amount
              )}`,
              createdAt: moment(transaction.createdAt).format(
                "MMM Do YY, h:mm a"
              ),
              status: transaction.status || "completed",
              transactionType: transaction.transactionType?.toLowerCase(),
            }))}
            loading={transactionLoading}
          />
        </div>

        <div className="bg-white rounded-md w-full p-5 mt-5">
          <p className="text-gray-800 mb-5 text-xl font-extrabold">
            Bills, Airtime, Electricity, Education & More...
          </p>
          <BillsCard />
        </div>
      </div>

      {open && <VerifyBVNModal open={open} setOpen={setOpen} />}
    </div>
  );
}

export default Page;
