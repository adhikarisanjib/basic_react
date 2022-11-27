import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import axios from 'axios'
import { apiDomain } from '../../config'

const PasswordReset = ({ displayMessage }) => {
    const { id } = useParams()
    const [password1, setPassword1] = useState('')
    const [password2, setPassword2] = useState('')
    const [formError, setFormError] = useState({
        nonField: '',
        password1: '',
        password2: ''
    })

    const navigate = useNavigate()

    const handleFormSubmit = (e) => {
        e.preventDefault()

        axios({
            method: 'post',
            url: `${apiDomain}/api/password_reset/${id}/`,
            data: {
                password1: password1,
                password2: password2,
                redirect_link: '127.0.0.1:3000'
            }
        })
        .then((response) => {
            // console.log(response)
            if (response.status === 200) {
                displayMessage('Your password has been reset. Please Login.', 'success')
            }
            navigate('/login')
        })
        .catch((error) => {
            // console.log(error)
            // console.log(error.response.data)
            const nonFieldError = error.response.data.non_field_errors ? error.response.data.non_field_errors : ''
            const password1Error = error.response.data.password1 ? error.response.data.password1 : ''
            const password2Error = error.response.data.password2 ? error.response.data.password2 : ''
            setFormError({...formError, nonField: nonFieldError, password1: password1Error, password2: password2Error})
        })
    }

    return (
        <div className='content-section'>
            <form method='POST' onSubmit={handleFormSubmit}>
                <legend className='border-bottom mb-2'>Password Reset</legend>
                <small className='text-danger'>{formError.nonField}</small>
                <div className='form-element'>
                    <label htmlFor='id_password1_input'>New Password</label>
                    <input type='password' id='id_password1_input' className='form-control' value={password1} onChange={(e) => setPassword1(e.target.value)} />
                    <small className='text-danger'>{formError.password1}</small>
                </div>
                <div className='form-element'>
                    <label htmlFor='id_password2_input'>Password Confirmation</label>
                    <input type='password' id='id_password2_input' className='form-control'  value={password2} onChange={(e) => setPassword2(e.target.value)} />
                    <small className='text-danger'>{formError.password2}</small>
                </div>
                <div className='form-group border-top py-2'>
                <button type='submit' className='btn btn-outline-info'>Reset</button>
            </div>
            </form>
        </div>
    )
}

export default PasswordReset