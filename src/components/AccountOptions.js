import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const AccountOptions = () => {

  const location = useLocation()
  
  if (location.pathname === '/account')
    return (
      <div className='content-section'>
          <p className="m-0 pb-2 border-bottom">Account Options</p>
          <div className='d-flex flex-column'>
              <Link to={'/accountDeactivate'} className="btn btn-danger mt-2">Deactivate Account</Link>
              <Link to={'/accountDelete'} className="btn btn-danger mt-2">Delete Account</Link>
          </div>
      </div>
    )
  else return <></>
}

export default AccountOptions