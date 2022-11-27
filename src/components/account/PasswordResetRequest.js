import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import axios from 'axios'
import { apiDomain } from '../../config'

const PasswordResetRequest = ({ displayMessage }) => {
    const [email, setEmail] = useState('')
    const [formError, setFormError] = useState({
        nonField: '',
        email: ''
    })

    const navigate = useNavigate()

    const handleFormSubmit = (e) => {
        e.preventDefault()

        axios({
            method: 'post',
            url: `${apiDomain}/api/password_reset_request/`,
            data: {
                email: email,
                redirect_link: '127.0.0.1:3000--resetPassword'
            }
        })
        .then((response) => {
            // console.log(response)
            if (response.status === 200) {
                displayMessage('An email with reset link has been sent to your email. Please check your email.', 'success')
            }
            navigate('/')
        })
        .catch((error) => {
            // console.log(error)
            // console.log(error.response.data)
            const nonFieldError = error.response.data.non_field_errors ? error.response.data.non_field_errors : ''
            const emailError = error.response.data.email ? error.response.data.email : ''
            setFormError({...formError, nonField: nonFieldError, email: emailError})
        })
    }

    return (
        <div className='content-section'>
            <form method='POST' onSubmit={handleFormSubmit}>
                <legend className='border-bottom mb-2'>Password Reset Request</legend>
                <small className='text-danger'>{formError.nonField}</small>
                <div className='form-element'>
                    <label htmlFor='id_email_input'>Email</label>
                    <input type={email} id='id_email_input' className='form-control' value={email} onChange={(e) => setEmail(e.target.value)} />
                    <small className='text-danger'>{formError.email}</small>
                </div>
                <div className='form-group border-top py-2'>
                <button type='submit' className='btn btn-outline-info'>Request Reset</button>
            </div>
            </form>
        </div>
    )
}

export default PasswordResetRequest