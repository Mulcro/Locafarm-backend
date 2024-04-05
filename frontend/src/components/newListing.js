import { useContext, useEffect, useState, useRef } from 'react';
import  UserContext  from '../Context/userContext';
import { Link } from 'react-router-dom';

const NewListing = () => {
    const formRef = useRef();

    const [user, setUser] = useContext(UserContext);
    const [name, setName] = useState(null);
    const [description, setDescription] = useState(null);
    const [inventory, setInventory] = useState(null);
    const [price, setPrice] = useState(null); // Assuming user_id needs to be provided
    const [plant_id, setPlantId] = useState(null);  // Assuming plant_id needs to be provided
    const [plantType, setPlantType] = useState([]);


    useEffect(() => {
        fetch('http://localhost:5000/plant-types')
        .then(response => response.json())
        .then(data => { 
            console.log(data.plantTypes);
            setPlantType(data.plantTypes);
        })
    },[])

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Working")

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
                user_id: user.id,
                type_id:plant_id,
            }),
        })
            .then(response => response.json())
            .then(data => {
                alert('Listing added successfully')
                setName("");
                setDescription("");
                setInventory(null);
                setPrice(null);
                setPlantId(null);
                formRef.current.reset();
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    return (
        <div className="ml-15 flex flex-col justify-center items-center w-[1262px] h-screen bg-gradient-to-r from-emerald-200 to-indigo-200">
            {plantType &&
            <div className="bg-black/50 rounded-xl w-full lg:w-1/2 py-16 px-12">
                <h2 className="text-3xl mb-4  text-white font-bold m-1">New Listing</h2>
                <p className="mb-4  text-white font-bold m-1">
                    Add a new listing to your inventory.
                </p>
                <form ref={formRef} action="#">

                <div className="grid grid-cols-2 gap-5">
                    <div className='grid col-1 my-1'>
                        <label className=" text-white font-bold m-1" htmlFor="name">Name:</label>
                        <input type="text" id="name" placeholder="Name" className="border border-gray-400 py-1 px-2" onChange={e => setName(e.target.value)} />
                    </div>
                    <div className="grid col-1">
                        <label className=" text-white font-bold m-1" htmlFor="inventory">Inventory:</label>
                        <input type="number" id="inventory" placeholder="Inventory" className="border border-gray-400 py-1 px-1" onChange={e => setInventory(parseInt(e.target.value))} />
                    </div>
                </div>
                    <div className='mt-2'>
                        <label className=" text-white font-bold m-1" htmlFor="description">Description:</label>
                        <input type="textarea" id="description" placeholder="Description" className="border border-gray-400 py-1 px-2 w-full" onChange={e => setDescription(e.target.value)} />
                    </div>
                <div className="grid grid-cols-2 mt-5 gap-5">
                    <div className="grid grid-cols-1">
                        <label className="text-white font-bold"  htmlFor="price">Price:</label>
                        <input type="number" step="0.01" id="price" placeholder="Price" className="border border-gray-400 py-1 px-2" onChange={e => setPrice(parseFloat(e.target.value))} />
                    </div>
                    <div>
                        <div className='grid grid-cols-1 my-2'>
                            <label className=" text-white font-bold" htmlFor="plantId">Plant ID:</label>
                            <select id="plantId" placeholder="Plant ID" className="border border-gray-400 py-1 px-2 w-[260px]" onChange={e => setPlantId(e.target.value)}>
                                <option value={null}>Select Plant</option>
                                {plantType.map((plant, index) => (
                                    <option key={index} value={plant.id}>{plant.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
                <div className="mt-5">
                    <button onClick={e =>{handleSubmit(e)}} disabled={(!name || !description || !inventory || !description || !plant_id) ? true  : false} className="w-full rounded-xl bg-emerald-500 py-3 text-center text-white hover:bg-emerald-600 disabled:bg-slate-500">Add Listing</button>
                </div>

                </form>
            </div>
            }
            {!plantType &&
                <div className='loading'>
                    <h2>Loading...</h2>
                </div>

            }
        </div>
    );
}

export default NewListing;
