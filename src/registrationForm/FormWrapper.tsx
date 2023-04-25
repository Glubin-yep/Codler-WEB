import { ReactNode } from "react"
import './registrationForm.css'

type FormWrapperProps = {
  children: ReactNode
}

export function FormWrapper({ children } : FormWrapperProps) {
  return (
    <>
      <div className="form--element">{ children }</div>
    </>
  )
}