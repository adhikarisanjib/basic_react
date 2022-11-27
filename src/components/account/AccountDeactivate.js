import React from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

import { userContext } from '../../App'
import { apiDomain } from '../../config'

const AccountDeactivate = ({ displayMessage }) => {

  const navigate = useNavigate()
  const token = localStorage.getItem('rdrf-token')

  const handleSubmit = (e) => {
      e.preventDefault()

      axios({
        method: 'post',
        url: `${apiDomain}/api/account_deactivate/`,
        headers: {
          'Authorization': `Token ${token}`
        }
      })
      .then((response) => {
        // console.log(response.data)
        if (response.status === 200) {
          displayMessage('Account Deactivated. Login to reactivate your account.', 'success')
          handleLogout()
        }
      })
      .catch((error) => {
        console.log(error)
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
    <div class='content-section'>
    <p class='border-bottom pb-4'>Are you sure, You want to deactivate your account?<br/> Your account gets reactivated once you login.</p>
    <form method='POST' onSubmit={handleSubmit}>
        <button type='submit' class='btn btn-danger'>Deactivate</button>
    </form>
</div>
  )
}

export default AccountDeactivate