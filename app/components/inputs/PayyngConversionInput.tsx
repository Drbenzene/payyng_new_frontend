import React from "react";
import Select from "react-select";
import CurrencyInput from "react-currency-input-field";
import { currencyArray } from "@/constants/constantValues";
import { useWallet } from "@/hooks/useWallet";

interface PayyngInputProps {
  label: string;
  id: string;
  name: string;
  type: string;
  placeholder: string;
  value: string;
  valueName?: string;
  amountValue?: any;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  required?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  accept?: string;
  error?: string;
  touched?: boolean;
  setValues?: any;
  values?: any;
  currency?: string;
}

function PayyngConversionInput({
  placeholder,
  label,
  id,
  name,
  value,
  onChange,
  onBlur,
  setValues,
  values,
  currency,
  disabled,
  valueName,
  amountValue,
}: PayyngInputProps) {
  // Find the default option based on the `value` prop
  const defaultOption = currencyArray.find((option) => option.value === value);
  const { data: wallet } = useWallet();
  return (
    <>
      <label className="text-base font-medium">{label}</label>
      <div className="flex rounded-lg items-center justify-center w-full h-full bg-white">
        <div className="w-[30%]">
          <Select
            onChange={(option) => {
              setValues({
                ...values,
                [name]: option?.value, // Update the state with the selected value
              });
            }}
            name={name}
            id={id}
            isSearchable={false}
            value={defaultOption} // Set the default selected option object
            placeholder={""}
            formatOptionLabel={(option: any) => (
              <div className="flex items-center">
                {option.image && (
                  <img
                    src={option.image}
                    alt={option.label}
                    className="w-5 h-5 rounded-full mr-2"
                  />
                )}
                <span>{option?.label}</span>
              </div>
            )}
            styles={{
              control: (provided, state) => ({
                ...provided,
                border: "1px solid #E5E7EB",
                borderRadius: "0.375rem",
                padding: "0.5rem",
                backgroundColor: state.isFocused ? "#f3f4f6" : "white",
                color: state.isFocused ? "#1E40AF" : "#111827",
                "&:hover": {
                  borderColor: state.isFocused ? "#1E40AF" : "#E5E7EB",
                },
              }),
              container: (provided) => ({
                ...provided,
                width: "100%",
              }),
              menu: (provided) => ({
                ...provided,
                zIndex: 9999, // Ensure the dropdown is visible above other elements
              }),
            }}
            options={(wallet || []).map((item: any) => ({
              label: item?.currencyCode,
              value: item?.currencyCode,
              image: item?.currencyFlag,
            }))}
            className="w-full rounded-lg border border-black bg-white dark:bg-gray-800 dark:text-white"
          />
        </div>
        <div className="w-[80%] relative">
          <CurrencyInput
            id={valueName}
            name={valueName}
            prefix={`${currency}  ${" "}`}
            placeholder={placeholder}
            decimalsLimit={2}
            onValueChange={(value: any) => {
              setValues({
                ...values,
                amount: value,
              });
              onChange(value);
            }}
            value={amountValue}
            disabled={disabled}
            className={`rounded-lg w-full h-full p-4 bg-white dark:bg-gray-800 dark:text-white focus:border-transparent border disabled:cursor-not-allowed disabled:bg-gray-50`}
          />
        </div>
      </div>
    </>
  );
}

export default PayyngConversionInput;
