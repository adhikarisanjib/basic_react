import React, { useState, useEffect} from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import axios from 'axios';

import { apiDomain } from './config';

import Home from './components/Home';
import Header from './components/Header';
import NoMatch from './components/NoMatch';

import Login from './components/account/Login';
import Register from './components/account/Register';
import Account from './components/account/Account';
import AccountView from './components/account/AccountView';
import AccountUpdate from './components/account/AccountUpdate';
import AccountDeactivate from './components/account/AccountDeactivate';
import AccountDelete from './components/account/AccountDelete';
import AccountSearch from './components/account/AccountSearch';
import AccountOptions from './components/AccountOptions';
import AccountActivationRedirect from './components/account/AccountActivationRedirect';
import ChangePassword from './components/account/ChangePassword';
import PasswordResetRequest from './components/account/PasswordResetRequest';
import PasswordReset from './components/account/PasswordReset';

export const userContext = React.createContext(null)

function App() {

  const token = localStorage.getItem('rdrf-token')
  localStorage.setItem('rdrf-need-refresh', false)
  const [user, setUser] = useState({})
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState('info')

  const displayMessage = (message, messageType) => {
    setMessage(message)
    setMessageType(messageType)
    setTimeout(hideMessage, 7*1000)
  }

  const hideMessage = () => {
    setMessage('')
    setMessageType('info')
  }

  const setTheme = () => {
    const theme = localStorage.getItem('react-basic-theme')
    if (theme === null) return
    if (theme === 'light') return
    if (theme === 'dark') {
      document.body.setAttribute('data-theme', 'dark')
    }
  }

  const handleLogout = () => {
    <userContext.Provider value = {null} />
    localStorage.removeItem('rdrf-token')
    window.location.reload()
  }

  useEffect(() => {
    if(token !== null) {
      axios({
        method: 'get',
        url: `${apiDomain}/api/account/`,
        headers: {
          'Authorization': `Token ${token}`
        }
      })
      .then((response) => {
        // console.log(response)
        setUser(response.data)
      })
      .catch((error) => {
        // console.log(error)
        // console.log(error.response.data)
        displayMessage('Something went wrong. Cannot connect to server...', 'danger')
        handleLogout()
      })
    }
    setTheme()
  }, [token])

  return (
    <BrowserRouter>
      <userContext.Provider value={user}>
      <div className='app'>
        <Header />
        <div className='d-flex flex-column py-2 px-4 mx-auto'>
          {message === '' 
          ? '' 
          : <div className={`alert alert-${messageType} py-1 px-5 my-0 mx-auto d-flex justify-content-between`} role='alert'>
              <span className='py-2'>{message}</span>
              <button className='btn' onClick={hideMessage}>
                <span aria-hidden="true">&times;</span>
              </button>
            </div>}
        </div>
        <div className='main'>
          <Routes>
            <Route path='/' element={<Home />}></Route>

            <Route path='/login' element={<Login />}></Route>
            <Route path='/register' element={<Register displayMessage={displayMessage} />}></Route>
            <Route path='/accountActivationRedirect' element={<AccountActivationRedirect />}></Route>

            <Route path='/account' element={<Account />}></Route>
            <Route path='/accountView' element={<AccountView />}></Route> 
            <Route path='/accountUpdate' element={<AccountUpdate displayMessage={displayMessage} />}></Route>
            <Route path='/accountDeactivate' element={<AccountDeactivate displayMessage={displayMessage} />}></Route>
            <Route path='/accountDelete' element={<AccountDelete displayMessage={displayMessage} />}></Route>
            <Route path='/accountSearch' element={<AccountSearch />}></Route>
            <Route path='/changePassword' element={<ChangePassword displayMessage={displayMessage} />}></Route>
            <Route path='/resetPasswordRequest' element={<PasswordResetRequest displayMessage={displayMessage} />}></Route>
            <Route path='/resetPassword/:id' element={<PasswordReset displayMessage={displayMessage} />}></Route>

            <Route path='*' element={<NoMatch />}></Route>
          </Routes>

          <div className="sidebar">
            <div className="content-section mb-4">
                <p className="m-0 pb-2 border-bottom">Themes</p>
                <div className="mt-2 p-0">
                    <button className="mx-1 theme-picker theme-picker-light" onClick={() => {
                      document.body.removeAttribute('data-theme')
                      localStorage.setItem('react-basic-theme', 'light')
                    }}></button>
                    <button className="mx-1 theme-picker theme-picker-dark" onClick={() => {
                      document.body.setAttribute('data-theme', 'dark')
                      localStorage.setItem('react-basic-theme', 'dark')
                    }}></button>
                </div>
            </div>
            <AccountOptions />
          </div>
        </div>
      </div>
      </userContext.Provider>
    </BrowserRouter>
  );
}

export default App;
