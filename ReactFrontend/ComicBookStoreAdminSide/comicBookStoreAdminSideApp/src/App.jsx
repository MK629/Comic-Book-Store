import { useState } from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import './App.css'
import { NavigationBar } from './components/NavigationBar'
import {OptionsPage} from './components/OptionsPage'
import { isLoggedIn } from './service/authService'
import { LoginPage } from './components/LoginPage'
import {OrderCompletionSuccessful} from './components/OrderCompletionSuccessful'
import {OrderCompletionFailed} from './components/OrderCompletionFailed'
import { OrderManagePage } from './components/OrderManagePage'
import { OrderViewPage } from './components/OrderViewPage'
import { AllComicsPage } from './components/AllComicsPage'
import { EditComicPage } from './components/EditComicPage'
import { EditComicSuccess } from './components/EditComicSuccess'
import { EditComicFailed } from './components/EditComicFailed'

function App() {

  return (
    <>
      <BrowserRouter>
        <div className='flex flex-col min-h-screen'>
          <div className='flex-grow bg-[#dfdfdf] border-e-[2px] border-r-[2px] border-black'>
            <NavigationBar/>
            <Routes>
                <Route path='/' element={isLoggedIn()? <OptionsPage/> : <LoginPage/>}></Route>
                <Route path='/orderManagePage' element={<OrderManagePage/>}></Route>
                <Route path="/orderViewPage/:status" element={<OrderViewPage/>}></Route>
                <Route path='/allComics' element={<AllComicsPage/>}></Route>
                <Route path='editComic/:id' element={<EditComicPage/>}></Route>
                <Route path='/completeOrder/success' element={<OrderCompletionSuccessful/>}></Route>
                <Route path='/completeOrder/failed' element={<OrderCompletionFailed/>}></Route>
                <Route path='/editSuccess' element={<EditComicSuccess/>}></Route>
                <Route path='/editFailed' element={<EditComicFailed/>}></Route>
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </>
  )
}

export default App
