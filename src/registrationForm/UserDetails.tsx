import { FormWrapper } from "./FormWrapper"

type UserData = {
  email: string
  userName: string
}

type UserFormProps = UserData & {
  updateFields: (fields: Partial<UserData>) => void
}

export function UserDetails({ email, userName, updateFields}: UserFormProps) {
  return (
    <FormWrapper>
      <input autoFocus
            required 
            type="email" 
            value={email} 
            onChange={e => updateFields({ email: e.target.value })} 
            className="form--input"/>
      <label className="form--label">Email</label>
      <input
            required 
            type="text" 
            value={userName} 
            onChange={e => updateFields({ userName: e.target.value })} 
            className="form--input"/>
      <label className="form--label second--label">User Name</label>
    </FormWrapper>
  )
}