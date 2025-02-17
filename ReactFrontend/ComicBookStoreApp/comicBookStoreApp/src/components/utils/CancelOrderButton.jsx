import React from 'react'
import { useNavigate } from 'react-router-dom'
import { cancelOrder } from '../../service/comicService'

export const CancelOrderButton = ({deliveryStatus, orderId}) => {

    const navigate = useNavigate()
  
    const handleCancelOrder = async (orderId) => {
      let response
      await cancelOrder(orderId).then((res) => {console.log(res.data); response = res.data})
  
      console.log(response)
   
      switch(response){
         case 'success': navigate("/cancelOrder/success"); break
         case 'failed': navigate("/cancelOrder/failed"); break
      }
   }

  return (
    <button className={deliveryStatus==='Ongoing'? 'bg-[#fcff55] text-[#e40000d0] hover:bg-[#fdff98] rounded-lg border-[2px] border-black font-extrabold h-12 p-2' : 'bg-gray-500 rounded-lg border-[2px] border-black font-extrabold h-12 p-2'} onClick={() => {deliveryStatus==='Ongoing'? handleCancelOrder(orderId): alert("Order is already " + deliveryStatus + ".")}}>Cancel order</button>
  )
}
