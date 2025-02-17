import React from 'react'

export const RenderOrderStatus = ({status}) => {
    switch(status){
        case 'Ongoing': return (<><li className='text-sm text-green-500 font-semibold'>Status: {status}</li></>);break
        case 'Completed': return (<><li className='text-sm text-blue-500 font-semibold'>Status: {status}</li></>);break
        case 'Cancelled': return (<><li className='text-sm text-orange-500 font-semibold'>Status: {status}</li></>);break
    }
}
