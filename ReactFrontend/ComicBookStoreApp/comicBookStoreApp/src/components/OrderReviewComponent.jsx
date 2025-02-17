import React, { useContext, useEffect } from 'react'
import { OrderReviewContext } from '../App'
import { BsHouse, BsHouseAdd, BsHouseDoor, BsHouseFill } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import { RenderOrderStatus } from './utils/RenderOrderStatus'
import { CancelOrderButton } from './utils/CancelOrderButton'

export const OrderReviewComponent = () => {

  const {orderReviewItem} = useContext(OrderReviewContext)

  useEffect(() => {
    console.log(orderReviewItem)
  }, [])

  return (
    <div className='items-center text-center mb-4'>
      <h1 className='text-xl font-bold mt-5 text-[#000000]'>Order Review</h1>

      <div className='bg-white container mx-auto p-2 flex flex-col border-[2px] border-black rounded-xl mt-4'>
        <div className='flex text-center justify-between px-2'>
          <h1 className='text-sm text-left font-medium text-black'>ID: {orderReviewItem.id}</h1>
          <h1 className='text-sm font-medium text-black'>Username: {orderReviewItem.username}</h1>
          <h1  className='text-sm text-left font-medium text-black'>Ordered date: {orderReviewItem.orderDate}</h1>
          <RenderOrderStatus status={orderReviewItem.deliveryStatus}/>
        </div>

        {
          orderReviewItem.orderedComics.map((item, index) => {
            return(
              <div key={index} className="bg-white flex shadow rounded-lg border min-h-56 p-4 border-black mt-4">
                <div className='sm:w-1/3 mr-4'>
                  <img src={`/images/comics/${item.cover}`} alt="image" className='rounded-lg shadow-sm h-48'/>
                </div>

                <div className="sm:w-2/3 flex justify-between">
                  <div className='flex flex-col justify-evenly items-center ml-14'>
                    <div className="text-lg font-extrabold">Title: {item.title}</div>
                    <div className="text-[#001858] font-medium">Quantity: {item.quantity}</div>
                    <div className="text-[#c00000] font-medium">Issue #{item.issueNumber}</div>
                  </div>

                  <div className="text-gray-800 flex flex-col justify-evenly items-center">
                    <h4 className='font-semibold'>Price: ${item.price}</h4>
                  </div>
                </div>
              </div>
            )
          })
        }

        <div className='flex justify-between mt-4 items-center'>
          <div className='font-semibold text-[#001858] text-sm text-left'>
            <li >Earliest Delivery: {orderReviewItem.deliveryDate}</li>
            <li >Contact Number: {orderReviewItem.phoneNumber}</li>
            <li >Delivery address: {orderReviewItem.deliveryAddress}</li>
          </div>

          <h1 className='text-center items-center text-black font-extrabold mr-24'>Grand Total: ${orderReviewItem.totalPrice}</h1>

          <CancelOrderButton deliveryStatus={orderReviewItem.deliveryStatus} orderId={orderReviewItem.id} />
        </div>
      </div>

      <Link to="/" className='flex font-extrabold text-lg mx-auto w-24 bg-[#fcff55] text-[#e40000d0] hover:bg-[#fdff98] items-center mt-5 px-2 py-1 border-[2px] border-black rounded-lg'><BsHouseFill size={30} className='mr-1'/>Home</Link>
    </div>
  )
}
