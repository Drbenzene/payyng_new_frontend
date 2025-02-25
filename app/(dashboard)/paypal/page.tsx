"use client";

import React, { useState } from "react";
import ContentLayout from "@/app/components/layouts/ContentLayout";
import { usePaypal } from "@/hooks/usePaypal";
import PayyngTable from "@/app/components/tables/TransactionTable";
import moment from "moment";
import PayyngBackButton from "@/app/components/back/PayyngBackButton";
import PayyngButton from "@/app/components/button/PayyngButton";
import { useRouter } from "next/navigation";
import { APP_PATH } from "@/constants/appPath";
import { useUser } from "@/hooks/useUser";
import VerifyBVNModal from "@/app/components/modals/VerifyBVNModal";

function Page() {
  const [open, setOpen] = useState(false);
  const { push } = useRouter();
  const { data, isLoading } = usePaypal();
  const { data: user } = useUser();
  const columns = [
    {
      id: "paypalInvoiceId",
      name: "Invoice ID",
    },
    {
      id: "invoiceReference",
      name: "Reference",
    },
    {
      id: "recipientEmail",
      name: "Recipient Email",
    },
    {
      id: "invoiceLink",
      name: "Payment Link",
    },
    {
      id: "createdAt",
      name: "Date",
    },
    {
      id: "status",
      name: "Status",
    },
  ];
  return (
    <ContentLayout>
      <div className="flex my-4 justify-between items-center">
        <PayyngBackButton />
      </div>

      <div className="w-full flex justify-between items-center">
        <p className="text-2xl font-semibold text-gray-800">Paypal </p>

        <div className="flex space-x-4">
          <PayyngButton
            onClick={() => {
              if (user?.tier === 0) {
                return setOpen(true);
              }
              if (
                user?.idVerificationStatus === "NOT_SUBMITTED" ||
                user?.idVerificationStatus === "PENDING"
              ) {
                push(APP_PATH.VERIFICATION);
              }
              push(APP_PATH.PAYPAL_INVOICE);
            }}
            text={"CREATE NEW INVOICE"}
          />
        </div>
      </div>

      <PayyngTable
        columns={columns}
        data={(data || []).map((item: any) => ({
          ...item,
          createdAt: moment(item.createdAt).format("MMM Do YY, h:mm a"),
          status: item.status === "SENT" ? "Pending" : "Completed",
        }))}
        loading={isLoading}
      />

      {open && <VerifyBVNModal open={open} setOpen={setOpen} />}
    </ContentLayout>
  );
}

export default Page;
