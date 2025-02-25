import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { motion } from "framer-motion";
import "react-phone-number-input/style.css";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import Select from "react-select";
import CurrencyInput from "react-currency-input-field";
import { FiEye } from "react-icons/fi";
import { FiEyeOff } from "react-icons/fi";
import Image from "next/image";

interface PayyngInputProps {
  label: string;
  id: string;
  name: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  required?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  autoFocus?: boolean;
  autoComplete?: string;
  maxLength?: number;
  minLength?: number;
  pattern?: string;
  size?: number;
  step?: number;
  list?: string;
  inputMode?: string;
  multiple?: boolean;
  accept?: string;
  error?: any;
  touched?: boolean;
  setValues?: any;
  values?: any;
  currency?: string;
  data?: any[];
  inputType?:
    | "TEXT"
    | "PHONE"
    | "SELECT"
    | "CURRENCY"
    | "PASSWORD"
    | "TEXTAREA";
}

function PayyngInput({
  id,
  name,
  type,
  placeholder,
  value,
  onChange,
  onBlur,
  onFocus,
  required,
  disabled,
  readOnly,
  autoFocus,
  autoComplete,
  maxLength,
  minLength,
  pattern,
  size,
  label,
  error,
  touched,
  setValues,
  values,
  inputType = "TEXT",
  currency,
  data,
}: PayyngInputProps) {
  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];

  const [showPassword, setShowPassword] = useState(false);

  return (
    <div>
      <label
        htmlFor={id}
        className="text-sm font-semibold text-gray-600 dark:text-gray-400 pb-5"
      >
        {label}
      </label>
      {inputType === "TEXT" && (
        <Input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          onFocus={onFocus}
          required={required}
          disabled={disabled}
          readOnly={readOnly}
          autoFocus={autoFocus}
          autoComplete={autoComplete}
          maxLength={maxLength}
          minLength={minLength}
          pattern={pattern}
          size={size}
          id={id}
          name={name}
          className="flex flex-col rounded-lg items-center justify-center w-full h-full p-4 bg-white   dark:bg-gray-800 dark:text-white"
        />
      )}

      {inputType === "PASSWORD" && (
        <div className="relative">
          <Input
            type={showPassword ? "text" : "password"}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            onFocus={onFocus}
            required={required}
            disabled={disabled}
            readOnly={readOnly}
            autoFocus={autoFocus}
            autoComplete={autoComplete}
            maxLength={maxLength}
            minLength={minLength}
            pattern={pattern}
            size={size}
            id={id}
            name={name}
            className="flex flex-col rounded-lg items-center justify-center w-full h-full p-4 bg-white   dark:bg-gray-800 dark:text-white"
          />{" "}
          <div className="flex items-center justify-end absolute w-full top-1/3 -left-5">
            <button
              type="button"
              className="focus:outline-none"
              onClick={() => {
                console.log("clicked");
              }}
            >
              {!showPassword ? (
                <FiEye
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-gray-400"
                />
              ) : (
                <FiEyeOff
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-gray-400"
                />
              )}
            </button>
          </div>
        </div>
      )}

      {inputType === "PHONE" && (
        <PhoneInput
          country="NG"
          countryCallingCodeEditable={false}
          international
          initialValueFormat="national"
          defaultCountry="NG"
          placeholder={placeholder}
          value={value}
          onChange={(value) => {
            setValues({
              ...values,
              [name]: value,
            });
          }}
          onBlur={onBlur}
          onFocus={onFocus}
          required={required}
          disabled={disabled}
          readOnly={readOnly}
          autoFocus={autoFocus}
          autoComplete={autoComplete}
          maxLength={maxLength}
          minLength={minLength}
          pattern={pattern}
          size={size}
          id={id}
          name={name}
          error={
            value
              ? isValidPhoneNumber(value)
                ? undefined
                : "Invalid phone number"
              : "Phone number required"
          }
          style={{ width: "100%" }}
          className="border rounded-lg w-full h-full p-4 bg-white   dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          // className="flex flex-col rounded-lg items-center justify-center w-full h-full p-4 bg-white   dark:bg-gray-800 dark:text-white"
        />
      )}

      {inputType === "SELECT" && (
        <div className="w-full">
          <Select
            onChange={(option) => {
              setValues({
                ...values,
                [name]: option.value,
              });
              onChange(option?.value);
            }}
            name={name}
            id={id}
            isSearchable={true}
            placeholder={placeholder}
            formatOptionLabel={(option) => (
              <div className="flex items-center">
                {option.image && (
                  <Image
                    src={option.image}
                    alt={option.label}
                    height={20}
                    width={20}
                    className="w-5 h-5 rounded-full mr-2"
                  />
                )}
                <span>{option.label}</span>
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
            options={data || options}
            className="w-full rounded-lg border border-black bg-white dark:bg-gray-800 dark:text-white"
          />
        </div>
      )}

      {inputType === "TEXTAREA" && (
        <textarea
          id={id}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={(e: any) => onChange(e)}
          onBlur={(e: any) => onBlur(e)}
          required={required}
          disabled={disabled}
          readOnly={readOnly}
          autoFocus={autoFocus}
          autoComplete={autoComplete}
          maxLength={maxLength}
          minLength={minLength}
          rows={5}
          className="border rounded-lg w-full h-full p-4 bg-white   dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
        />
      )}

      {inputType === "CURRENCY" && (
        <CurrencyInput
          id={id}
          name={name}
          prefix={currency ? `${currency} ` : "NGN "}
          placeholder={placeholder}
          decimalsLimit={2}
          onValueChange={(value) => {
            setValues({
              ...values,
              [name]: value,
            });
          }}
          value={value}
          disabled={disabled}
          className="border rounded-lg w-full h-full p-4 bg-white   dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
        />
      )}

      {error && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="text-red-500 text-xs font-semibold mt-1"
        >
          {error}
        </motion.div>
      )}
    </div>
  );
}

export default PayyngInput;
