import {useEffect, useState} from 'react';
import {Link, useNavigate, useLocation } from "react-router-dom";
import icon from '../logo.svg'

const Navbar = () => {
    const navigate = useNavigate();
    const from = "/login";

    const [loggedIn, setLoggedIn] = useState(false);
    const [level, setLevel] = useState(0); // 0 = user, 1 = farmer

    //get user from session storage
    useEffect(() => {
        if(sessionStorage.getItem('user')){
            const user = JSON.parse(sessionStorage.getItem('user'));
            if(user.level === 1){
                setLevel(1);
            }
            setLoggedIn(true);
        }
        else{
            alert('Sorry you need to login or register to access this page.');
            navigate(from,{replace:true});
        }
    },[]);

    const handleBecomeFarmer = () => {
        const user = JSON.parse(sessionStorage.getItem('user'));
        const userId = user.id;
        console.log(userId);
        fetch(`http://localhost:5000/becomeFarmer/${userId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(response => response.json())  
        .then(data => {
            console.log(data);
            alert('You are now a farmer');
            window.location.reload();

        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }




    return ( 
    <nav className="bg-white dark:bg-emerald-400 w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
    <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link to='/' className="flex items-center space-x-3 rtl:space-x-reverse">
        <img src={icon} className="h-8" alt="Flowbite Logo" />
        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">LocaFarm</span>
        </Link>
        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
        { !loggedIn || level == 0 ?   
            
            <button type="button" className="text-white hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-black dark:hover:bg-emerald-700 dark:focus:ring-blue-800" onClick={() => handleBecomeFarmer()}>Become a Farmer</button>

            :

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
            <li>
            <Link to="/about" className="block py-2 px-3 text-white rounded hover:text-black md:hover:bg-transparent">About</Link>
            </li>
            <li>
            <Link to="/login" className="block py-2 px-3 text-white rounded hover:text-black md:hover:bg-transparent">Login</Link>
            </li>
        </ul>
        </div>
    </div>
    </nav>
     );
}
 
export default Navbar;