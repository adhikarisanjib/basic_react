import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

import { apiDomain } from '../../config'


const Login = () => {
    let navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [formError, setFormError] = useState({
        nonField: '',
        email: '',
        password: ''
    })
    const token = localStorage.getItem('rdrf-token')

    const handleUserLogin = (e) => {
        e.preventDefault()

        axios({
            method: 'post',
            url: `${apiDomain}/api/login/`,
            data: {
                username: email,
                password: password
            }
        })
        .then((response) => {
            // console.log(response)
            if (response.status === 200) {
                const token = response.data['token'];
                localStorage.setItem('rdrf-token', token);
                window.location.reload()
            }
        })
        .catch((error) => {
            console.log(error)
            // console.log(error.response.data)
            const nonFieldError = error.response.data.non_field_errors ? error.response.data.non_field_errors : ''
            const emailError = error.response.data.username ? error.response.data.username : ''
            const passwordError = error.response.data.password ? error.response.data.password : ''
            setFormError({...formError, nonField: nonFieldError, email: emailError, password: passwordError})
        })
    }

    useEffect(() => {
        if(token) {
            navigate('/')
        }
    })

  return (
    <div className='content-section'>
        <form method='POST' onSubmit={handleUserLogin}>
                <legend className='border-bottom mb-2'>Login</legend>
                <small className='text-danger'>{formError.nonField}</small>
                <div className='form-element'>
                    <label htmlFor='id_email_input'>Email</label>
                    <input id='id_email_input' type='email' className='form-control' value={email} onChange={(e) => setEmail(e.target.value)}/>
                    <small className='text-danger'>{formError.email}</small>
                </div>
                <div className='form-element'>
                    <label htmlFor='id_password_input'>Password</label>
                    <input id='id_password_input' type='password' className='form-control' value={password} onChange={(e) => setPassword(e.target.value)}/>
                    <small className='text-danger'>{formError.password}</small>
                </div>   
            <div className='form-group border-top py-2'>
                <button type='submit' className='btn btn-outline-info'>Login</button>
                <small className='text-muted mx-2'>
                    Forget password
                </small>
            </div>
        </form>
        <div className='border-top pt-2'>
            <small className='text-muted'>
                Need an account? <Link to='/register'>Register</Link>
            </small>
        </div>
    </div>
  )
}

export default Login