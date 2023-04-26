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
  const [ , setInputValue] = useState("");

  const handlePhoneNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);
    const valid = value.length === 12;
    setIsValid(valid);
    updateFields({ phoneNumber: event.target.value });
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && event.currentTarget.value.length !== 12) {
      event.preventDefault();
    }
  };

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
        className="form--input"
      />
      <label className="form--label">Phone number</label>
    </FormWrapper>
  )
}