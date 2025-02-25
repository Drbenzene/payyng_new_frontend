import React from "react";
import ModalLayout from "../layouts/ModalLayout";
import { CiBank } from "react-icons/ci";
import { SiConvertio } from "react-icons/si";
import { FaCcMastercard } from "react-icons/fa";
import { Currency } from "@/constants/constantValues";
import { useRouter } from "next/navigation";
import { APP_PATH } from "@/constants/appPath";

interface IChooseTopupMethodProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  setShowAddMoneyModal: (show: boolean) => void;
  currency: string;
}

function ChooseTopupMethod({
  open,
  setOpen,
  currency,
  setShowAddMoneyModal,
}: IChooseTopupMethodProps) {
  const { push } = useRouter();
  return (
    <ModalLayout
      maxWidth="max-w-[500px]"
      open={open}
      setOpen={setOpen}
      title="Choose Topup Method"
    >
      <div>
        <p className="text-2xl font-semibold text-gray-800">
          Top up {currency}
        </p>
        <p className="text-gray-500 mt-2">Choose your preferred topup method</p>

        <div className="flex hover:border rounded-2xl hover:border-black space-x-5 justify-center items-center mt-4 p-4 bg-white shadow-md cursor-pointer">
          <div className="p-2  bg-black text-white rounded-full ">
            <CiBank size={30} />
          </div>
          <div>
            <p className="font-extrabold pb-2">Via Bank Transfer</p>
            <p>
              Fund your account by sending money to your unique {currency} bank
              account
            </p>
          </div>
        </div>

        {currency === Currency.NGN && (
          <div
            onClick={() => {
              setOpen(false);
              setShowAddMoneyModal(true);
            }}
            className="flex hover:border rounded-2xl hover:border-black space-x-5 justify-center items-center mt-4 p-4 bg-white shadow-md cursor-pointer"
          >
            <div className="p-2  bg-black text-white rounded-full ">
              <FaCcMastercard size={30} />
            </div>
            <div>
              <p className="font-extrabold pb-2">Via Card & USSD</p>
              <p>
                Fund your account using your card or USSD code from your bank
              </p>
            </div>
          </div>
        )}

        <div
          onClick={() => push(`${APP_PATH.CONVERT}?currency=${currency}`)}
          className="flex hover:border rounded-2xl hover:border-black space-x-5 justify-center items-center mt-4 p-4 bg-white shadow-md cursor-pointer"
        >
          <div className="p-2  bg-black text-white rounded-full ">
            <SiConvertio size={30} />
          </div>
          <div>
            <p className="font-extrabold pb-2">Via Currency Conversion</p>
            <p>Convert funds from another balance to your NGN balance</p>
          </div>
        </div>
      </div>
    </ModalLayout>
  );
}

export default ChooseTopupMethod;
