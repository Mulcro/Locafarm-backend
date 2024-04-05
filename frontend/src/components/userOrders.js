import {useState, useEffect, useContext, useRef} from 'react';
import UserContext from '../Context/userContext';
import { IoClose } from "react-icons/io5";

const UserOrders = ({onClose}) => {
    const [orders, setOrders] = useState(null);
    const [user, setUser] = useContext(UserContext);

    useEffect(() => {
        console.log(user.id);
        fetch(`http://localhost:5000/orders/buyer/${user.id}`)
        .then(response => response.json())
        .then(data => {
            setOrders(data.orders);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }, []);

    const parseDate = (date) => {
        const newDateArr = date.split('-');
        const year = newDateArr[0];
        const month = newDateArr[1];
        const day = newDateArr[2].split('T')[0];

        return `${month}/${day}/${year}`;
    }

    return ( 
        <div className="z-2 fixed fade top-0 left-0 bg-black bg-opacity-60 w-full h-full ">
            <div className='relative w-full h-full'>
                <div className='flex justify-center items-center h-[100vh]'>
                    <div className='bg-white w-[50rem] h-[40rem] border-2 border-solid border-black rounded-2xl p-4'>
                        <IoClose size={17} onClick={() => onClose()} color='red' className='relative top-0 left-0' />
                        <div className="flex flex-col justify-center items-center w-full h-full pb-10">
                            <h2 className='font-bold text-2xl my-5'>Orders</h2>
                            {orders &&
                                <div>
                                    <div className="grid grid-cols-3 gap-5">
                                        {orders.map((order, index) => (
                                            <div key={index} id={order.id} className="flex flex-col items-center max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gradient-to-b from-emerald-300 to-emerald-400 dark:border-gray-700">
                                                {console.log(order)}
                                                <div class="p-2">
                                                    <span className='text-s font-bold text-white' >Listing name: <p className='mb-1 font-normal text-white dark:text-white'>{order.listing_name}</p></span>
                                                    <span className='text-s font-bold text-white'> Quantity: <p class="mb-1 font-normal text-white dark:text-white">{order.quantity}</p></span>
                                                    <span className='text-s font-bold text-white'> Seller: <p class="mb-1 font-normal text-white dark:text-white">{order.seller_firstname}</p></span>
                                                    <span className='text-s font-bold text-white'> Placed on: <p class="mb-1 font-normal text-white dark:text-white">{parseDate(order.created_at)}</p></span>
                                                    <span className='text-s font-bold text-white'> Status: <p class="mb-1 font-normal text-white dark:text-white">{order.fulfilled ? "Fulfilled" : "Pending Fulfillment"}</p></span>
                                                </div>
                                            </div>
                                                ))
                                            }
                                            <div/>
                                        <div/>
                                    </div>
                                </div>
                            }
                            {!orders&&
                                <div className="flex flex-col justify-center items-center">
                                    <h2 className='font-bold text-2xl my-5'>Orders</h2>
                                    <div class="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-indigo-500 mt-[10rem]"></div>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default UserOrders;