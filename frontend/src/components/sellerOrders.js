import {useState, useEffect, useContext, useRef} from 'react';
import UserContext from '../Context/userContext';

const SellerOrders = () => {
    const [orders, setOrders] = useState(null);
    const [user, setUser] = useContext(UserContext);

    const fetchOrders = () => {
        fetch(`http://localhost:5000/orders/seller/${user.id}`)
        .then(response => response.json())
        .then(data => {
            console.log(data.orders);
            setOrders(data.orders);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }

    useEffect(() => {
        console.log(user.id);
        fetchOrders();
    }, []);

    const parseDate = (date) => {
        const newDateArr = date.split('-');
        const year = newDateArr[0];
        const month = newDateArr[1];
        const day = newDateArr[2].split('T')[0];

        return `${month}/${day}/${year}`;
    }

    const fulfillOrder = (orderId) => {
        fetch(`http://localhost:5000/orders/fulfill`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                orderId,
            }),
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            alert('Order fulfilled successfully');
            fetchOrders();
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }

    return ( 
        <div className='flex ml-[15rem] flex-col justify-center items-center'>
            <h2 className='font-bold text-2xl my-5'>Orders</h2>
            {orders &&
                <div>
                    <div className="grid grid-cols-3 gap-5">
                            {orders.map((order, index) => (
                                <div key={index} id={order.id} className="flex flex-col items-center max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gradient-to-b from-emerald-300 to-emerald-400 dark:border-gray-700">
                                    {console.log(order)}
                                <a href="#">
                                    <img class="rounded-t-lg h-[220px] w-[250px]" src="https://ih0.redbubble.net/image.27399359.4181/raf,360x360,075,t,fafafa:ca443f4786.jpg" alt="" />
                                </a>
                                <div class="p-5">
                                    <h5 class="mb-2 text-xl font-bold tracking-tight text-white dark:text-white">Order Number: {order.id}</h5>
                                    <span className='font-bold text-white'> Quantity: <p class="mb-3 font-normal text-white dark:text-white">{order.quantity}</p></span>
                                    <span className='font-bold text-white'> Order placed by: {order.buyer_firstname} {order.buyer_lastname}<p class="mb-3 font-normal text-white dark:text-white">{order.total_price}</p></span>
                                    <span className='font-bold text-white'> Placed on: <p class="mb-3 font-normal text-white dark:text-white">{parseDate(order.created_at)}</p></span>
                                    <span className='font-bold text-white'> Status: <p class="mb-3 font-normal text-white dark:text-white">{order.fulfilled ? "Fulfilled" : "Pending Fulfillment"}</p></span>
                                    <div className={!order.fulfilled ? "" : "hidden"}>
                                        <button className='bg-indigo-500 text-white font-bold p-2 rounded-lg' onClick={() => fulfillOrder(order.id)}>Fulfill</button>
                                    </div>
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
     );
}
 
export default SellerOrders;