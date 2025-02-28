"use client";

import React, { Suspense, Fragment, useEffect, useState } from "react";
import ContentLayout from "@/app/components/layouts/ContentLayout";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { IoInformationCircleOutline } from "react-icons/io5";
import { RiSendPlaneLine } from "react-icons/ri";
import { SiConvertio } from "react-icons/si";
import { IoMdAddCircleOutline } from "react-icons/io";
import PayyngTable from "@/app/components/tables/TransactionTable";
import { useTransaction } from "@/hooks/useTransaction";
import { Currency, transactionColumns } from "@/constants/constantValues";
import moment from "moment";
import { currencyFormat } from "@/utils/helpers";
import { useWallet } from "@/hooks/useWallet";
import { useUser } from "@/hooks/useUser";
import { useRouter, useSearchParams } from "next/navigation";
import AddMoneyModal from "@/app/components/modals/AddMoneyModal";
import TransactionSuccess from "@/app/components/modals/TransactionSuccess";
import ChooseTopupMethod from "@/app/components/modals/ChooseTopupMethod";
import { APP_PATH } from "@/constants/appPath";
import { useWalletAccount } from "@/hooks/useWalletAccount";
import Image from "next/image";
import PayyngButton from "@/app/components/button/PayyngButton";
import VerifyBVNModal from "@/app/components/modals/VerifyBVNModal";

function Page() {
  const { push } = useRouter();
  const [filters, setFilters] = useState<any>({
    currency: Currency.USD,
  });
  const { data: transactions, isLoading, refetch } = useTransaction();
  const { data: wallets, refetch: refetchWallet } = useWallet();
  const { data: user } = useUser();
  const { data: walletAccount, refetch: refetchWalletAccount } =
    useWalletAccount();
  const [activeTab, setActiveTab] = useState("NGN");
  const [activeWallet, setActiveWallet] = useState<any>(null);
  const searchParams = useSearchParams();
  const currency = searchParams.get("currency");
  const reference = searchParams.get("reference");
  const [showAddMoneyModal, setShowAddMoneyModal] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showChooseTopupMethod, setShowChooseTopupMethod] = useState(false);
  const [showVerifyBVNModal, setShowVerifyBVNModal] = useState(false);

  console.log(walletAccount, "THE ACCOUNTS OOOO");

  console.log(user, "THE USER HEHEHE");

  useEffect(() => {
    refetch();
    refetchWallet();
    refetchWalletAccount();
  }, [filters, refetch, refetchWallet, refetchWalletAccount]);

  useEffect(() => {
    if (wallets) {
      if (currency) {
        setActiveTab(currency);
        setActiveWallet(
          wallets.find((wallet: any) => wallet.currencyCode === currency)
        );
      } else {
        setActiveTab(wallets[0]?.currencyCode);
        setActiveWallet(wallets[0]);
      }
    }
  }, [currency, wallets]);

  const addMoneyHandler = async (currenyCode: Currency) => {
    // if (currenyCode === Currency.NGN) {
    //   setShowChooseTopupMethod(true);
    //   console.log("USD");
    // }
    setShowChooseTopupMethod(true);
  };

  useEffect(() => {
    const validatePayment = async () => {
      const paystackRef = sessionStorage.getItem("paystackRef");
      console.log(paystackRef, reference, "THE TWOOO");
      if (reference && paystackRef === reference) {
        console.log("VALIDATE PAYMENT");
        setSuccess(true);
        sessionStorage.removeItem("paystackRef");
      }
    };
    validatePayment();
  }, [reference]);

  return (
    <div>
      <ContentLayout>
        <div>
          <p className="text-xl font-semibold text-gray-800">My Balances</p>
        </div>

        <div className="border rounded-xl border-gray-200 mt-10 w-full flex flex-col justify-center items-center py-5">
          <div className="">
            <div className="grid grid-cols-4 bg-gray-50 justify-center rounded-xl items-center">
              {wallets &&
                wallets.map((item: any) => (
                  <div key={item?.id}>
                    <div
                      onClick={() => {
                        setActiveTab(item?.currencyCode);
                        setActiveWallet(item);
                      }}
                      className={`p-4 flex space-x-2 hover:bg-white   justify-center cursor-pointer items-center
                      ${
                        activeTab === item?.currencyCode
                          ? "bg-white border-b-2 border-black"
                          : ""
                      }`}
                    >
                      <Image
                        src={`${item?.currencyFlag}`}
                        alt="Wallet"
                        width={24} // Smaller size
                        height={24} // Smaller size
                        className="w-6 h-6 rounded-full bg-gray-200 object-cover"
                      />

                      <p className="text-gray-500 hover:text-black hover:font-extrabold font-extrabold">
                        {item?.currencyCode}
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-center items-center space-x-10 ">
            <div className="flex flex-col justify-center items-center mt-10">
              <div className="w-full flex justify-between items-center space-x-3">
                <p className="text-gray-500 text-sm mb-2">
                  Available {activeWallet?.currencyCode} Balance
                </p>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger className="-mt-4">
                      <IoInformationCircleOutline />
                    </TooltipTrigger>
                    <TooltipContent>
                      <div
                        className="p-4 bg-black text-white rounded-xl shadow-lg"
                        style={{ width: "200px" }}
                      >
                        <p>
                          This is the amount of money that you have received and
                          is available for withdrawal or transfer to your bank
                          account
                        </p>
                      </div>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>{" "}
              <p className=" text-gray-800 font-extrabold text-2xl">
                {activeWallet?.symbol} {currencyFormat(activeWallet?.balance)}
              </p>
            </div>
            {/* //ADD A VERICAL DIVIDER AND ALSO SHOW PENDING BALANCE TOO  */}
            {/* add a vettival divider */}
            <div className="border-r border-gray-200 md:block hidden h-20 mt-5"></div>
            <div className="flex flex-col justify-center items-center mt-10">
              <div className="w-full flex justify-between items-center space-x-3">
                <p className="text-gray-500 text-sm mb-2">
                  Pending {activeWallet?.currencyCode} Balance
                </p>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger className="-mt-4">
                      <IoInformationCircleOutline />
                    </TooltipTrigger>
                    <TooltipContent>
                      <div
                        className="p-4 bg-black text-white rounded-xl shadow-lg"
                        style={{ width: "200px" }}
                      >
                        <p>
                          This is the amount of money that you have received but
                          yet to be cleared or settled to your account. The
                          payment stays in this balance until it is cleared
                        </p>
                      </div>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <p className=" text-gray-800 font-extrabold text-2xl">
                {activeWallet?.symbol}{" "}
                {currencyFormat(activeWallet?.pendingBalance)}
              </p>
            </div>
          </div>
          {/* //ADD 3 BUTTONS FOR WITHDRAW, TRANSFER AND ADD FUNDS */}
          <div className="grid md:grid-cols-3 md:gap-5 gap-2 mt-10">
            <button
              onClick={() => addMoneyHandler(activeWallet?.currencyCode)}
              className="bg-green-900 text-white px-5 py-2 rounded-xl flex justify-center items-center space-x-2"
            >
              <span> Add Money </span> <IoMdAddCircleOutline />
            </button>
            <button
              onClick={() =>
                push(
                  `${APP_PATH.CONVERT}?currency=${activeWallet?.currencyCode}`
                )
              }
              className=" bg-black text-white px-5 py-2 rounded-xl flex justify-center items-center space-x-2"
            >
              <span>Conversion</span> <SiConvertio />
            </button>
            <button className="bg-red-900 text-white px-5 py-2 rounded-xl flex justify-center items-center space-x-2">
              <span>Withdraw</span>
              <span>
                <RiSendPlaneLine />
              </span>
            </button>
          </div>
        </div>
      </ContentLayout>
      {/* //ADD A TABLE TO SHOW TRANSACTION HISTORY */}

      <div className="mt-10">
        <ContentLayout>
          <div>
            <p className="text-xl font-semibold text-gray-800">
              Your {activeTab} bank account details
            </p>

            <div className="grid grid-cols-3 gap-5 mt-10">
              {walletAccount &&
                walletAccount
                  ?.filter((item: any) => item.currency === activeTab)
                  .map((item: any) => (
                    <Fragment key={item?.id}>
                      {item?.bankName && (
                        <div>
                          <p className="text-gray-500">BANK NAME</p>
                          <p>{item?.bankName}</p>
                        </div>
                      )}

                      {item?.accountName && (
                        <div>
                          <p className="text-gray-500">ACCOUNT NAME</p>
                          <p>{item?.accountName}</p>
                        </div>
                      )}

                      {item?.accountNumber && (
                        <div>
                          <p className="text-gray-500">ACCOUNT NUMBER</p>
                          <p>{item?.accountNumber}</p>
                        </div>
                      )}

                      {item?.bankCode && (
                        <div>
                          <p className="text-gray-500">BANK CODE</p>
                          <p>{item?.bankCode}</p>
                        </div>
                      )}

                      {item?.swiftCode && (
                        <div>
                          <p className="text-gray-500">SWIFT CODE</p>
                          <p>{item?.swiftCode}</p>
                        </div>
                      )}

                      {item?.routingNumber && (
                        <div>
                          <p className="text-gray-500">ROUTING NUMBER</p>
                          <p>{item?.routingNumber}</p>
                        </div>
                      )}

                      {item?.iban && (
                        <div>
                          <p className="text-gray-500">IBAN</p>
                          <p>{item?.iban}</p>
                        </div>
                      )}
                    </Fragment>
                  ))}
            </div>
          </div>

          {walletAccount &&
            walletAccount?.filter((item: any) => item.currency === activeTab)
              .length === 0 && (
              <div className="flex flex-col justify-center items-center  w-full">
                {user?.tier === 0 && (
                  <div className="w-auto mt-10">
                    <p className="text-gray-500">
                      Kindly verify your BVN to add a bank account and enjoy
                      more features on Payyng
                    </p>
                    <PayyngButton
                      onClick={() => setShowVerifyBVNModal(true)}
                      text="Verify BVN"
                    />
                  </div>
                )}

                {user?.tier === 1 && (
                  <div className="w-full flex flex-col justify-center items-center">
                    <p className="text-gray-500">
                      Verify your ID to unlock international remittance &
                      payment features on Payyng
                    </p>

                    <div className="w-auto mt-5">
                      <PayyngButton
                        onClick={() => push(APP_PATH.VERIFICATION)}
                        text="Verify ID"
                      />
                    </div>
                  </div>
                )}

                {user?.tier === 2 && (
                  <div className="w-full flex flex-col justify-center items-center">
                    <p className="text-gray-500">
                      We are currently processing your {activeTab} bank account.
                      We will notify you once it is completed and available.
                    </p>
                    <div className="w-auto mt-10">
                      <PayyngButton text="Get Notified" />
                    </div>
                  </div>
                )}
              </div>
            )}
        </ContentLayout>
      </div>

      <div className="mt-10">
        <ContentLayout>
          <div>
            <p className="text-xl font-semibold text-gray-800">
              Transaction History
            </p>

            <PayyngTable
              columns={transactionColumns}
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
              loading={isLoading}
            />
          </div>
        </ContentLayout>
      </div>

      {/* //MODALS STARTS HERE */}

      {showAddMoneyModal && (
        <AddMoneyModal
          open={showAddMoneyModal}
          setOpen={() => setShowAddMoneyModal(false)}
        />
      )}

      {success && (
        <TransactionSuccess
          open={success}
          setOpen={() => setSuccess(false)}
          description={
            "Your account was funded successfully. Thanks for choosing Payyng"
          }
        />
      )}

      {showChooseTopupMethod && (
        <ChooseTopupMethod
          open={showChooseTopupMethod}
          setOpen={() => setShowChooseTopupMethod(false)}
          setShowAddMoneyModal={setShowAddMoneyModal}
          currency={activeWallet?.currencyCode}
        />
      )}

      {showVerifyBVNModal && (
        <VerifyBVNModal
          open={showVerifyBVNModal}
          setOpen={setShowVerifyBVNModal}
        />
      )}
    </div>
  );
}

export default function WrappedPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Page />
    </Suspense>
  );
}
