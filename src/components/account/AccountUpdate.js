import React, { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import axios from 'axios'
import { apiDomain } from '../../config'
import { userContext } from '../../App'

const AccountUpdate = ({ displayMessage }) => {

    const user = useContext(userContext)
    const navigate = useNavigate()
    const token = localStorage.getItem('rdrf-token')

    const [email, setEmail] = useState()
    const [username, setUsername] = useState()
    const [name, setName] = useState()
    const [hide_email, setHideEmail] = useState()
    const [image, setImage] = useState()
    const [imageChanged, setImageChanged] = useState(false)
    const [formError, setFormError] = useState({
        nonField: '',
        email: '',
        username: '',
        name: '',
        image: ''
    })

    useEffect(() => {
        // console.log(user)
        if (user !== {}) {
            setEmail(user.email)
            setUsername(user.username)
            setName(user.name)
            setHideEmail(user.hide_email)
        }
    }, [user])

    const toggleHideEmail = (e) => {
        setHideEmail(!hide_email)
    }

    const imageChangeHandler = (e) => {
        setImageChanged(true)
        setImage(e.target.files[0])
        let image = document.getElementById("id_profile_img");
        image.src = URL.createObjectURL(e.target.files[0]);
    }
 
    const handleProfileUpdate = (e) =>{
        e.preventDefault()

        const formData = new FormData()
        formData.append('email', email)
        formData.append('username', username)
        formData.append('name', name)
        formData.append('hide_email', hide_email)
        if (imageChanged) {
            formData.append('display_pic', image)
        }
        
        axios({
            method: 'put',
            url: `${apiDomain}/api/account/`,
            data: formData,
            headers: {
                'Authorization': `Token ${token}`
            }
        })
        .then((response) => {
            // console.log(response)
            localStorage.setItem('rdrf-need-refresh', true)
            displayMessage('Profile updated successfully...', 'success')
            navigate('/account')
        })
        .catch((error) => {
            // console.log(error)
            // console.log(error.response.data)
            const nonFieldError = error.response.data.non_field_errors ? error.response.data.non_field_errors : ''
            const emailError = error.response.data.email ? error.response.data.email : ''
            const usernameError = error.response.data.username ? error.response.data.username : '' 
            const nameError = error.response.data.name ? error.response.data.name : '' 
            const imageError = error.response.data.display_pic ? error.response.data.display_pic : ''
            setFormError({...formError, nonField: nonFieldError, email: emailError, username: usernameError, name: nameError, image: imageError})
        })
    }

    if (user !== {}) {
        return (
            <div className='content-section'>
                <form method='POST' encType='multipart/form-data' onSubmit={handleProfileUpdate}>
                    <legend className='border-bottom mb-2'>Account Update</legend>
                    <div><small className='text-danger'>{formError.nonField}</small></div>
                    <div className='d-flex flex-column align-items-center my-2'>
                        <img className='display-img rounded mb-2' id='id_profile_img' src={`${apiDomain}${user.display_pic}`} alt='display_pic' />
                        <input id='id_profile_image' type='file' accept='image/*' name='image' onChange={imageChangeHandler} />
                        <small className='text-danger'>{formError.image}</small>
                    </div>
                    <div className='form-element'>
                        <label htmlFor='id_email_input'>Email</label>
                        <input id='id_email_input' type='text' className='form-control' value={email} onChange={(e) => setEmail(e.target.value)} />
                        <small className='text-danger'>{formError.email}</small>
                    </div>
                    <div className='form-element'>
                        <label htmlFor='id_username_input'>Username</label>
                        <input id='id_username_input' type='text' className='form-control' value={username} onChange={(e) => setUsername(e.target.value)} />
                        <small className='text-danger'>{formError.username}</small>
                    </div>
                    <div className='form-element'>
                        <label htmlFor='id_name_input'>Full Name</label>
                        <input id='id_name_input' type='text' className='form-control' value={name} onChange={(e) => setName(e.target.value)} />
                        <small className='text-danger'>{formError.name}</small>
                    </div> 
                    <div className='form-element'>
                        {hide_email === true ? 
                            <input id='id_hide_email' name='hide_email' type='checkbox' onChange={toggleHideEmail} checked></input> : 
                            <input id='id_hide_email' name='hide_email' type='checkbox' onChange={toggleHideEmail}></input>
                        }
                        <label htmlFor='id_hide_email' className='mx-2'>Hide Email</label>
                    </div>
                    <div className='form-group border-top mt-2 pt-2'>
                        <button type='submit' className='btn btn-outline-info'>Update</button>
                    </div>
                </form>
            </div>
        )
    } else {
        return (
            <div className='content'>
                <p>No Data Available.</p>
            </div>
        )
    }
}

export default AccountUpdate