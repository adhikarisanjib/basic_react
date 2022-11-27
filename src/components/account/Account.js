import React, { useState, useEffect, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import axios from 'axios'

import { userContext } from '../../App'
import { apiDomain } from '../../config'
import './account.css'

const Account = () => {
    const navigate = useNavigate()
    const [profile, setProfile] = useState({})
    const token = localStorage.getItem('rdrf-token')
    const needRefresh = localStorage.getItem('rdrf-need-refresh')
    const user = useContext(userContext)
    
    useEffect(async () => {
        if (!token) {
            navigate('/')
        } else if (needRefresh){
            axios({
                method: 'get',
                url: `${apiDomain}/api/account/`,
                headers: {
                    'Authorization': `Token ${token}`
                }
            })
            .then((response) => {
                // console.log(response)
                setProfile(response.data)
            })
            .catch((error) => {
                // console.log(error)
                // console.log(error.response.data)
            })
        } else {
            setProfile(user)
        }
    }, [navigate, needRefresh, token, user])

    return (
        <div className='content-section'>
            <div className='profile-container'>
                <div className='d-flex flex-column'>
                    <img className='display-img rounded' id='id_display_img' src={`${apiDomain}${profile.display_pic}`} alt='display_pic' />
                    {/* <img className='display-img rounded' id='id_display_img' src={profile.display_pic} alt='display_pic' /> */}
                </div>
                <div className='details'>
                    <div className='d-flex flex-column'>
                        <h3 className='account-heading'>{profile.username}</h3>
                        {profile.hide_email ? <p className='text-secondary'>********************</p> : <p className='text-secondary'>{profile.email}</p>}
                    </div>
                    <div className='d-flex flex-column mt-4'>
                        <div className='d-flex flex-row justify-content-between'>
                            <small>Email</small>
                            {profile.hide_email ? <small className='text-secondary'>***************</small> : <small className='text-secondary'>{profile.email}</small>}
                        </div>
                        <div className='d-flex flex-row justify-content-between'>
                            <small>username</small>
                            <small className='text-secondary'>{profile.username}</small>
                        </div>
                        <div className='d-flex flex-row justify-content-between'>
                            <small>Name</small>
                            <small className='text-secondary'>{profile.name}</small>
                        </div>
                    </div>
                </div>
            </div>
            <div className='form-group border-top mt-4'>
                <Link to='/accountUpdate'><button className='btn btn-outline-info mt-4 ml-2'>Update Profile</button></Link>
                <Link to='/changePassword'><button className='btn btn-outline-danger mt-4 mx-2'>Change Password</button></Link>
            </div>
        </div>
    )
}

export default Account