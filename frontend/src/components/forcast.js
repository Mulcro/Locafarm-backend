import React, { useState } from 'react';

const Forecast = () => {
    const [soils, setSoils] = useState('');
    const [ph, setPh] = useState('');
    const [temperature, setTemperature] = useState('');
    const [humidity, setHumidity] = useState('');
    const [rainFall, setRainFall] = useState('');
    const [N, setN] = useState('');
    const [P, setP] = useState('');
    const [K, setK] = useState('');


    const [displayPopup, setDisplayPopup] = useState(false);
    const [loading, setLoading] = useState(false);

    const [results, setResults] = useState('');

    //generate random number from 1 to 5
    const random = Math.floor(Math.random() * 5) + 1;

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('http://localhost:5000/forecast', {  
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ph, temperature, humidity,rainfall:rainFall,N,P,K}),
        })
        .then(response => response.json())
        .then(data => {
            setDisplayPopup(true);
            setLoading(true)
            setTimeout(() => { 
                setLoading(false);
                setResults(data.crop);
             }, 5000*random);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    };

    return (
        <section class="mt-10 ml-[13rem] bg-white shadow-lg rounded-xl">
            <div class="mx-auto max-w-screen-xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
                <div class="mx-auto max-w-3xl text-center">
                <h2 class="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#01B3CC] from-20% to-indigo-500 via-50% ">Farm Forcaster</h2>

                <p class="mt-4 text-black">
                This cutting-edge feature transforms your agricultural decisions by seamlessly integrating soil composition, pH levels, environmental factors (temperature, humidity, and rainfall), and NPK values. By analyzing both historical data and leveraging advanced machine learning, it provides personalized recommendations for the most lucrative crops to grow under your specific conditions. This tailored approach not only ensures crop success but also optimizes sales generation by revealing the ideal NPK ratio. Embrace precision agriculture and unlock the potential for enhanced profitability through data-driven cultivation strategies.
                </p>
                </div>

                <div class="mt-8 sm:mt-12">
                <form onSubmit={e => handleSubmit(e)} class="mx-auto max-w-lg grid grid-cols-1 gap-6 sm:grid-cols-3">
                    <div>
                    <label for="ph" class="block text-sm font-medium text-gray-700">pH</label>
                    <input type="text" value={ph} onChange={(e) => setPh(e.target.value)} id="ph" name="ph" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" placeholder="Enter pH" />
                    </div>
                    <div>
                    <label for="temperature" class="block text-sm font-medium text-gray-700">Temperature</label>
                    <input type="text" value={temperature} onChange={(e) => setTemperature(e.target.value)} id="temperature" name="temperature" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" placeholder="Enter temperature" />
                    </div>
                    <div>
                    <label for="humidity" class="block text-sm font-medium text-gray-700">Humidity</label>
                    <input type="text" value={humidity} onChange={(e) => setHumidity(e.target.value)} id="humidity" name="humidity" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" placeholder="Enter humidity" />
                    </div>
                    <div>
                    <label for="rainFall" class="block text-sm font-medium text-gray-700">rainFall</label>
                    <input type="text" value={rainFall} onChange={(e) => setRainFall(e.target.value)} id="rainFall" name="rainFall" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" placeholder="Enter in milliemeters" />
                    </div>
                    <div>
                    <label for="N" class="block text-sm font-medium text-gray-700">N</label>
                    <input type="text" value={N} onChange={(e) => setN(e.target.value)} id="N" name="N" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" placeholder="Enter N" />
                    </div>
                    <div>
                    <label for="p" class="block text-sm font-medium text-gray-700">P</label>
                    <input type="text" value={P} onChange={(e) => setP(e.target.value)} id="P" name="P" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" placeholder="Enter P" />
                    </div>
                    <div>
                    <label for="K" class="block text-sm font-medium text-gray-700">K</label>
                    <input type="text" value={K} onChange={(e) => setK(e.target.value)} id="K" name="K" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" placeholder="Enter K" />
                    </div>
                    <div class="sm:col-span-3">
                    <button type="submit" class="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-gradient-to-r from-[#01B3CC] from-20% to-indigo-600 via-50%">Submit</button>
                    </div>
                </form>
                </div>

                {displayPopup&&
                    //Create popup for forcast results
                    <div class="fixed inset-0 z-10 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                        <div class="flex items
                        -center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
                        <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                        <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                        <h3 class="font-bold text-white text-lg font-medium leading-6 bg-indigo-500 p-5 rounded-t" id="modal-title">
                                    Forecast Results
                                </h3>
                            <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                            <div class="flex justify-center items-center">
                                <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                <div class="mt-2">
                                <div class="">
                                    {loading ? 
                                        <div class="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-indigo-500 mb-3"></div>

                                        :
                                        
                                        <div class="font-bold">After careful analysis, the crop that best fits your soil and environment of <br/>
                                            &nbsp;&nbsp;&nbsp;&nbsp; pH: {ph}<br/>
                                            &nbsp;&nbsp;&nbsp;&nbsp; temperature: {temperature}°C<br/>
                                            &nbsp;&nbsp;&nbsp;&nbsp; humidity: {humidity}% <br/>
                                            &nbsp;&nbsp;&nbsp;&nbsp; and rainFall: {rainFall}mm<br/>
                                            &nbsp;&nbsp;&nbsp;&nbsp; With an NPK ratio of <br/>
                                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; N: {N}, P: {P}, K: {K}<br/>
                                            
                                            <span className=' p-2 rounded font-bold text-indigo-500'>After careful analysis, the crop that best fits your soil is <span className="no-underline bg-emerald-300 mt-1 p-1 text-white rounded-xl">{results}</span></span>
                                        </div>

                                    }
                                </div>
                                </div>
                                </div>
                            </div>
                            </div>
                            <div class="bg-indigo-500 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                            <button type="button" onClick={() => setDisplayPopup(false)} class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-emerald-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm">
                                Close
                            </button>
                            </div>
                        </div>
                        </div>
                    </div>
                    }
            </div>
        </section>
    );
};

export default Forecast;