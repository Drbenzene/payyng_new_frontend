import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useWallet } from "@/hooks/useWallet";
import { useRouter } from "next/navigation";
import { APP_PATH } from "@/constants/appPath";
import { currencyFormat } from "@/utils/helpers";

function BalanceCard() {
  const { data: wallets, isLoading, refetch } = useWallet();
  const [isPaused, setIsPaused] = useState(false);
  const { push } = useRouter();
  console.log(wallets, "ALL THE WALLETS");
  // Duplicate the wallet list to create a looping effect
  // const walletList = wallets ? [...wallets, ...wallets] : [];

  useEffect(() => {
    refetch();
  }, []);
  return (
    <div className="overflow-hidden w-full relative">
      <motion.div
        className="flex space-x-4 cursor-pointer"
        animate={isPaused ? {} : { x: ["0%", "-100%"] }}
        transition={{
          ease: "linear",
          duration: 50, // Adjust speed (seconds)
          repeat: Infinity,
          repeatType: "loop", // Ensures seamless looping
        }}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {wallets &&
          wallets?.length > 0 &&
          wallets?.map((item: any, index: number) => (
            <motion.div
              key={`${item?.id}-${index}`} // Ensures unique key for duplicated items
              className="flex flex-col justify-start items-start border rounded-xl p-4  border-gray-400 min-w-[250px] bg-white shadow-md"
              whileHover={{ scale: 1.005 }}
              onClick={() => {
                push(`${APP_PATH.ACCOUNTS}?currency=${item?.currencyCode}`);
              }}
            >
              <div className="w-12 h-12 rounded-full my-3">
                <Image
                  src={item?.currencyFlag}
                  alt="Wallet"
                  width={50}
                  height={50}
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
              <div>
                <p className="text-gray-500">{item?.longName}</p>
                <p className="text-xl font-semibold text-gray-800">
                  {item?.currencyCode} {currencyFormat(item?.balance)}
                </p>
              </div>
            </motion.div>
          ))}
      </motion.div>
    </div>
  );
}

export default BalanceCard;
