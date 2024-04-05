import {useContext, useEffect, useState} from 'react';
import  UserContext  from '../Context/userContext';
import {Link, useNavigate, useLocation } from "react-router-dom";
import icon from '../logo.svg'
import { IoClose } from "react-icons/io5";
import UserOrders from './userOrders';

const Navbar = () => {
    const [renderFarmerPopup, setRenderFarmerPopup] = useState(false);
    const [renderUserOrders, setRenderUserOrders] = useState(false);
    const [user, setUser] = useContext(UserContext);
    const navigate = useNavigate();

    const handleBecomeFarmer = () => {
        const userId = user.id

        fetch(`http://localhost:5000/becomeFarmer/${userId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(response => response.json())  
        .then(data => {
            console.log(data);
            alert('You are now a farmer! Please login again');
            setRenderFarmerPopup(false);
            window.location.reload();
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }

    const handleLogout = () => {
        setUser(null);
        sessionStorage.removeItem('token');
        navigate('/');
    }

    return ( 
    <nav className="bg-white dark:bg-emerald-400 w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
    <div className="max-w-screen-xl flex flex-wrap items-center mx-auto p-4">
        <Link to='/' className="flex items-center space-x-3 rtl:space-x-reverse">
        <img src={icon} className="h-8" alt="Logo" />
        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">LocaFarm</span>
        </Link>
        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            { !user &&
                <div></div>
            }
            { user && user?.level == 0&&  
                
                <div>
                    <button type="button" className="text-white hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-black dark:hover:bg-emerald-700 dark:focus:ring-blue-800" onClick={() => setRenderFarmerPopup(true)}>Become a Farmer</button>

                    {renderFarmerPopup &&
                        <div className="fixed fade top-0 left-0 bg-black bg-opacity-60 w-full h-full ">
                            <div className='relative w-full h-full'>
                                <div className='flex justify-center items-center h-[100vh]'>
                                    <div className='bg-white w-[35rem] h-[20rem] border-2 border-solid border-black rounded-2xl p-4'>
                                        <IoClose size={17} onClick={() => setRenderFarmerPopup(false)} color='red' className='relative top-0 left-0' />
                                        <div className="flex flex-col justify-center items-center w-full h-full pb-10">
                                            <img src={icon} className="h-[100px] mb-5" alt="Flowbite Logo" />
                                            <p className="text-lg font-bold">Are you sure you want to become a <span className='text-green-600 tracking-wide font-bold hover:text-green-500 '>Locafarmer?</span></p>
                                            <div className='flex flex-row mt-5'>
                                                <button onClick={() => handleBecomeFarmer()} className='bg-green-500 text-white rounded-lg px-4 py-2 m-2 hover:bg-green-700'>Yes</button>
                                                <button onClick={() => setRenderFarmerPopup(false)} className='bg-red-500 text-white rounded-lg px-4 py-2 m-2 hover:bg-red-600'>No</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                </div>

            }
            { user && user?.level == 1 && 
                <button type="button" className="text-white hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-black dark:hover:bg-emerald-700 dark:focus:ring-blue-800">
                <Link to={'farmersMarket'}>
                    Farmer Dashboard
                </Link>
                </button>
            }

            <button data-collapse-toggle="navbar-sticky" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-sticky" aria-expanded="false">
                <span className="sr-only">Open main menu</span>
                <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                </svg>
            </button>
        </div>
        <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
            
            <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 ">
                {/* ADD LINKS TO PAGES */}
                <li>
                <Link to="/" className="block py-2 px-3 text-white rounded md:bg-transparent hover:text-black">Home</Link>
                </li>
                {user &&
                    <li>
                        <button className="block py-2 px-3 text-white rounded md:bg-transparent hover:text-black" onClick={() => setRenderUserOrders(true)}>User Orders</button>
                    </li>
                }
                <li>
                { !user && 
                    <Link to="/login" className="block py-2 px-3 text-white rounded hover:text-black md:hover:bg-transparent">Login</Link>
                }
                { user && 
                    <button onClick={() => handleLogout()} className="block py-2 px-3 text-white rounded hover:text-black md:hover:bg-transparent">Log out</button>
                }
                </li>
            </ul>
        </div>
        {renderUserOrders &&
            <>  
                <UserOrders onClose={() => setRenderUserOrders(false)} />
            </>
        }
    </div>
    </nav>
     );
}
 
export default Navbar;