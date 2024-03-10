import { useState } from 'react';
import { Link } from 'react-router-dom';

const NewListing = () => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [inventory, setInventory] = useState(0);
    const [price, setPrice] = useState(0);
    const [user_id, setUserId] = useState(0);  // Assuming user_id needs to be provided
    const [plant_id, setPlantId] = useState(0);  // Assuming plant_id needs to be provided

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(user_id);
        const user = JSON.parse(sessionStorage.getItem('user'));

        // Sending the data to the server
        fetch('http://localhost:5000/listings', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                level:1,
                name,
                description,
                inventory,
                price,
                user_id,
                plant_id,
            }),
        })
            .then(response => response.json())
            .then(data => {
                alert('Listing added successfully')
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    return (
        <div className="flex flex-col justify-center items-center w-[1125px] h-screen bg-gradient-to-r from-emerald-200 to-indigo-200">
            {/* ... (existing JSX code) ... */}
            <div className="bg-black/50 rounded-xl w-full lg:w-1/2 py-16 px-12">
                <h2 className="text-3xl mb-4  text-white font-bold m-1">New Listing</h2>
                <p className="mb-4  text-white font-bold m-1">
                    Add a new listing to your inventory.
                </p>
                <form action="#">

<div className="grid grid-cols-2 gap-5">
    <div>
        <label className=" text-white font-bold m-1" htmlFor="name">Name:</label>
        <input type="text" id="name" placeholder="Name" className="border border-gray-400 py-1 px-2" onChange={e => setName(e.target.value)} />
    </div>
    <div>
        <label className=" text-white font-bold m-1" htmlFor="description">Description:</label>
        <input type="text" id="description" placeholder="Description" className="border border-gray-400 py-1 px-2" onChange={e => setDescription(e.target.value)} />
    </div>
</div>
<div className="mt-5">
    <label className=" text-white font-bold m-1" htmlFor="inventory">Inventory:</label>
    <input type="number" id="inventory" placeholder="Inventory" className="border border-gray-400 py-1 px-2 w-full" onChange={e => setInventory(parseInt(e.target.value))} />
</div>
<div className="mt-5">
    <label className="text-white font-bold m-1"  htmlFor="price">Price:</label>
    <input type="number" id="price" placeholder="Price" className="border border-gray-400 py-1 px-2 w-full" onChange={e => setPrice(parseFloat(e.target.value))} />
</div>
<div className="grid grid-cols-2 gap-5">
    <div>
        <label className=" text-white font-bold m-1" htmlFor="userId">User ID:</label>
        <input type="text" id="userId" placeholder="User ID" className="border border-gray-400 py-1 px-2 w-full" onChange={e => setUserId(e.target.value)} />
    </div>
    <div>
        <label className=" text-white font-bold m-1" htmlFor="plantId">Plant ID:</label>
        <input type="text" id="plantId" placeholder="Plant ID" className="border border-gray-400 py-1 px-2 w-full" onChange={e => setPlantId(e.target.value)} />
    </div>
</div>
<div className="mt-5">
    <button onClick={e => handleSubmit(e)} className="w-full rounded-xl bg-emerald-500 py-3 text-center text-white hover:bg-emerald-600">Add Listing</button>
</div>

                </form>
            </div>
        </div>
    );
}

export default NewListing;
