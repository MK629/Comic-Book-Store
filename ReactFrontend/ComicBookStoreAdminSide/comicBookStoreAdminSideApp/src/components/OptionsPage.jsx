import React from 'react'
import { useNavigate } from 'react-router-dom'

export const OptionsPage = () => {

  const navigate = useNavigate()

  return (
    <div>
      <div className='flex-col items-center text-center mx-auto my-auto mt-40 mb-8'>
          <div className='flex justify-center gap-8 mb-16'>
            <button className='bg-white shadow-md rounded-lg overflow-hidden transform transition hover:scale-105 w-1/4 h-[20rem] border-[2px] border-black mt-4 mb-4' onClick={() => {navigate("/allComics")}}>Manage Comics</button>
            <button className='bg-white shadow-md rounded-lg overflow-hidden transform transition hover:scale-105 w-1/4 h-[20rem] border-[2px] border-black mt-4 mb-4' onClick={() => {navigate("/orderManagePage")}}>Manage Orders</button>
          </div>

          <div className='flex justify-center mt-16 gap-6 mb-8'>
          <button className='bg-white shadow-md rounded-lg overflow-hidden transform transition hover:scale-105 w-1/5 h-[20rem] border-[2px] border-black mt-4 mb-4' onClick={() => {navigate("/orderViewPage/All")}}>All Orders</button>
          <button className='bg-white shadow-md rounded-lg overflow-hidden transform transition hover:scale-105 w-1/5 h-[20rem] border-[2px] border-black mt-4 mb-4' onClick={() => {navigate("/orderViewPage/Ongoing")}}>Ongoing Orders</button>
          <button className='bg-white shadow-md rounded-lg overflow-hidden transform transition hover:scale-105 w-1/5 h-[20rem] border-[2px] border-black mt-4 mb-4' onClick={() => {navigate("/orderViewPage/Completed")}}>Completed Orders</button>
          <button className='bg-white shadow-md rounded-lg overflow-hidden transform transition hover:scale-105 w-1/5 h-[20rem] border-[2px] border-black mt-4 mb-4' onClick={() => {navigate("/orderViewPage/Cancelled")}}>Cancelled Orders</button>
          </div>
      </div>
    </div>
  )
}
