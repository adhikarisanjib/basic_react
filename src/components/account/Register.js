import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import axios from 'axios'
import { apiDomain } from '../../config'

const Register = ({ displayMessage }) => {
    let navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password1, setPassword1] = useState('')
    const [password2, setPassword2] = useState('')

    const [formError, setFormError] = useState({
      nonField: '',
      email: '',
      username: '',
      password1: '',
      password2: '',
    })

    const handleUserRegistration = (e) => {
        e.preventDefault()
        axios({
          method: 'post',
          url: `${apiDomain}/api/register/`,
          data: {
            email: email,
            username: username,
            password1: password1,
            password2: password2,
            redirect_link: 'localhost:3000--accountActivationRedirect'
          }
        })
        .then((response) => {
          // console.log(response)
          if (response.status === 200) {
            displayMessage('Email verification request has been sent to your email.\nCheck it out and proceed to login.', 'success')
            navigate('/login')
          }
        })
        .catch((error) => {
          // console.log(error)
          // console.log(error.response.data)
          const nonFieldError = error.response.data.non_field_errors ? error.response.data.non_field_errors : ''
          const emailError = error.response.data.email ? error.response.data.email : ''
          const usernameError = error.response.data.username ? error.response.data.username : ''
          const password1Error = error.response.data.password1 ? error.response.data.password1 : ''
          const password2Error = error.response.data.password2 ? error.response.data.password2 : ''
          setFormError({...formError, nonField: nonFieldError, email: emailError, username: usernameError, password1: password1Error, password2: password2Error})
        })
    }

  return (
    <div className='content-section' onSubmit={handleUserRegistration}>
            <form method='POST'>
                  <legend className='border-bottom mb-2'>Register</legend>
                  <small className='text-danger'>{formError.nonField}</small>
                  <div className='form-element'>
                    <label htmlFor='id_email_input'>Email</label>
                    <input id='id_email_input' type='text' className='form-control' value={email} onChange={(e) => setEmail(e.target.value)}/>
                    <small className='text-danger'>{formError.email}</small>
                  </div>
                  <div className='form-element'>
                    <label htmlFor='id_email_input'>Username</label>
                    <input id='id_username_input' type='text' className='form-control' value={username} onChange={(e) => setUsername(e.target.value)}/>
                    <small className='text-danger'>{formError.username}</small>
                  </div>
                  <div className='form-element'>
                    <label htmlFor='id_password1_input'>Password</label>
                    <input id='id_password1_input' type='password' className='form-control' value={password1} onChange={(e) => setPassword1(e.target.value)}/>
                    <small className='text-danger'>{formError.password1}</small>
                  </div>
                  <div className='form-element'>
                    <label htmlFor='id_password2_input'>Password Confirmation</label>
                    <input id='id_password2_input' type='password' className='form-control' value={password2} onChange={(e) => setPassword2(e.target.value)}/>
                    <small className='text-danger'>{formError.password2}</small>
                  </div> 
                <div className='form-group border-top py-2'>
                    <button type='submit' className='btn btn-outline-info'>Register</button>
                </div>
            </form>
            <div className='border-top pt-2'>
                <small className='text-muted'>
                    Already have an account?  <Link to='/login'>Login</Link>
                </small>
            </div>
        </div>
  )
}

export default Register