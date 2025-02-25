"use client";

import React, { useState } from "react";
import { useTransaction } from "@/hooks/useTransaction";
import PayyngTable from "@/app/components/tables/TransactionTable";
import { transactionColumns } from "@/constants/constantValues";
import moment from "moment";
import { currencyFormat } from "@/utils/helpers";
import ContentLayout from "@/app/components/layouts/ContentLayout";
import PayyngInput from "@/app/components/inputs/PayyngInput";

function Page() {
  const [filters, setFilters] = useState({});
  const { data: transactions, isLoading } = useTransaction();
  return (
    <div>
      <div className="w-full mt-5">
        <ContentLayout>
          <p className="text-2xl font-semibold text-gray-800 mb-4">
            Transactions
          </p>
          {/* 
          <div className="flex justify-between items-center">
            <PayyngInput
              inputType="SELECT"
              placeholder="Search Transactions"
              onChange={(e) => setFilters({ search: e.target.value })}
              label={""}
              id={""}
              name={""}
              type={""}
              value={""}
              onBlur={function (
                e: React.FocusEvent<HTMLInputElement, Element>
              ): void {
                throw new Error("Function not implemented.");
              }}
            />

            <PayyngInput
              inputType="SELECT"
              placeholder=""
              onChange={(e) => setFilters({ search: e.target.value })}
              label={""}
              id={""}
              name={""}
              type={""}
              value={""}
              onBlur={function (
                e: React.FocusEvent<HTMLInputElement, Element>
              ): void {
                throw new Error("Function not implemented.");
              }}
            />
          </div> */}
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
        </ContentLayout>
      </div>
    </div>
  );
}

export default Page;
