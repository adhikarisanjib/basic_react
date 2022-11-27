import React from 'react'
import { useLocation  } from 'react-router-dom'

import { apiDomain } from '../../config'
import './account.css'

const AccountView = () => {
    const {state} = useLocation()

    return (
        <div className='content-section'>
            <div className='profile-container'>
                <div className='d-flex flex-column'>
                    <img className='display-img rounded' id='id_display_img' src={`${apiDomain}${state.display_pic}`} alt='display_pic' />
                    {/* <img className='display-img rounded' id='id_display_img' src={state.display_pic} alt='display_pic' /> */}
                </div>
                <div className='details'>
                    <div className='d-flex flex-column'>
                        <h3 className='account-heading'>{state.username}</h3>
                        {state.hide_email ? <p className='text-secondary'>********************</p> : <p className='text-secondary'>{state.email}</p>}
                    </div>
                    <div className='d-flex flex-column mt-4'>
                        <div className='d-flex flex-row justify-content-between'>
                            <small>Email</small>
                            {state.hide_email ? <small className='text-secondary'>***************</small> : <small className='text-secondary'>{state.email}</small>}
                        </div>
                        <div className='d-flex flex-row justify-content-between'>
                            <small>Username</small>
                            <small className='text-secondary'>{state.username}</small>
                        </div>
                        <div className='d-flex flex-row justify-content-between'>
                            <small>Name</small>
                            <small className='text-secondary'>{state.name}</small>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AccountView