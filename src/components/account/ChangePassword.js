import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import axios from 'axios'
import { apiDomain } from '../../config'

const ChangePassword = ({ displayMessage }) => {
  const navigate = useNavigate()
  const token = localStorage.getItem('rdrf-token')

  const [current_password, setCurrentPassword] = useState('')
  const [password1, setPassword1] = useState('')
  const [password2, setPassword2] = useState('')
  const [formError, setFormError] = useState({
    nonField: '',
    currentPassword: '',
    password1: '',
    password2: ''
  })

  const handlePasswordChange = (e) => {
      e.preventDefault()

      axios({
        method: 'post',
        url: `${apiDomain}/api/password_change/`,
        data: {
          current_password: current_password,
          password1: password1,
          password2: password2
        },
        headers: {
          'Authorization': `Token ${token}`
        }
      })
      .then((response) => {
        // console.log(response.data)
        if (response.status === 200) {
          displayMessage('Password changed successfully.', 'success')
          navigate('/account')
        }
      })
      .catch((error) => {
        // console.log(error)
        // console.log(error.response.data)
        const nonFieldError = error.response.data.non_field_errors ? error.response.data.non_field_errors : ''
        const currentPasswordError = error.response.data.current_password ? error.response.data.current_password : ''
        const password1Error = error.response.data.password1 ? error.response.data.password1 : ''
        const password2Error = error.response.data.password2 ? error.response.data.password2 : ''
        setFormError({...formError, nonField: nonFieldError, currentPassword: currentPasswordError, password1: password1Error, password2: password2Error})
      })
  }
  return (
    <div className='content-section'>
      <form method='POST' onSubmit={handlePasswordChange}>
        <legend className='border-bottom mb-2'>Change Password</legend>
        <small className='text-danger'>{formError.nonField}</small>
        <div className='form-element'>
          <label htmlFor='id_current_password_input'>Current Password</label>
          <input className='form-control' id='id_current_password_input' type='password' onChange={(e) => setCurrentPassword(e.target.value)} />
          <small className='text-danger'>{formError.currentPassword}</small>
        </div>
        <div className='form-element'>
          <label htmlFor='id_password1_input'>New Password</label>
          <input className='form-control' id='id_password1_input' type='password' onChange={(e) => setPassword1(e.target.value)} />
          <small className='text-danger'>{formError.password1}</small>
        </div>
        <div className='form-element'>
          <label htmlFor='id_password2_input'>Confirm New Password</label>
          <input className='form-control' id='id_password2_input' type='password' onChange={(e) => setPassword2(e.target.value)} />
          <small className='text-danger'>{formError.password2}</small>
        </div>
        <div className='border-top'>
          <button type='submit' className='btn btn-primary mt-3'>Change</button>
        </div>
      </form>
    </div>
  )
}

export default ChangePassword