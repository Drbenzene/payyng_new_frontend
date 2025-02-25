import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";

function BillsCard() {
  const bills = [
    { name: "Airtime", image: "/airtime.svg", route: "/airtime" },
    { name: "Data Sub.", image: "/internet.svg", route: "/data" },
    { name: "Electricity", image: "/electricity.png", route: "/electricity" },
    { name: "Cable TV", image: "/invoice.svg", route: "/cable-tv" },
    { name: "Betting", image: "/betting.png", route: "/betting" },
    // { name: "Internet", image: "/internet.svg", route: "/internet" },
    { name: "Education", image: "/education.jpg", route: "/education" },
  ];

  // TODO: COMPLETE THE INTERNET SUBSCRIPTION LATER ON

  const { push } = useRouter();

  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
        {bills.map((bill) => (
          <motion.div
            onClick={() => push(bill.route)}
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
            className="flex flex-col justify-start cursor-pointer items-start border rounded-xl p-4 border-gray-400"
            key={bill.name}
          >
            <div className="w-12 h-12 rounded-full my-3">
              <Image
                src={bill.image}
                alt={bill.name}
                width={50}
                height={50}
                className="w-full h-full"
              />
            </div>
            <div>
              <p className=" text-gray-500">{bill.name}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default BillsCard;
