import { useState } from 'react'
import * as React from 'react'
import './style.css'
export interface IFormComponentProps {
  callback: <T>(data: T) => {}
}
interface IReturnData {
  firstName: string
  middleName?: string
  lastName: string
  dob: string
  birthplace: string
}
const FormComponent: React.FC<IFormComponentProps> = ({
  callback
}: IFormComponentProps) => {
  const [firstName, setFirstName] = useState('')
  const [middleName, setMiddleName] = useState('')
  const [lastName, setLastName] = useState('')
  const [dob, setDob] = useState('')
  const [birthplace, setBirthplace] = useState('')
  const [error, setError] = useState('')
  const [showIDCard, setShowIDCard] = useState(false)

  const handleSubmit = (e: any) => {
    e.preventDefault()

    // Simple validation
    if (!firstName || !lastName || !dob || !birthplace) {
      setError('Please enter all required fields')
      return
    }
    const returnValue: IReturnData = {
      firstName: firstName,
      lastName: lastName,
      dob: dob,
      birthplace: birthplace,
      ...(middleName.trim() !== '' ? { middleName } : {})
    }
    // If all fields are filled, show ID card
    callback(returnValue)
    setShowIDCard(true)
    setError('')
  }

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Middle Name (Optional)"
          value={middleName}
          onChange={(e) => setMiddleName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Date of Birth (YYYY-MM-DD)"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
        />
        <input
          type="text"
          placeholder="Place of Birth"
          value={birthplace}
          onChange={(e) => setBirthplace(e.target.value)}
        />
        <button type="submit">Submit</button>
        {error && <p className="error">{error}</p>}
      </form>

      {showIDCard && (
        <div className="id-card-popup">
          <div className="id-card">
            <h2>College ID Card</h2>
            <div className="id-details">
              <p>
                <strong>Name:</strong> {firstName}{' '}
                {middleName && `${middleName} `}
                {lastName}
              </p>
              <p>
                <strong>DOB:</strong> {dob}
              </p>
              <p>
                <strong>Birthplace:</strong> {birthplace}
              </p>
            </div>
            <button onClick={() => setShowIDCard(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default FormComponent
