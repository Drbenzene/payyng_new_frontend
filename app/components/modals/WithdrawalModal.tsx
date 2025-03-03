import { toast } from "sonner";
import ModalLayout from "../layouts/ModalLayout";
import PayyngInput from "../inputs/PayyngInput";
import { useNigeriaBanks } from "@/hooks/useNigeriaBanks";
import PayyngButton from "../button/PayyngButton";
import { useBank } from "@/hooks/useBank";
import { Formik } from "formik";
import * as Yup from "yup";
import { Currency } from "@/constants/constantValues";
import { useWallet } from "@/hooks/useWallet";
import { useRouter } from "next/navigation";
import { API_PATH } from "@/constants/apiType";

interface WithdrawalModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}
const WithdrawalModal = ({ open, setOpen }: WithdrawalModalProps) => {
  const { data: banks } = useBank();
  const { data: nigeriaBanks } = useNigeriaBanks();
  const { data: wallet } = useWallet();
  const { push } = useRouter();

  const withdrawalHandler = async (values: any) => {};

  return (
    <ModalLayout
      maxWidth="max-w-md"
      open={open}
      setOpen={setOpen}
      title="WITHDRAWAL"
    >
      <div className="min-h-[400px]">
        <p className="text-gray-500 text-start mt-2 text-2xl font-extrabold">
          WITHDRAWAL TO BANK
        </p>{" "}
        <br />
        <p className="text-xs text-gray-500">
          Withdraw funds to bank account. Please ensure that the account details
          are correct.
        </p>
        <br />
        <Formik
          initialValues={{
            amount: "",
            id: "",
          }}
          validationSchema={Yup.object({
            amount: Yup.string().required("Amount is Required"),
          })}
          onSubmit={async (values, { setSubmitting }) => {
            await withdrawalHandler(values);
            setSubmitting(false);
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            setValues,
            handleSubmit,
            isSubmitting,
            isValid,
          }) => (
            <form onSubmit={handleSubmit}>
              {banks?.length === 0 && (
                <div
                  onClick={() => {
                    push(API_PATH.ADD_BANK);
                  }}
                  className="w-full cursor-pointer bg-black text-white p-6 rounded-lg shadow-lg hover:shadow-xl transform hover:translate-y-1 transition-all duration-300 ease-in-out"
                >
                  <p className="text-center">Add New Bank</p>
                </div>
              )}

              {banks?.length > 0 && (
                <>
                  <p>
                    <span className="text-gray-500 mb-3">Choose Account</span>
                  </p>
                  {banks?.map((item: any, index: number) => (
                    <div
                      key={index}
                      onClick={() => {
                        setValues({ ...values, id: item.id });
                      }}
                      className={`w-full cursor-pointer bg-black text-white p-6 rounded-lg shadow-lg hover:shadow-xl transform hover:translate-y-1 transition-all duration-300 ease-in-out ${
                        values.id === item.id
                          ? "border-green-800 rounded-xl  border-2"
                          : ""
                      }`}
                    >
                      <p className=" font-semibold text-white">
                        {item?.accountNumber}
                      </p>
                      <p className="text-white">{item?.accountName}</p>
                      <p className="text-white text-sm pt-2">
                        {
                          nigeriaBanks?.find(
                            (bank: any) => bank.code === item.bankCode
                          ).name
                        }
                      </p>
                    </div>
                  ))}

                  <div className="mt-3">
                    <PayyngInput
                      inputType="CURRENCY"
                      label="Amount"
                      name="amount"
                      type="number"
                      value={values.amount}
                      onChange={handleChange}
                      error={errors.amount}
                      touched={touched.amount}
                      id={"amount"}
                      placeholder={"Enter Withdrawal Amount"}
                      onBlur={handleBlur}
                      currency={Currency.NGN}
                      values={values}
                      setValues={setValues}
                    />
                  </div>
                  <div className="w-full mt-10">
                    <PayyngButton
                      text={"PROCEED"}
                      onClick={handleSubmit}
                      isProcessing={isSubmitting}
                      disabled={isSubmitting || !isValid}
                    />
                  </div>
                </>
              )}
            </form>
          )}
        </Formik>
      </div>
    </ModalLayout>
  );
};

export default WithdrawalModal;
