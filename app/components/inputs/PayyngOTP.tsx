import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import { OtpInput } from "reactjs-otp-input";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { motion } from "framer-motion";

interface PayyngOTPProps {
  maxLength: number;
  pattern: string;
  value: string;
  name: string;
  id: string;
  setValues: any;
  values: any;
  error?: any;
  label?: string;
}

export function PayyngOTP({
  value,
  maxLength,
  name,
  id,
  setValues,
  values,
  error,
  label,
}: PayyngOTPProps) {
  return (
    <>
      <label
        htmlFor={id}
        className="text-sm font-semibold text-gray-600 dark:text-gray-400"
      >
        {label}
      </label>
      <div className="w-full flex  justify-start items-center">
        {/* <InputOTP
          onChange={(value: any) => {
            setValues(() => ({
              ...values,
              [name]: value,
            }));
          }}
          value={value}
          maxLength={maxLength}
          pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
          name={name}
          id={id}
        >
          <InputOTPGroup className="flex gap-4">
            {Array.from({ length: maxLength }, (_, index) => (
              <InputOTPSlot
                index={index}
                className="w-12 h-12 text-xl text-center border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ))}
          </InputOTPGroup>
        </InputOTP> */}
        <OtpInput
          value={value}
          placeholder="*"
          onChange={(value: any) => {
            setValues(() => ({
              ...values,
              [name]: value,
            }));
          }}
          numInputs={maxLength}
          // separator={<span> - </span>}
          containerStyle={{
            display: "flex",
            justifyContent: "center",
            gap: "10px",
          }}
          inputStyle={{
            width: "60px",
            height: "60px",
            fontSize: "20px",
            border: "1px solid #ccc",
            // borderRadius: "5px",
            textAlign: "center",
          }}
          isInputNum={true}
          shouldAutoFocus={true}
          isInputSecure={true}
        />
      </div>
      {error && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="text-red-500 text-xs py-2 font-semibold mt-1"
        >
          {error}
        </motion.div>
      )}
    </>
  );
}
