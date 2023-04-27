import { PasswordDetails } from './PasswordDetails';
import { PhoneDetails } from './PhoneDetails';
import { UserDetails } from './UserDetails';
import './registrationForm.css'
import { useMultistepForm } from './useMultistepForm'
import { FormEvent, useState } from 'react'
import logo from '../images/logo.png'

type FormData = {
  phoneNumber: string
  userName: string
  email: string
  password: string
  confirmPassword: string
}

const INITIALL_DATA : FormData = {
  phoneNumber: "",
  userName: "",
  email: "",
  password: "",
  confirmPassword: ""
}

function RegistrationForm() {
  const [ data, setData ] = useState(INITIALL_DATA);
  const [isValid, setIsValid] = useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState(true);

  function updateFields(fields: Partial<FormData>) {
    setData(prev => {
      return {...prev, ...fields}
    })
  }

  const {
    step, 
    isFirstStep, 
    back, 
    next, 
    isLastStep 
  } = useMultistepForm([
    //<UserForm {...data} updateFields={updateFields} />,
    <PhoneDetails {...data} updateFields={updateFields} setIsValid={setIsValid}/>,
    <UserDetails {...data} updateFields={updateFields}/>,
    <PasswordDetails {...data} updateFields={updateFields} passwordsMatch={passwordsMatch} setPasswordsMatch={setPasswordsMatch} />
  ]);

  function onSubmit(e: FormEvent) {
    e.preventDefault()
    if (!isLastStep) return next()

    if (data.password !== data.confirmPassword) {
      setPasswordsMatch(false);
      return;
    }
    setPasswordsMatch(true);

    alert("Successful Account Creation")
    console.log(data);
    setData(data);
  }

  return (
    <> 
      <div className='registrationPage'>
          <div className='title'>
              <img src={logo} alt="logo" className='logo--image' />
              <h1 className='title--name'>CODLER</h1>
          </div>
          <div className="registrationForm">
          <form onSubmit={onSubmit}>
            {step}
            <div className='buttons'>
              {!isFirstStep && <button type='button' className='button' onClick={back}>
                Back
                </button>}
              { isValid && (
                <button type='submit' className="button">
                  {isLastStep ? "Finish" : "Next"}
                </button>
              )}
            </div>
          </form>
          </div>
      </div>
      
    </>
  )
}

export default RegistrationForm
