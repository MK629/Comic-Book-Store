import React from 'react'
import {useNavigate} from 'react-router-dom'
import { BsXCircle } from 'react-icons/bs'

export const OrderCompletionFailed = () => {

  const navigate = useNavigate()

  return (
    <div className='text-center items-center'>
        <div className='container mx-auto my-auto flex items-center justify-center bg-white mt-[18%] w-2/6 rounded-2xl p-2 text-red-500 border-[2px] border-black'>
         <h1 className='mx-auto font-extrabold text-2xl flex'><BsXCircle size={30} className='mr-2'/>Completion failed. Something went wrong. Please contact the developer.</h1>
        </div>
        
        <button className='mt-5 bg-[#fcff55] px-2 py-1 text-lg rounded-xl font-semibold text-[#d40b0bd0] border-[2px] border-black hover:bg-[#fdff98] transition transform' onClick={() => navigate("/")}>Home</button>
    </div>
  )
}
