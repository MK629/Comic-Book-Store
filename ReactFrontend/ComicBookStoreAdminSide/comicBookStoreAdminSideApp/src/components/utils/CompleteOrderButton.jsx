import React from 'react'
import { useNavigate } from 'react-router-dom'
import { completeOrder } from '../../service/comicAdminService'

export const CompleteOrderButton = ({deliveryStatus, orderId}) => {

    const navigate = useNavigate()
  
    const handleCompleteOrder = async (orderId) => {
      let response
      await completeOrder(orderId).then((res) => {console.log(res.data); response = res.data})
  
      console.log(response)
   
      switch(response){
         case 'success': navigate("/completeOrder/success"); break
         case 'failed': navigate("/completeOrder/failed"); break
      }
   }

  return (
    <button className='bg-[#fcff55] text-[#e40000d0] hover:bg-[#fdff98] rounded-lg border-[2px] border-black font-extrabold h-12 p-2' onClick={() => {deliveryStatus==='Ongoing'? handleCompleteOrder(orderId): alert("Order is already " + deliveryStatus + ".")}}>Complete order</button>
  )
}
