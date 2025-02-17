import React, { useEffect, useState } from 'react'
import { getAllOrders, getCancelledOrders, getCompletedOrders, getOngoingOrders } from '../service/comicService'
import { RenderOrderStatus } from './utils/RenderOrderStatus'
import { CancelOrderButton } from './utils/CancelOrderButton'
import { EmptyOrderHistory } from './utils/EmptyOrderHistory'
import { useParams } from 'react-router-dom'

export const OrderHistoryComponent = () => {

  const [allOrders, setAllOrders] = useState([])
  const {status} = useParams()

  useEffect(() => {
    switch(status){
      case 'All': getAllOrders().then((res) => {setAllOrders(res.data); console.log(res.data)}).catch(e => console.log(e));break;
      case 'Ongoing': getOngoingOrders().then((res) => {setAllOrders(res.data); console.log(res.data)}).catch(e => console.log(e));break;
      case 'Completed': getCompletedOrders().then((res) => {setAllOrders(res.data); console.log(res.data)}).catch(e => console.log(e));break;
      case 'Cancelled': getCancelledOrders().then((res) => {setAllOrders(res.data); console.log(res.data)}).catch(e => console.log(e));break;
      default: setAllOrders([])
    }
  }, [status])

  return (
    <div className='mb-4'>
      {
        allOrders.length > 0 ? 
        <div className='text-center'>
          <h1 className='font-semibold text-pretty text-[#000000] text-lg mt-4'>{status} Orders</h1>
          {
            allOrders.map((order) => {
              return(
                <div key={order.id} className='bg-white container mx-auto p-2 flex flex-col border-[2px] border-black rounded-xl mt-12'>
                  <div className='flex text-center justify-between px-2'>
                    <h1 className='text-sm text-left font-medium text-black'>ID: {order.id}</h1>
                    <h1 className='text-sm font-medium text-black'>Username: {order.username}</h1>
                    <h1  className='text-sm text-left font-medium text-black'>Ordered date: {order.orderDate}</h1>
                    <RenderOrderStatus status={order.deliveryStatus}/>
                  </div>

                    {
                      order.orderedComics.map((item, index) => {
                        return(
                          <div key={index} className="bg-white flex shadow rounded-lg min-h-56 p-4 border border-black mt-4">
                            <div className='sm:w-1/3 mr-4'>
                              <img src={`/images/comics/${item.cover}`} alt="image" className='rounded-lg shadow-sm h-48'/>
                            </div>

                            <div className="sm:w-2/3 flex justify-between">
                              <div className='flex flex-col justify-evenly items-center ml-14'>
                                <div className="text-lg font-medium">Title: {item.title}</div>
                                <div className="text-gray-600">Quantity: {item.quantity}</div>
                                <div className="text-gray-600">Issue #{item.issueNumber}</div>
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
                    <div className='font-semibold text-sm text-[#001858] text-left'>
                      <li >Earliest Delivery: {order.deliveryDate}</li>
                      <li >Contact Number: {order.phoneNumber}</li>
                      <li >Delivery address: {order.deliveryAddress}</li>
                    </div>

                    <h1 className='text-center items-center text-black font-extrabold mr-24'>Grand Total: ${order.totalPrice}</h1>

                    <CancelOrderButton deliveryStatus={order.deliveryStatus} orderId={order.id}/>
                  </div>
                </div>
                    )
                })
            }
        </div> 
        
        : 
        
        <EmptyOrderHistory/>
      }
    </div>
  )
}
