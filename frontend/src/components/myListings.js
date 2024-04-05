import {useState,useEffect, useContext} from 'react';
import UserContext from '../Context/userContext';

const MyListings = () => {
    const [listings, setListings] = useState([]);
    const [user, setUser] = useContext(UserContext);

    useEffect(() => {
        console.log(user.id);
        fetch(`http://localhost:5000/my-listings/${user.id}`)
        .then(response => response.json())
        .then(data => {
            console.log(data.listings);
            setListings(data.listings);
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
        <div className='flex ml-[15rem] flex-col justify-center items-center'>
            <h2 className='text-xl font-bold'>My Listings</h2>
            {listings&&
            <div className="grid grid-cols-3 gap-5">
                    {listings.map((listing, index) => (
                        <div key={index} id={listing.id} className="flex flex-col items-center max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gradient-to-b from-emerald-300 to-emerald-400 dark:border-gray-700">
                        <a href="#">
                            <img class="rounded-t-lg h-[220px] w-[250px]" src="https://ih0.redbubble.net/image.27399359.4181/raf,360x360,075,t,fafafa:ca443f4786.jpg" alt="" />
                        </a>
                        <div class="p-5">
                            <a href="#">
                                <h5 class="mb-2 text-xl font-bold tracking-tight text-white dark:text-white">{listing.name}</h5>
                            </a>
                            <span className='font-bold text-white'> Description: <p class="mb-3 font-normal text-white dark:text-white">{listing.description}</p></span>
                            <span className='font-bold text-white'> Price: <p class="mb-3 font-normal text-white dark:text-white">{listing.price}</p></span>
                            <span className='font-bold text-white'> Listed on: <p class="mb-3 font-normal text-white dark:text-white">{parseDate(listing.created_at)}</p></span>
                        </div>
                        </div>
                    ))
                    }


                <div/>
            <div/>
            </div>
            }
            {!listings&&
                <div className="listingpage">
                    <h2>Available Listings</h2>
                    <p>loading...</p>
                </div>

            }

        </div>
     );
}
 
export default MyListings;