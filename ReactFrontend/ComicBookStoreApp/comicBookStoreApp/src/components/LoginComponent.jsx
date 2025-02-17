import React, { useEffect, useState } from 'react'
import { getLoggedInUser, getToken, getUsername, logout, sendLoginInfo, setLoggedInUser, storeToken } from '../service/authService'
import { Link, useNavigate } from 'react-router-dom'

export const LoginComponent = () => {

  const [usernameOrEmail, setUsernameOrEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleLogin = async () => {

    let loginForm = {
      usernameOrEmail: usernameOrEmail,
      password: password
    }

    let response
    await sendLoginInfo(loginForm).then(res => {response = res.data}).catch(e => console.log(e))

    if(response === 'success'){
      await getUsername(loginForm.usernameOrEmail).then(res => {setLoggedInUser(res.data)}).catch(e => console.log(e))
      let token = 'Basic ' + window.btoa(getLoggedInUser() + ":" +loginForm.password)
      storeToken(token)
      navigate(0)
    }
    else{
      alert("Incorrect credentials!!")
    }
  }

  useEffect(() => {
    logout()
  },[])

  return (
    <div className='items-center text-center justify-items-center'>
      <div className='bg-white container w-2/4 items-center border-[2px] border-black rounded-2xl mx-auto p-12 my-auto mt-52'>
        <div className='p-4'>
          <div className='p-3'>
            <label htmlFor="username">Username/E-Mail: </label>
            <input id='username' className='border-[2px] p-2 border-black rounded-lg' type="text" value={usernameOrEmail} onChange={(e) => {setUsernameOrEmail(e.target.value)}}/>
          </div>

          <div className='p-3 ml-[70px]'>
            <label htmlFor="password">Password: </label>
            <input id='password' className='border-[2px] p-2 border-black rounded-lg' type="text" value={password} onChange={(e) => {setPassword(e.target.value)}}/>
          </div>

          <button onClick={() => {handleLogin()}} className='text-lg font-semibold bg-[#fcff55] text-[#e40000d0] transition hover:bg-[#fdff98] border-[2px] mt-8 border-black rounded-md px-2'>Login</button>
        </div>
      </div>

      <h1 className='text-black'>Don't have an account? <Link className='text-red-800 font-semibold' to={"/register"}>Register</Link></h1>
    </div>
  )
}
