import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { userContext } from '../App'

import axios from 'axios'

import { apiDomain } from '../config'
import './Header.css'

const Header = () => { 
    const user = useContext(userContext)
    const token = localStorage.getItem('rdrf-token')

    const navigate = useNavigate()

    const [userQuery, setUserQuery] = useState('')

    const showMenu = (e) => {
        const navbarLinks = document.getElementsByClassName('navbar-links')[0]
        navbarLinks.classList.toggle('active')
    }
    
    const changeTheme = (e) => {

        const theme = localStorage.getItem('react-basic-theme')
        if (theme === null){
            document.body.setAttribute('data-theme', 'dark')
            localStorage.setItem('react-basic-theme', 'dark')
        } else {
            if (theme === 'light') {
                document.body.setAttribute('data-theme', 'dark')
                localStorage.setItem('react-basic-theme', 'dark')
            } else {
                document.body.removeAttribute('data-theme')
                localStorage.setItem('react-basic-theme', 'light')
            }
        }
        
    }

    const executeQuery = (e) => {
        e.preventDefault()

        axios({
            method: 'post',
            url: `${apiDomain}/api/account_search/`,
            data: {
                userQuery: userQuery,
            },
            headers: {
                'Authorization': `Token ${token}`
            }
        })
        .then((response) => {
            // console.log(response)
            if (response.status === 200) {
                navigate('/accountSearch', { state: response.data })
            }
        })
        .catch((error) => {
            // console.log(error)
            // console.log(error.response.data)
        })
    }

    const handleLogout = () => {
        <userContext.Provider value={null} />
        localStorage.removeItem('rdrf-token')
        window.location.reload()
    }


    if (user.email) {
        return (
            <nav className='navbar shadow-sm'>
                <div className='brand-title'><Link to='/'>LOGO</Link></div>
                <div className='toggle-button' onClick={showMenu}>
                    <span className='bar'></span>
                    <span className='bar'></span>
                    <span className='bar'></span>
                </div>
                <div className='navbar-links'>
                    <ul>
                        <li><a onClick={changeTheme}>changeTheme</a></li>
                        <form className='mx-2' onSubmit={executeQuery}>
                            <input className='nav-input' type='text' placeholder='Search' onChange={(e) => setUserQuery(e.target.value)} />
                        </form>
                        <li><Link to='/account'>Profile</Link></li>
                        <li><a onClick={handleLogout}>Logout</a></li>
                    </ul>
                </div>
            </nav>
        )
    } else {
        return (
            <nav className='navbar shadow-sm'>
                <div className='brand-title'><Link to='/'>LOGO</Link></div>
                <div className='toggle-button' onClick={showMenu}>
                    <span className='bar'></span>
                    <span className='bar'></span>
                    <span className='bar'></span>
                </div>
                <div className='navbar-links'>
                    <ul>
                        <li><a onClick={changeTheme}>changeTheme</a></li>
                        <form className='mx-2' onSubmit={executeQuery}>
                            <input className='nav-input' type='text' placeholder='Search' onChange={(e) => setUserQuery(e.target.value)} />
                        </form>
                        <li><Link to='/login'>Login</Link></li>
                        <li><Link to='register'>Register</Link></li>  
                    </ul>
                </div>
            </nav>
        )
    }
}

export default Header