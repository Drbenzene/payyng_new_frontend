import React from "react";
import { useWallet } from "@/hooks/useWallet";
import { Currency } from "@/constants/constantValues";

interface IBalanceComponentProps {
  currency: Currency;
}
function BalanceComponent() {
  const { data: wallet } = useWallet();
  return (
    <div>
      <div className="flex items-center justify-between">
        <p className="text-gray-500 text-start mt-2 text-2xl font-extrabold">
          Balance:
        </p>
        <p className="text-gray-500 text-start mt-2 text-2xl font-extrabold">
          {wallet?.find((item: any) => item.currency === Currency.NGN)?.balance}
        </p>
      </div>
    </div>
  );
}

export default BalanceComponent;
