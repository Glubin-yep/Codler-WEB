import { useState } from "react"
import { FormWrapper } from "./FormWrapper"

type PasswordData = {
  password: string
  confirmPassword: string
}

type PasswordFormProps = PasswordData & {
  updateFields: (fields: Partial<PasswordData>) => void
}

export function PasswordDetails({ password, confirmPassword, updateFields}: PasswordFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <FormWrapper>
      <input autoFocus
            required 
            type={showPassword ? 'text' : 'password'}  
            value={password}
            onChange={e => updateFields({ password: e.target.value })}  
            className="form--input"/>
      <label className="form--label">Password</label>
      <input
            required 
            type={showPassword ? 'text' : 'password'}
            value={confirmPassword} 
            onChange={e => updateFields({ confirmPassword: e.target.value })}  
            className="form--input"/>
      <label className="form--label second--label">Confirm</label>
      <div className="checkbox">
        <input type="checkbox" className="checkbox--input" onChange={() => setShowPassword(!showPassword)}/>
        <p className="show--password">Show password</p>
      </div>
    </FormWrapper>
  )
}