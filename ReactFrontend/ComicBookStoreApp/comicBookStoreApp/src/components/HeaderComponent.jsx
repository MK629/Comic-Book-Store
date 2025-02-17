import {React, useContext, useEffect, useState} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { FaBars } from 'react-icons/fa'
import {AiOutlineCaretDown, AiOutlineCaretLeft, AiOutlineCaretUp, AiOutlineClose, AiOutlineFileSearch, AiOutlineSearch} from 'react-icons/ai'
import {BiFilterAlt, BiSearchAlt, BiSolidCart, BiSolidPackage} from 'react-icons/bi'
import {BsArrowRightShort, BsArrowsCollapseVertical, BsBinoculars, BsCheck2, BsCheck2Circle, BsClockHistory, BsEnvelopeArrowDownFill, BsFilter, BsGear, BsList, BsListCheck, BsListStars, BsMagic, BsPerson, BsPersonBadge, BsToggleOn, BsTruck, BsTruckFlatbed, BsViewList, BsViewStacked, BsX, BsXCircle} from 'react-icons/bs' 
import { CartContext, SearchContext } from '../App';
import { getOngoingOrders } from '../service/comicService';
import { getLoggedInUser, getUsername, isLoggedIn, logout } from '../service/authService';

export const HeaderComponent = () => {

    const {cartItems} = useContext(CartContext)
    const [menuToggle, setmenuToggle] = useState(false)
    const [filterToggle, setfilterToggle] = useState(false)
    const [orderHistoryToggle, setOrderHistoryToggle] = useState(false)
    const {searchKey, addSearchKey} = useContext(SearchContext)

    const navigate = useNavigate()

    const search = (key) => {
        if(!key){
            alert("Search key is empty!!")
            return
        }
        navigate("/search/"+key)
    }

    const goToCart = () => {
        navigate("/cartView")
    }

    const filterSearch = (key) => {
        setfilterToggle(false)
        search(key)
    }

    const handleLogout = () => {
        logout()
        navigate("/")
        window.location.reload()
    }


    return (
        <>
            <header className="bg-[#b14242] text-white sticky z-10 top-0 border-t-[2px] border-b-[2px] border-black">  
                <div className="mx-auto flex justify-between items-center p-2.5">
                    <div className="flex items-center space-x-4">
                        <FaBars className='cursor-pointer text-white hover:text-gray-400' size={30} onClick={() => {setmenuToggle(!menuToggle); console.log(menuToggle)}}/>
                        <img src="/images/Shop.svg" alt="Shop.svg" className='scale-[100%] w-[12.5%]'/>
                        <h1 className="text-[#fcff55] text-2xl font-extrabold">Comic Cottage</h1>
                    </div>

                    <div className="flex w-full justify-center">
                        <input id="input" type="text" placeholder="Search..." className="text-black w-2/4 p-3 pl-10 pr-4 border-[2px] border-black rounded-s-full focus:outline-none focus:ring-2 focus:ring-blue-500" value={searchKey} onChange={(e) => addSearchKey(e.target.value)}/>
                        <button className='bg-[#fcff55] text-[#d40b0bb0] font-bold px-3 hover:bg-[#fcf37c] transition border-t-[2px] border-b-[2px] border-black' onClick={() => {search(searchKey)}}><BiSearchAlt size={30}/></button>
                        <button className='bg-[#fcff55] text-[#d40b0bd0] px-4 rounded-r-full hover:bg-[#fcf37c] transition border-[2px] border-black' onClick={() => {setfilterToggle(!filterToggle)}}><BiFilterAlt size={30}/></button>
                    </div>

                    <nav className="flex items-center space-x-4">
                        <Link to="/" className="font-semibold text-[#fcff55] hover:text-[#fcff64af]">Home</Link>
                        <Link to="/" onClick={() => {handleLogout()}} className="font-semibold text-[#fcff55] hover:text-[#fcff64af]">Logout</Link>
                        <div>
                            <BiSolidCart size={45} className='hover:scale-110 font-semibold' onClick={() => {goToCart()}}/>
                            <span className="absolute -top-[-3em] -right-[-0.5em] bg-red-600 text-white text-xs font-bold rounded-full w-[15px] h-[15px] flex items-center justify-center">{cartItems.length}</span>
                        </div>
                    </nav>
                </div>
            </header>

            {/* make screen go black */}
            {menuToggle ? (
                <>
                    <div className='bg-black/60 fixed w-full h-screen z-10 top-0 left-0' onClick={() => setmenuToggle(!menuToggle)}></div>
                </>
            ): (<></>)}

            {filterToggle ? (
                <>
                    <div className='bg-black/60 fixed w-full h-screen z-10 top-0 left-0' onClick={() => setfilterToggle(!filterToggle)}></div>
                </>
            ): (<></>)}



            <div className={menuToggle ? 'fixed top-0 left-0 w-[300px] h-screen bg-gray-200 z-10 duration-300 border-e-2 border-black': 'fixed top-0 left-[-100%] w-[300px] h-screen bg-white z-10 duration-300'}>
                
                <nav>
                    <ul className='flex-col text-gray-900 text-left'>
                        <div className='flex items-center'>
                            <img src="/images/Shop.svg" alt="" className='text-left w-1/5 mt-3'/>
                            <h1 className='ml-2 text-center mt-3 font-bold text-2xl'>Comic Cottage</h1>
                        </div>

                        <li className='font-semibold py-4 flex text-lg items-center mt-8'>
                            <img src="/images/Profile.svg" alt="Profile.svg" className='scale-[100%] w-[10%] ml-[22.5px] mr-2 border border-black rounded-full'/>
                            <h1>Account: { isLoggedIn() ? getLoggedInUser() : ""}</h1>
                        </li>

                        <li className='font-semibold py-4 flex text-lg hover:bg-gray-300' onClick={() => {setOrderHistoryToggle(!orderHistoryToggle); getOngoingOrders().then(res => console.log(res.data))}}>
                            <BsClockHistory size={25} className='mr-2 ml-6 text-gray-700 bg-transparent'/>Order history{orderHistoryToggle? <AiOutlineCaretUp scale={25} className='ml-1 my-auto'/> : <AiOutlineCaretDown scale={25} className='ml-1 my-auto'/>}
                        </li>

                        {
                            orderHistoryToggle && 
                            <div className='transition transform'>                                
                                <li className='font-semibold py-4 flex text-sm hover:bg-gray-300' onClick={() => navigate("/orderHistory/All")}>
                                    <BsViewStacked size={25} className='mr-2 ml-[20%] text-gray-700 bg-transparent'/>All
                                </li>
                                <li className='font-semibold py-4 flex text-sm hover:bg-gray-300' onClick={() => navigate("/orderHistory/Ongoing")}>
                                    <BsTruck size={25} className='mr-2 ml-[20%] text-gray-700 bg-transparent'/>Ongoing
                                </li>
                                <li className='font-semibold py-4 flex text-sm hover:bg-gray-300' onClick={() => navigate("/orderHistory/Completed")}>
                                    <BsCheck2Circle size={25} className='mr-2 ml-[20%] text-gray-700 bg-transparent'/>Completed
                                </li>
                                <li className='font-semibold py-4 flex text-sm hover:bg-gray-300' onClick={() => navigate("/orderHistory/Cancelled")}>
                                    <BsXCircle size={25} className='mr-2 ml-[20%] text-gray-700 bg-transparent'/>Cancelled
                                </li>
                            </div>
                        }
                    </ul>
                </nav>
            </div>

            <div className={filterToggle ? 'fixed top-0 left-0 w-screen lg:h-[350px] md:h-[400px] sm:h-[700px] bg-[#dfdfdf] z-10 duration-300 text-center border-[2px] border-black': 'fixed top-[-200%] left-0 w-screen h-[300px] bg-[#dfdfdf] z-10 duration-300 text-center'}>
               <h3 className="text-xl font-semibold mb-4 mt-2 text-black bg-white mx-auto w-[12%] p-2 border-[2px] rounded-2xl border-black">Choose a filter</h3>

               <div className='grid md:grid-cols-4 sm:grid-cols-3 lg:grid-cols-6 grid-cols-3 gap-8 mt-11 lg:px-96 md:px-60 sm:px-32'>
                    <button onClick={() => {filterSearch("MARVEL")}} className='rounded-full border-[3px] bg-white border-black hover:bg-gray-300 transition'>
                        <img className='mx-auto' src='/icons/marvel.svg' width={115}></img>
                    </button>

                    <button onClick={() => {filterSearch("DC")}} className='rounded-full border-[3px] bg-white border-black hover:bg-gray-300 transition'>
                        <img src='/icons/dc.svg' className='mx-auto' width={75}></img>
                    </button>

                    <button onClick={() => {filterSearch("Drama")}} className='rounded-full border-[3px] bg-white border-black hover:bg-gray-300 transition'>
                        <img className='mx-auto' src='/icons/Drama.svg' width={75}></img>
                    </button>

                    <button onClick={() => {filterSearch("Action")}} className='rounded-full border-[3px] bg-white border-black hover:bg-gray-300 transition'>
                        <img className='mx-auto' src='/icons/Action.svg' width={75}></img>
                    </button>

                    <button onClick={() => {filterSearch("Comedy")}} className='rounded-full border-[3px] bg-white border-black hover:bg-gray-300 transition'>
                        <img className='mx-auto' src='/icons/Comedy.svg' width={75}></img>
                    </button>

                    <button onClick={() => {filterSearch("Sci_Fi")}} className='rounded-full border-[3px] bg-white border-black hover:bg-gray-300 transition'>
                        <img className='mx-auto' src='/icons/Sci_Fi.svg' width={85}></img>
                    </button>

                    <button onClick={() => {filterSearch("Horror")}} className='rounded-full border-[3px] bg-white border-black hover:bg-gray-300 transition'>
                        <img className='mx-auto' src='/icons/Horror.svg' width={75}></img>
                    </button>

                    <button onClick={() => {filterSearch("Crime")}} className='rounded-full border-[3px] bg-white border-black hover:bg-gray-300 transition'>
                        <img className='mx-auto' src='/icons/Crime.svg' width={90}></img>
                    </button>

                    <button onClick={() => {filterSearch("Mystery")}} className='rounded-full border-[3px] bg-white border-black hover:bg-gray-300 transition'>
                        <img className='mx-auto' src='/icons/Mystery.svg' width={75}></img>
                    </button>

                    <button onClick={() => {filterSearch("Romance")}} className='rounded-full border-[3px] bg-white border-black hover:bg-gray-300 transition'>
                        <img className='mx-auto' src='/icons/Romance.svg' width={70}></img>
                    </button>

                    <button onClick={() => {filterSearch("War")}} className='rounded-full border-[3px] bg-white border-black hover:bg-gray-300 transition'>
                        <img className='mx-auto' src='/icons/War.svg' width={70}></img>
                    </button>

                    <button onClick={() => {filterSearch("Manga")}} className='rounded-full border-[3px] bg-white border-black hover:bg-gray-300 transition'>
                        <img className='mx-auto' src='/icons/Manga.svg' width={75}></img>
                    </button>
               </div>
            </div>


        </>
      );
}
