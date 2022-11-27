import React from 'react'
import { useLocation, Link } from 'react-router-dom'

import { apiDomain } from '../../config'
import './accountSearch.css'

function AccountSearch() {
    const {state} = useLocation()
    // console.log(state)

    return(
        <div className='d-flex flex-wrap'>
            {'message' in state ?
            <div className='d-flex'>
                <p className='alert alert-info my-auto'>No users found...</p>
            </div> :
            <div className='d-flex'>
                {state.map((user, index) => (
                    <div className='d-flex flex-column align-items-center mx-2 user-card' key={user.email}>
                        <img className='rounded-circle' src={`${apiDomain}${user.display_pic}`} alt='display_pic' />
                        {/* <img className='rounded-circle' src={user.display_pic} alt='profile-pic' /> */}
                        <div className='d-flex flex-column align-items-center mt-4 mb-2'>
                            <span>{user.username}</span>
                            <span>{user.name}</span>
                        </div>
                        <Link to='/accountView' state={user} className='btn btn-primary'>View Profile</Link>
                    </div>
                ))}
            </div>
            }
        </div>

    )
  
}

export default AccountSearch