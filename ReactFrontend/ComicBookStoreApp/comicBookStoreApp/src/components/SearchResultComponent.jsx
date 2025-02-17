import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { search } from '../service/comicService'
import {BsArrowLeftCircle} from 'react-icons/bs'
import {BiCartDownload} from 'react-icons/bi'

export const SearchResultComponent = () => {

  const {key} = useParams()
  const [searchItems, setSearchItems] = useState([])
  const navigate = useNavigate()

  const imageUrl = '/images/comics/'

  const showDetails = (key) => {
    navigate("/order/" + key)
  }

  useEffect(() => {
    search(key).then((result) => {setSearchItems(result.data)}).catch(e => console.log(e))
  },[key])

  return (
    <div className='mb-4'>
        <h3 className="text-2xl font-bold mb-4 mt-4 ml-12 text-[#000000]">Search results for "{key}":</h3>

        <div className='text-center'>
          <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-4 p-14'>
                  {
                      searchItems && searchItems.map((item) => {

                          return(
                                  <div key={item.id} className="bg-white shadow-md rounded-lg overflow-hidden transform transition hover:scale-105 w-[20rem] h-[41rem] border-[2px] border-black mt-4 mb-4 flex flex-col justify-between">
                                      <img src={imageUrl + item.cover} className="w-[20rem] h-[30rem] scale-[100%] object-cover"/>

                                      <h2 className="text-lg text-black font-semibold mt-1">{item.title}</h2>
                                      <p className="text-black text-sm mt-1 mb-4">{item.author}</p>

                                      <div style={{ marginRight: '5px', color: '#001858', fontWeight: 'bold' }} className='text-sm'>{item.genres.join(", ")}</div>    
                                          

                                      <div className="flex justify-between items-center p-1 mt-2">
                                        <span className="font-extrabold ml-2">${item.price}</span>
                                        <span className='text-sm font-bold'>#{item.issues} issues available!</span>
                                        <BiCartDownload size={35} className='hover:scale-125 ml-2 transfrom transition' onClick={() => showDetails(item.id)}/>
                                      </div>
                                  </div>
                              )
                          }   
                      )
                  }

                  {searchItems.length === 0 && (
                          <p>No comics found for "{key}". Try a different search term.</p>
                  )}

          </div>

          <button className='bg-[#fcff55] text-[#e40000d0] hover:bg-[#fdff98] px-2 py-1 items-center rounded-lg font-bold border-[2px] border-black flex ml-14' onClick={() => {navigate(-1)}}><BsArrowLeftCircle size={25} className='mr-1'/>Back</button>
        </div>
    </div>
  )
}
