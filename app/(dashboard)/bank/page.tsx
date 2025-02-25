"use client";

import React, { useEffect, useState } from "react";
import ContentLayout from "@/app/components/layouts/ContentLayout";
import PayyngBackButton from "@/app/components/back/PayyngBackButton";
import PayyngButton from "@/app/components/button/PayyngButton";
import AddBankModal from "@/app/components/modals/AddBankModal";
import { useBank } from "@/hooks/useBank";

function Page() {
  const [open, setOpen] = useState(false);
  const { data: banks, refetch } = useBank();
  console.log(banks, "THE BANKS");

  useEffect(() => {
    refetch();
  }, [refetch]);
  return (
    <ContentLayout>
      <div className="">
        <PayyngBackButton />
        <div className="flex items-center justify-between mt-5">
          <h1 className="text-2xl font-semibold text-gray-800">Banks</h1>
          <div className="flex items-center space-x-2">
            <PayyngButton
              onClick={() => {
                setOpen(true);
              }}
              text={"ADD NEW BANK"}
            />
          </div>
        </div>
        <p className="text-gray-500 pb-4">Manage your bank accounts</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {banks?.map((item: any, index: number) => (
            <div
              key={index}
              className="w-full cursor-pointer bg-black text-white p-6 rounded-lg shadow-lg hover:shadow-xl transform hover:translate-y-1 transition-all duration-300 ease-in-out"
            >
              <p className="text-2xl font-semibold text-white">
                {item?.accountNumber}
              </p>
              <p className="text-white">{item?.accountName}</p>
            </div>
          ))}
        </div>
      </div>

      {open && <AddBankModal open={open} setOpen={setOpen} />}
    </ContentLayout>
  );
}

export default Page;
