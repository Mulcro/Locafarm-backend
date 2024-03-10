import {useState, useEffect} from 'react'
import { Link } from 'react-router-dom';

const Register = () => {

    //modidy link
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [address, setAddress] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        

        fetch('http://localhost:5000/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                password,
                first_name: firstName,
                last_name: lastName,
                address,
            }),
        })
            .then(response => response.json())
            .then(data => {
                console.log(data.user);
                sessionStorage.setItem('user', JSON.stringify(data.user));
                window.location = '/login';
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    return ( 
        <div className="min-h-screen py-40 bg-gradient-to-r from-emerald-200 to-indigo-200">
  <div className="container mx-auto">
    <div className="flex flex-col lg:flex-row w-10/12 lg:w-8/12 bg-white rounded-xl mx-auto shadow-lg overflow-hidden ">
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-12 bg-gradient-to-r from-indigo-500 to-emerald-300">
        <h1 className="text-white text-3xl mb-3">Welcome</h1>
        <div>
          <p className="text-white">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean suspendisse aliquam varius rutrum purus maecenas ac <a href="#" className="text-emerald-500 font-semibold">Learn more</a></p>
        </div>
      </div>
      <div className="w-full lg:w-1/2 py-16 px-12">
        <h2 className="text-3xl mb-4">Register</h2>
        <p className="mb-4">
          Create your account. It’s free and only takes a minute
        </p>
        <form action="#">
          <div className="grid grid-cols-2 gap-5">
            <input type="text" placeholder="Firstname" className="border border-gray-400 py-1 px-2" onChange={e => setFirstName(e.target.value)} />
            <input type="text" placeholder="Surname" className="border border-gray-400 py-1 px-2" onChange={e => setLastName(e.target.value)}/>
          </div>
          <div className="mt-5">
            <input type="text" placeholder="Address" className="border border-gray-400 py-1 px-2 w-full " onChange={e => setAddress(e.target.value)}/>
          </div>
          <div className="mt-5">
            <input type="text" placeholder="Email" className="border border-gray-400 py-1 px-2 w-full" onChange={e => setEmail(e.target.value)} />
          </div>
          <div className="mt-5">
            <input type="password" onChange={e => setPassword(e.target.value)} placeholder="Password" className="border border-gray-400 py-1 px-2 w-full" />
          </div>
          <div className="mt-5 rounded-lg">
            <span>
             Already have an account? <Link to={'/Login'} className="text-emerald-500 font-semibold">Log in here :)</Link>
            </span>
          </div>
          <div className="mt-5">
            <button onClick={e => handleSubmit(e)} className="w-full rounded-xl bg-emerald-500 py-3 text-center text-white hover:bg-emerald-600">Register Now</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>
     );
}
 
export default Register;