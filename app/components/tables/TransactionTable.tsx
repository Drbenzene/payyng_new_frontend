import { Fragment, useState } from "react";
import { TransactionSkeletons } from "../skeletons/transactionSkeletons";
import ModalLayout from "../layouts/ModalLayout";
import Image from "next/image";

interface TransactionDto {
  data: any[];
  columns: any[];
  loading: boolean;
  emptyMessage?: string;
}

export default function PayyngTable({
  data,
  columns,
  loading,
  emptyMessage,
}: TransactionDto) {
  const [open, setOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<any>();
  return (
    <div>
      {/* className="px-4 sm:px-6 lg:px-8" */}
      {loading && <TransactionSkeletons />}
      {!loading && (
        <div className="mt-8 flow-root">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <table className="min-w-full divide-y divide-gray-300">
                <thead>
                  <tr>
                    {columns.map((column) => (
                      <th
                        key={column.id}
                        scope="col"
                        className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        {column.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {data?.map((transaction) => (
                    <tr key={transaction.id}>
                      {columns.map((column) => (
                        <Fragment key={column.id}>
                          {column.id === "status" ? (
                            <td
                              onClick={() => {
                                setSelectedTransaction(transaction);
                                setOpen(true);
                              }}
                              className="whitespace-nowrap px-2 py-2 text-sm text-gray-500"
                            >
                              <span
                                className={`px-4 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                  transaction[column.id] === "completed"
                                    ? "bg-green-100 text-green-800"
                                    : transaction[column.id] === "SUCCESS"
                                    ? "bg-green-100 text-green-800"
                                    : "bg-red-100 text-red-800"
                                }`}
                              >
                                {transaction[column.id]}
                              </span>
                            </td>
                          ) : (
                            <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-500">
                              {transaction[column.id]}
                            </td>
                          )}
                        </Fragment>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {!loading && data?.length === 0 && (
        <div className="flex justify-center  flex-col items-center h-96">
          <Image
            src="/empty2.svg"
            width={200}
            height={200}
            alt="No transaction"
          />
          <p className="text-gray-500 text-lg">
            {emptyMessage || "No Data found"}
          </p>
        </div>
      )}

      {open && (
        <ModalLayout title="" open={open} setOpen={setOpen}>
          <div>
            <div className="mt-5">
              <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                <div className="px-4 py-5 sm:px-6">
                  <h3 className="text-lg font-medium leading-6 text-gray-900">
                    Transaction Details
                  </h3>
                  <p className="mt-1 max-w-2xl text-sm text-gray-500">
                    Details of the transaction
                  </p>
                </div>
                <div className="border-t border-gray-200">
                  <dl>
                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">
                        Transaction ID
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
                        {selectedTransaction?.id}
                      </dd>
                    </div>
                    <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">
                        Amount
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
                        {selectedTransaction?.amount}
                      </dd>
                    </div>
                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">
                        Status
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
                        {selectedTransaction?.status}
                      </dd>
                    </div>
                    <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">
                        Transaction Type
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
                        {selectedTransaction?.transactionType}
                      </dd>
                    </div>
                    <div
                      className="bg-gray-50 px-4 py-
                    5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
                    >
                      <dt className="text-sm font-medium text-gray-500">
                        Date
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">
                        {selectedTransaction?.date}
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </ModalLayout>
      )}
    </div>
  );
}
