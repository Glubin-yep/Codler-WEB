import { FormWrapper } from "./FormWrapper"
import Cleave from 'cleave.js/react';
import { useState } from "react";

type PhoneData = {
  phoneNumber: string
}

type PhoneFormProps = PhoneData & {
  updateFields: (fields: Partial<PhoneData>) => void
  setIsValid: (isValid: boolean) => void;
}

export function PhoneDetails({ phoneNumber, updateFields, setIsValid}: PhoneFormProps) {
  const [ inputValue, setInputValue] = useState("");
  const allowedPrefixes = ['039', '050', '063', '066', '067', '068', '091', '092', '093', '094', '095', '096', '097', '098', '099'];
  const [inputClassName, setInputClassName] = useState("");

  const handlePhoneNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);
    const isValidLength = value.length === 12;
    const isValidPrefix = allowedPrefixes.some(prefix => value.startsWith(prefix));
    setIsValid(isValidLength && isValidPrefix);
    if (isValidLength && isValidPrefix) {
      updateFields({ phoneNumber: value });
    }
    if (value.length === 12) {
      setInputClassName(isValidPhoneNumber(value) ? "phone--input-valid" : "phone--input-invalid");
    } else {
      setInputClassName("");
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      const value = event.currentTarget.value;
      const validPrefix = allowedPrefixes.some(prefix => value.startsWith(prefix));
      if (!validPrefix || value.length !== 12) {
        event.preventDefault();
      }
    }
  };

  let label = "Phone number";
  if (inputValue.length === 12 && !isValidPhoneNumber(inputValue)) {
    label = "Incorrect Phone Number";
  }

  return (
    <FormWrapper>
      <Cleave 
        autoFocus
        required
        options={{
          blocks: [3, 3, 4],
          numericOnly: true
         }}
        value={phoneNumber}
        onChange={handlePhoneNumberChange}
        onKeyDown={handleKeyDown}
        className={`phone--input ${inputClassName}`}
      />
      <label className="form--label">{label}</label>
      <span className="country--code">+38</span>
    </FormWrapper>
  )
}

function isValidPhoneNumber(phoneNumber: string) {
  const allowedPrefixes = ['039', '050', '063', '066', '067', '068', '091', '092', '093', '094', '095', '096', '097', '098', '099'];
  const validLength = phoneNumber.length === 12;
  const validPrefix = allowedPrefixes.some(prefix => phoneNumber.startsWith(prefix));
  return validLength && validPrefix;
}