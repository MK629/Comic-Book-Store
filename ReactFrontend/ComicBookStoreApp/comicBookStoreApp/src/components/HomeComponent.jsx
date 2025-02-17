import React, { useEffect, useState } from 'react'
import { getHotComics} from '../service/comicService'
import { BiCartDownload} from 'react-icons/bi'
import { useNavigate } from 'react-router-dom'
import { BsBinoculars, BsBookshelf, BsBox, BsBox2, BsCardImage, BsCardList, BsFire, BsListColumns, BsListNested, BsViewList } from 'react-icons/bs'
import { logout } from '../service/authService'

export const HomeComponent = () => {

  const [hotItems, setHotItems] = useState([])
  const navigate = useNavigate()

  const imageUrl = '/images/comics/'

  const showDetails = (key) => {
    navigate("/order/" + key)
  }

  useEffect(() => {
    getHotComics().then((result) => {setHotItems(result.data)}).catch(e => console.log(e))
  }, [])

  return (
        <div>
            <div className="flex-grow text-[#000000]">
                <div className="container mx-auto p-6 text-center items-center mb-6">
                    
                    <div className='bg-white w-[65%] h-[17rem] p-6 border-[2px] rounded-2xl border-black mx-auto mb-6'>
                        <h2 className="text-4xl font-bold mb-4">Welcome to Comic Cottage!!</h2>

                        <p className="text font-medium mt-8">
                            Step into a cozy corner of the web where imagination comes to life! Whether you're a die-hard superhero fan, a manga enthusiast, or just dipping your toes into the world of comics, Comic Cottage is your haven.
                        </p>

                        <p className='text font-medium mt-4'>
                            Explore, discover, and geek out with us—where every page turned feels like home. 🦸📖🌟
                        </p>
                    </div>


                    <div className='flex-col items-center text-center mx-auto justify-between mb-8'>
                        <div className='flex justify-center mb-16'>
                            <img className='w-[28rem] h-[35em] border-[8px] border-white outline outline-black mr-8' src='/images/promo/promo2.jpg'/>
                            <img className='w-[28rem] h-[35em] border-[8px] border-white outline outline-black ml-8' src='/images/promo/promo1.jpg'/>
                        </div>

                        <div className='flex justify-center mt-16 mb-8'>
                            <img className='w-[28rem] h-[35em] border-[8px] border-white outline outline-black mr-8' src='/images/promo/promo4.jpg'/>
                            <img className='w-[28rem] h-[35em] border-[8px] border-white outline outline-black ml-8' src='/images/promo/promo3.jpg'/>
                        </div>

                        <button className='bg-[#fcff55] text-[#e40000d0] hover:bg-[#fdff98] text-xl font-extrabold px-2 py-1 border-[2px] border-black rounded-lg mb-10 flex items-center mx-auto' onClick={() => navigate("/allComics")}><BsBookshelf className='mr-2'/>See All</button>
                    </div>
                    
                    <div className='text-pretty text-4xl font-bold text-orange-600 flex mt-8 p-2 justify-center items-center text-center mx-auto bg-white w-[30%]  rounded-2xl border-[2px] border-black'><BsFire className='mr-2'/> Hot Right Now <BsFire className='ml-2'/></div>

                    <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 lg:gap-4 p-4 mt-8'>
                        {
                            hotItems && hotItems.map((item) => {

                                return(
                                    <div key={item.id} className="bg-white shadow-md rounded-lg overflow-hidden transform transition hover:scale-105 w-[20rem] h-[41rem] border-[2px] border-black mt-4 mb-4 flex flex-col justify-between">
                                        <img src={imageUrl + item.cover} className="w-[20em] h-[30rem] scale-[100%] object-cover"/>

                                        <h2 className="text-black text-lg font-semibold mt-1">{item.title}</h2>
                                        <p className="text-black text-sm mt-1 mb-4">{item.author}</p>

                                        <div style={{ marginRight: '5px', color: '#001858', fontWeight: 'bold' }} className='text-sm'>{item.genres.join(", ")}</div>    
                                        

                                        <div className="flex justify-between items-center p-1 mt-2 text-black ">
                                            <span className="font-extrabold ml-2">${item.price}</span>
                                            <span className='text-sm font-bold'>#{item.issues} issues available!</span>
                                            <BiCartDownload size={35} className='hover:scale-125 ml-2 transfrom transition' onClick={() => showDetails(item.id)}/>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>                    
  )
}
