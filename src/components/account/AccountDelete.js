import React from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

import { userContext } from '../../App'
import { apiDomain } from '../../config'

const AccountDelete = ({ displayMessage }) => {
  
  const navigate = useNavigate()
  const token = localStorage.getItem('rdrf-token')

  const handleSubmit = (e) => {
      e.preventDefault()

      axios({
        method: 'post',
        url: `${apiDomain}/api/account_delete/`,
        headers: {
          'Authorization': `Token ${token}`
        }
      })
      .then((response) => {
        // console.log(response.data)
        if (response.status === 200) {
          displayMessage('Account Deleted', 'success')
          handleLogout()
        }
      })
      .catch((error) => {
        // console.log(error)
        // console.log(error.response.data)
        displayMessage('Something went wrong.', 'danger')
      })

      const handleLogout = () => {
        <userContext.Provider value = {null} />
        localStorage.removeItem('rdrf-token')
        navigate('/')
        window.location.reload()
      }
  }

  return (
    <div className='content-section'>
    <p className='border-bottom pb-4'>Are you sure, You want to delete your account?<br/>You cannot recover your account once it has been deleted.</p>
    <form method='POST' onSubmit={handleSubmit}>
        <button type='submit' className='btn btn-danger'>Delete</button>
    </form>
</div>
  )
}

export default AccountDelete