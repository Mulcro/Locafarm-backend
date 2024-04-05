import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import UserContext from "../Context/userContext";


const ProductView = () => {
    const [user,setUser] = useContext(UserContext);
    const {id} = useParams();
    
    const [listing, setListing] = useState('');
    const [loading, setLoading] = useState(false);

    const [quantity, setQuantity] = useState(null);

    useEffect(() => {
        setLoading(true);
        fetch(`http://localhost:5000/listings/${id}`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            setListing(data);
            setLoading(false);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    },[]);

    const handlePurchase = () => {
        alert('You have successfully purchased this product');
        window.location.replace('/');
    }

    const createOrder = () => {
        console.log(user.id);
        fetch('http://localhost:5000/orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                listing_id: id,
                buyerId: user.id,
                quantity,
            }),
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            alert('Order created successfully');
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }

    const parseDate = (date) => {
        const newDateArr = date.split('-');
        const year = newDateArr[0];
        const month = newDateArr[1];
        const day = newDateArr[2].split('T')[0];

        return `${month}/${day}/${year}`;
    }

    return ( 
        <div>
            {loading&&
                <div class="flex items-center justify-center mt-[250px]">
                    <div class="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-indigo-600"></div>
                </div>

            }
            {!loading && listing&&
                <section class="text-gray-700 body-font overflow-hidden bg-white">
                    <div class="container px-5 py-24 mx-auto">
                        <div class="lg:w-4/5 mx-auto flex flex-wrap">
                        <img alt="ecommerce" class="lg:w-1/2 w-full object-cover object-center rounded border border-gray-200" src="https://hips.hearstapps.com/hmg-prod/images/freshly-harvested-homegrown-produce-carrots-radishes-kale-1615894312.jpg?crop=0.537xw:0.805xh;0.292xw,0.180xh&resize=640:*"/>
                        <div class="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                            <h1 class="text-gray-900 text-3xl title-font font-medium mb-1">{listing.name}</h1>
                            <div class=" font-bold flex mb-4">
                            <span class="flex items-center">
                                <svg fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 text-red-500" viewBox="0 0 24 24">
                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                </svg>
                                <svg fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 text-red-500" viewBox="0 0 24 24">
                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                </svg>
                                <svg fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 text-red-500" viewBox="0 0 24 24">
                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                </svg>
                                <svg fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 text-red-500" viewBox="0 0 24 24">
                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                </svg>
                                <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-4 h-4 text-red-500" viewBox="0 0 24 24">
                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                </svg>
                                <span class="text-gray-600 ml-3">4 Reviews</span>
                            </span>
                            <span class="flex ml-3 pl-3 py-2 border-l-2 border-gray-200">
                                <a class="text-gray-500">
                                <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-5 h-5" viewBox="0 0 24 24">
                                    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                                </svg>
                                </a>
                                <a class="ml-2 text-gray-500">
                                <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-5 h-5" viewBox="0 0 24 24">
                                    <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                                </svg>
                                </a>
                                <a class="ml-2 text-gray-500">
                                <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-5 h-5" viewBox="0 0 24 24">
                                    <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                                </svg>
                                </a>
                            </span>
                            </div>
                            <p class="font-bold leading-relaxed"> {listing.description}</p>
                            <div class="bg-emerald-500 pt-3 px-3 rounded-xl flex mt-6 items-center text-white pb-5 border-b-2 border-gray-200 mb-5">
                            <div class=" font-bold flex">
                                <span class="mr-3">Seller:</span>
                                {listing.user_id.first_name} {listing.user_id.last_name}
                            </div>
                            <div class="font-bold flex ml-6 items-center">
                                <span class="mr-3">Listed on: </span>
                                <div class="relative">
                                    {parseDate(listing.created_at)}
                                    <span class="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                                    <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" jstroke-width="2" class="w-4 h-4" viewBox="0 0 24 24">
                                    <path d="M6 9l6 6 6-6"></path>
                                    </svg>
                                </span>
                            </div>
                            </div>
                            <p>inventory {listing.inventory}</p>
                        </div>
                    <div class="flex justify-between">
                        <span class="title-font font-medium text-2xl text-gray-900">${listing.price}</span>

                        {/* Create input for quantity and incorporate create order to button for purchase */}
                        <div className="grid grid-cols-2">
                            <input type="number" class="w-20 h-10 border-2 border-gray-200 rounded" placeholder="Quantity" onChange={(e) => setQuantity(e.target.value)}/>
                            <button class="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none font-bold hover:bg-indigo-600 rounded disabled:bg-slate-500" onClick={() => createOrder()} disabled={!quantity ? true : false}>Purchase</button>
                        </div>
                    </div>
                </div>
                </div>
            </div>
        </section>
            }
        </div>
     );
}
 
export default ProductView;