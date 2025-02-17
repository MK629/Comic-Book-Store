import React from 'react'
import { logout } from '../service/authService'
import { Link } from 'react-router-dom'

export const NavigationBar = () => {

  const handleLogout = () => {
    logout()
    navigate("/")
    window.location.reload()
  }

  return (
    <div>
        <header className="fixed w-full bg-[#b14242] text-white z-10 top-0 border-t-[2px] border-b-[2px] border-black">  
            <div className="mx-auto flex justify-between items-center p-2.5">
                <div className="flex items-center space-x-4">
                    <h1 className="text-[#fcff55] text-2xl font-extrabold">Welcome, Admin!</h1>
                </div>

                <nav className="flex items-center space-x-4">
                    <Link to="/" className="font-semibold text-[#fcff55] hover:text-[#fcff64af]">Home</Link>
                    <Link to="/" onClick={() => {handleLogout()}} className="font-semibold text-[#fcff55] hover:text-[#fcff64af]">Logout</Link>
                </nav>
            </div>
        </header>
    </div>
  )
}
