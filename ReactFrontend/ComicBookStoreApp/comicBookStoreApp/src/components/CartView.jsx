import React, { useContext, useEffect, useState } from 'react'
import { CartContext, OrderReviewContext } from '../App'
import { BsArrow90DegLeft, BsArrowCounterclockwise, BsArrowLeft, BsArrowLeftCircle, BsCart4, BsCrosshair, BsTrash, BsTrash2, BsTrash3, BsX, BsXCircle } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'
import { sendOrder } from '../service/comicService'
import { getLoggedInUser } from '../service/authService'

export const CartView = () => {
  
  const {cartItems, deleteFromCart, clearCart} = useContext(CartContext)
  const [totalPrice, setTotalPrice] = useState(0)
  const [deliveryAddress, setDeliveryAddress] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const {makeOrderReviewItem} = useContext(OrderReviewContext)
  const navigate = useNavigate()


  const checkOut = async () => {
    let orderSender = {
      username: getLoggedInUser(),
      orderedComics: cartItems,
      totalPrice: totalPrice + 4.00,
      deliveryAddress: deliveryAddress,
      phoneNumber: phoneNumber
    }
    let response
    await sendOrder(orderSender).then((resp) => {response = resp.data}).catch(e => console.log(e))

    if(response){
      makeOrderReviewItem(response)
      clearCart();
      navigate("/orderReview");
    }
    else{
      alert("Please enter both address and contact number.")
    }
  }


  useEffect(() => {
    let total = 0
    console.log(cartItems)
    cartItems.map((i) => {total += i.price})
    setTotalPrice(total)
  }, [cartItems])

  return (
    <>
      <div className="p-6 items-center">
        {
          cartItems.length > 0 ? 
          <div className='items-center'>
            <h1 className="text-2xl text-[#000000] font-bold p-8 text-center">
              Your Cart
            </h1>

            <div className='flex mb-4'>
              <div className='w-2/4 p-4'>
                {
                  cartItems.map((item, index) => {
                    return(
                      <div key={index} className="bg-white flex shadow rounded-lg min-h-56 p-4 border-[2px] border-black mt-4 hover:scale-[102%] transform transition">
                        <div className='sm:w-1/3 mr-4'>
                          <img src={`/images/comics/${item.cover}`} alt="image" className='rounded-lg shadow-sm h-48'/>
                        </div>

                        <div className="sm:w-2/3 flex justify-between">
                          <div className='flex flex-col justify-evenly items-center'>
                            <div className="text-lg text-black font-extrabold">Title: {item.title}</div>
                            <div className="text-[#001858] font-medium">Quantity: {item.quantity}</div>
                            <div className="text-[#c00000] font-medium">Issue #{item.issueNumber}</div>
                          </div>

                          <div className="flex flex-col justify-evenly items-center">
                            <h4 className='text-black font-bold'>${item.price}</h4>
                            <BsTrash size={30} className='text-black hover:scale-105' onClick={() => {deleteFromCart(index)}}/>
                          </div>
                        </div>
                      </div>
                    )
                  })
                }
              </div>

              <div className='w-2/4 p-4'>
                <div className="bg-white shadow rounded-lg p-4 border-[2px] border-black mt-4">
                  <li className='mb-3 ml-3 text-lg font-extrabold text-[#001858]'>Please provide an address and a phone number to check out.</li>
                  <div className='p-3'>
                    <label htmlFor='address' className='p-3 text-black font-semibold ml-5 mt-3'>Enter Address:</label>
                    <input id='address' type='text' value={deliveryAddress} onChange={(e) => {setDeliveryAddress(e.target.value)}} className='p-2 w-3/4 border-[2px] text-black font-medium rounded-md border-black shadow-sm'></input>
                  </div>

                  <div className='p-3'>
                    <label htmlFor='phNo' className='p-3 text-black font-semibold ml-5 mt-3'>Enter Phone Number:</label>
                    <input id="phNo" type='text' value={phoneNumber} onChange={(e) => {setPhoneNumber(e.target.value)}} className='p-2 w-2/4 border-[2px] text-black font-medium rounded-md border-black shadow-sm'></input>
                  </div>

                  <div className='text-sm font-extrabold text-[#c00000] mt-5'>
                    <li className='ml-3'>All items are processed on order.</li>
                    <li className='ml-3'>Delivery will arrive in 3 days.</li>
                    <li className='ml-3'>Payment can be done through either card or cash. Please transfer the funds to our rider on arrival.</li>
                    <li className='ml-3'>Upon completing the transaction, a receipt will be sent to your E-Mail.</li>
                    <li className='ml-3'>Delivery charge is $4.00.</li>
                    <li className='ml-3'>If you wish to cancel the order, it must be done within the day of order.</li>
                  </div>

                  <div className='flex justify-between'>
                    <div className='border border-gray-600 p-3 rounded-lg mt-5 border-dashed ml-3'>
                      <h4 className='text-black font-extrabold'>Estimated Total: ${totalPrice + 4}</h4>
                    </div>
                    <button className="mt-5 ml-3 p-2 font-extrabold text-[#e40000d0] bg-[#fcff55] rounded-lg shadow hover:bg-[#fdff98] transition border-[2px] border-black" onClick={checkOut}>Check Out</button>
                  </div>
                </div>

                <div className='flex justify-between p-2'>
                  <button className='bg-[#fcff55] text-[#e40000d0] px-2 py-[6px] rounded-lg font-extrabold border-[2px] border-black items-center transition hover:bg-[#fdff98] flex' onClick={() => {navigate(-1)}}><BsArrowLeftCircle size={25} className='mr-1'/>Back</button>
                  <button className='bg-[#e40000d0] p-2 rounded-lg text-white border-[2px] font-extrabold border-black flex' onClick={() => {clearCart()}}><BsTrash3 size={25} className='mr-1'/>Clear cart</button>
                </div>
              </div>
            </div>
          </div>
          
          : 

          <div className='text-center items-center'>
              <div className='container mx-auto my-auto flex items-center justify-center bg-white mt-[18%] w-2/6 rounded-2xl p-2 text-red-500 border-[2px] border-black'>
              <h1 className='mx-auto font-extrabold text-2xl flex'><BsCart4 size={30} className='mr-2'/>Your cart is empty...</h1>
              </div>
              
              <button className='mt-5 bg-[#fcff55] px-2 py-1 text-lg rounded-xl font-semibold text-[#d40b0bd0] border-[2px] border-black hover:bg-[#fdff98] transition transform' onClick={() => navigate("/")}>Continue shopping</button>
          </div>
        }
      </div>
    </>
  )
}
