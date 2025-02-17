import { useState } from "react"
import React from 'react'
import { useNavigate } from "react-router-dom"
import { sendRegisterInfo } from "../service/authService"

export const RegisterComponent = () => {

  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleRegister = async() => {
    let registerForm = {
        username: username,
        email: email,
        password: password
    }

    let response;
    await sendRegisterInfo(registerForm).then(res => {console.log(res.data); response = res.data}).catch(e => console.log(e))

    if(response === 'success'){
        navigate("/")
    }
    else{
        alert(response)
    }
  }
    
  return (
    <div className='items-center text-center justify-items-center'>
      <div className='bg-white container w-2/4 items-center border-[2px] border-black rounded-lg mx-auto p-12 my-auto mt-52'>
        <div className='p-4'>
          <div className='p-3'>
            <label htmlFor="username">Username: </label>
            <input id='username' className='border-[2px] p-2 border-black rounded-lg' type="text" value={username} onChange={(e) => {setUsername(e.target.value)}}/>
          </div>

          <div className='p-3 ml-5'>
            <label htmlFor="email">E-Mail: </label>
            <input id='email' className='border-[2px] p-2 border-black rounded-lg' type="text" value={email} onChange={(e) => {setEmail(e.target.value)}}/>
          </div>

          <div className='p-3'>
            <label htmlFor="password">Password: </label>
            <input id='password' className='border-[2px] p-2 border-black rounded-lg' type="text" value={password} onChange={(e) => {setPassword(e.target.value)}}/>
          </div>

          <button onClick={() => {handleRegister()}} className='text-lg font-semibold bg-[#fcff55] text-[#e40000d0] transition hover:bg-[#fdff98] border-[2px] border-black rounded-md px-2'>Register</button>
        </div>
      </div>
    </div>
  )
}
