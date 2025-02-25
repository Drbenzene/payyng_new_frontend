import { useState, useEffect } from "react";
import { toast } from "sonner";
import { TailSpin } from "react-loader-spinner";
// import cardService from "../../features/card/cardAction";
import ModalLayout from "../layouts/ModalLayout";
import PayyngInput from "../inputs/PayyngInput";
import {
  addNewBank,
  resolveAccountNumber,
  useNigeriaBanks,
} from "@/hooks/useNigeriaBanks";
import PayyngButton from "../button/PayyngButton";
import { useBank } from "@/hooks/useBank";

interface AddBankModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}
const AddBankModal = ({ open, setOpen }: AddBankModalProps) => {
  const { data: banks } = useNigeriaBanks();
  const { refetch } = useBank();

  const [nuban, setNuban] = useState<string>("");
  const [bankCode, setBankCode] = useState<string>("");
  const [accountName, setAccountName] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [processing, setProcessing] = useState(false);

  const [values, setValues] = useState<any>({
    accountNumber: "",
    bankCode: "",
  });

  useEffect(() => {
    if (values.accountNumber.length === 10 && values.bankCode) {
      setAccountName("");
      setError("");
      ValidateAccDetails();
    }
  }, [values.accountNumber, values.bankCode]);

  console.log(values, "THE VALUES");

  const addBankHandler = async () => {
    if (!accountName) {
      return;
    }
    setProcessing(true);
    const response = await addNewBank(values);
    setProcessing(false);

    if (response) {
      toast.success("Bank account added successfully");
      refetch();
      setOpen(false);
    }
  };

  const ValidateAccDetails = async () => {
    setIsLoading(true);
    const response = await resolveAccountNumber({
      accountNumber: values.accountNumber,
      bankCode: values.bankCode,
    });
    console.log(response, "THE RESPONSE BACKKK");
    if (response) {
      setAccountName(response?.account_name);
      setIsLoading(false);
      return;
    }
    setError(
      "We couldn't verify your account. please check your details and try again."
    );
    setIsLoading(false);
  };

  return (
    <ModalLayout
      maxWidth="max-w-md"
      open={open}
      setOpen={setOpen}
      title="ADD NEW BANK"
    >
      <div className="min-h-[400px]">
        <p className="text-gray-500 text-start mt-2 text-2xl font-extrabold">
          Add BANK
        </p>{" "}
        <br />
        <div className="flex">
          <div className="md:mb-0 w-96 md:w-full">
            <PayyngInput
              type="phone"
              maxLength={10}
              minLength={10}
              placeholder="Account number"
              onChange={(e) => {
                setValues({
                  ...values,
                  accountNumber: e.target.value,
                });
              }}
              value={values.accountNumber}
              label={"Account Number"}
              id={"accountNumber"}
              name={"accountNumber"}
              onBlur={() => {}}
            />
          </div>
        </div>
        <br />
        <div className="flex">
          <div className="mb-6 w-96 md:w-full">
            <PayyngInput
              inputType="SELECT"
              maxLength={10}
              type="text"
              placeholder="Select Bank"
              onChange={(value: any) => {
                setBankCode(value);
              }}
              setValues={setValues}
              values={values}
              value={nuban}
              label={"Account Number"}
              id={"bankCode"}
              name={"bankCode"}
              data={(banks || []).map((bank: any) => ({
                value: bank.code,
                label: bank.name,
              }))}
              onBlur={() => {}}
            />
          </div>
        </div>
        {isLoading && (
          <TailSpin
            height="40"
            width="40"
            color="#5B2E4F"
            ariaLabel="tail-spin-loading"
            radius="7"
            wrapperStyle={{}}
            wrapperClass=""
          />
        )}
        {error && <p className="text-red-500 text-sm">{error}</p>}
        {accountName && (
          <div className="flex">
            <div className="mb-10 w-96 md:w-full">
              <label htmlFor="Account Name" className="  leading-5">
                Account Holder’s Name
              </label>
              <div
                className="appearance-none rounded-md relative block w-full
                                    px-3 py-3 text-[14px] font-[300px] bg-[#F8F1F6] placeholder-[#33343D]
                                    text-gray-900 hover:border-[#D43E8A] focus:outline-none focus:ring-[#D43E8A]
                                    focus:border-[#D43E8A] focus:z-10 sm:text-sm placeholder:text-[13px] placeholder:font-[500px] placeholder:text-gray-400 leading-5 "
              >
                {accountName}
              </div>
            </div>
          </div>
        )}
        <div className="flex justify-end">
          <PayyngButton
            disabled={!accountName ? true : false}
            isProcessing={processing}
            onClick={addBankHandler}
            text={"PROCEED"}
          />
        </div>
      </div>
    </ModalLayout>
  );
};

export default AddBankModal;
