import { createContext, useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { HomeComponent } from './components/HomeComponent'
import { HeaderComponent } from './components/HeaderComponent'
import { FooterComponent } from './components/FooterComponent'
import { SearchResultComponent } from './components/SearchResultComponent'
import { ComicOrderComponent } from './components/ComicOrderComponent'
import { CartView } from './components/CartView'
import { OrderReviewComponent } from './components/OrderReviewComponent'
import { OrderHistoryComponent } from './components/OrderHistoryComponent'
import { isLoggedIn } from './service/authService'
import { LoginComponent } from './components/LoginComponent'
import { CancellationSuccessful } from './components/CancellationSuccessful'
import { CancellationFailed } from './components/CancellationFailed'
import { RegisterComponent } from './components/RegisterComponent'
import { AllComicsComponent } from './components/AllComicsComponent'

export const SearchContext = createContext({searchKey:'', addSearchKey: (key) => {}})
export const CartContext = createContext({cartItems:[], addToCart: (item, quantity, issueNumber) => {}, deleteFromCart: (item) => {}, clearCart: () => {}})
export const OrderReviewContext = createContext({orderReviewItem: {}, makeOrderReviewItem: (orderReview) => {}})

function App() {

  const [searchKey, setSearchKey] = useState('')

  const addSearchKey = (key) => {
    setSearchKey(key)
  }

  const searchContextValue = {
    searchKey,
    addSearchKey
  }

  //////////////////////////////////////////////////
  
  const [cartItems, setCartItems] = useState([]) 

  const addToCart = (item, quantity, issueNumber) => {
    let comicOrder = {
      id: item.id,
      title: item.title,
      cover: item.cover,
      issueNumber: issueNumber,
      quantity: quantity,
      price: item.price * quantity
    }

    setCartItems([...cartItems, comicOrder])
  }

  const deleteFromCart = (index) => {
    setCartItems(cartItems.filter((obj, i) => i != index))
  }

  const clearCart = () => {
    setCartItems([])
  }
  

  const cartContextValue = {
    cartItems,
    addToCart,
    deleteFromCart,
    clearCart
  }

  //////////////////////////////////////////////////

  const [orderReviewItem, setOrderReviewItem] = useState({})

  const makeOrderReviewItem = (orderReview) => {
    setOrderReviewItem(orderReview)
  }

  const orderReviewContextValue = {
    orderReviewItem,
    makeOrderReviewItem
  }

  console.log(isLoggedIn())

  return (
    <>
      <BrowserRouter>
        <CartContext.Provider value={cartContextValue}>
        <OrderReviewContext.Provider value={orderReviewContextValue}>
        <SearchContext.Provider value={searchContextValue}>
          <div className='flex flex-col min-h-screen'>
            <div className='flex-grow bg-[#dfdfdf] border-e-[2px] border-r-[2px] border-black'>
              <HeaderComponent/>
                <Routes>
                  <Route path='/' element={isLoggedIn()? <HomeComponent/> : <LoginComponent/>}></Route>
                  <Route path="/allComics" element={<AllComicsComponent/>}></Route>
                  <Route path='/search/:key' element={<SearchResultComponent/>}></Route>
                  <Route path='/order/:key' element={<ComicOrderComponent/>}></Route>
                  <Route path='/cartView' element={<CartView/>}></Route>
                  <Route path='/orderReview' element={<OrderReviewComponent/>}></Route>
                  <Route path='orderHistory/:status' element={<OrderHistoryComponent/>}></Route>
                  <Route path='/cancelOrder/success' element={<CancellationSuccessful/>}></Route>
                  <Route path='/cancelOrder/failed' element={<CancellationFailed/>}></Route>
                  <Route path='/register' element={<RegisterComponent/>}></Route>
                </Routes>
            </div>

            <FooterComponent/>            
          </div>
        </SearchContext.Provider>
        </OrderReviewContext.Provider>
        </CartContext.Provider>
      </BrowserRouter>
    </>
  )
}

export default App
