import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { searchById } from '../service/comicService'
import { CartContext } from '../App'
import { BsArrowLeftCircle, BsCartPlus } from 'react-icons/bs'

export const ComicOrderComponent = () => {

  const {addToCart} = useContext(CartContext)
  const {key} = useParams() 
  const [comic, setComic] = useState({})
  const [selectingIssue, setSelectingIssue] = useState(false)
  const [issues, setIssues] = useState([]);
  const [selectedIssue, setSelectedIssue] = useState(1)
  const [quantity, setQuantity] = useState(1)
  const navigate = useNavigate()

  const imageUrl = '/images/comics/'

  useEffect(() => {
    searchById(key).then((res) => {setComic(res.data); for(let i = 1; issues.length < res.data.issues; i++){issues.push(i)}}).catch(e => console.log(e))
  },[])

  const selectIssue = (issueNumber) => {
    setSelectedIssue(issueNumber)
    setSelectingIssue(false)
  }
    
  return (
    <>
        <div className='items-center'>
            <h3 className="text-2xl font-bold mb-8 mt-4 ml-12 text-[#000000]">Details of "{comic.title}":</h3>

            <div className="max-w-5xl mx-auto mt-10 p-2 bg-gray-100 rounded-lg shadow-lg flex sm:flex-row border-[2px] border-black">
                <div className="sm:w-1/3 w-full mb-4 sm:mb-0">
                    <img src={imageUrl + comic.cover} alt="Cover" className="rounded-lg shadow-md border-[2px] border-black"/>
                </div>

                <div className="sm:w-2/3 w-full sm:pl-6 flex flex-col justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-black mb-4">{comic.title}</h1>
                        <p className="text-black font-semibold mb-6">{comic.description}</p>
                        <h3 className='mt-6 text-sm text-pretty text-[#c00000] font-extrabold'>- Latest Issue: #{comic.issues}</h3>
                        <h3 className='mt-2 text-sm text-pretty text-[#001858] font-extrabold'>- Publisher: {comic.publisher}</h3>
                    </div>

                    <div className="flex justify-between">
                        <div>
                            <label className="text-xl font-extrabold ml-2 mt-2">${comic.price}</label>

                            <div className="relative inline-block text-left ml-8">
                                <button onClick={() => setSelectingIssue(!selectingIssue)} className="inline-flex w-28 justify-between text-center rounded border border-black bg-white px-4 py-2 text-sm font-medium text-black shadow-sm focus:outline-none focus:ring-1 focus:ring-black">
                                    Issue #{selectedIssue}
                                </button>

                                {
                                    selectingIssue && 
                                    <div className="absolute z-10 mt-[3px] rounded bg-white shadow-lg ring-1 ring-gray-600 ring-opacity-5">
                                        <ul className="max-h-60 overflow-auto text-sm text-black w-28 border border-black rounded-sm">
                                            {
                                               issues.map((i) => {
                                                    return (
                                                        <li key={i} className="cursor-pointer px-4 py-2 hover:bg-gray-300 text-center" onClick={() => {selectIssue(i)}}>Issue #{i}</li>
                                                    )
                                               })
                                            }
                                        </ul>
                                    </div>
                                }
                            </div>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                            <label htmlFor="quantity" className="text-black font-medium ml-4">Quantity:</label>
                            <input id="quantity" type="number" value={quantity} min="1" onChange={(e) => {setQuantity(e.target.value)}} className="w-16 p-1 border border-black rounded-md text-center text-black"/>
                            <button className="ml-4 px-4 py-2 bg-[#fcff55] text-[#e40000d0] font-extrabold rounded-lg shadow hover:bg-[#fdff98] transition border-[2px] border-black flex items-center" onClick={() => {addToCart(comic, quantity, selectedIssue)}}>Add to cart<BsCartPlus size={20} className='ml-2'/></button>
                        </div>
                    </div>
                </div>
            </div>

            <button className='mt-5 mx-[23.5%] bg-[#fcff55] text-[#e40000d0] px-2 py-[6px] rounded-lg font-extrabold border-[2px] border-black flex transition hover:bg-[#fdff98]' onClick={() => {navigate(-1)}}><BsArrowLeftCircle size={25} className='mr-1'/>Back</button>
        </div>
    </>
  )
}
