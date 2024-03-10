import {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';

//Modify link
const Login = () => {
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        
        fetch('http://localhost:5000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                password,
            }),
        })
        .then(response => response.json())
        .then(data => {
            console.log(data.user);
            alert(data.user);
            sessionStorage.setItem('user', JSON.stringify(data.user));
            window.location = '/';

        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }
    return ( 
               <div className="min-h-screen py-40 bg-gradient-to-r from-indigo-400 to-emerald-300">
  <div className="container mx-auto">
  <div className="flex flex-col lg:flex-row-reverse w-10/12 lg:w-8/12 bg-white rounded-xl mx-auto shadow-lg overflow-hidden ">
    <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-12 bg-gradient-to-r from-emerald-500 to-indigo-300">
      <h1 className="text-white text-3xl mb-3">Welcome back</h1>
      <div>
        <p className="text-white">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean suspendisse aliquam varius rutrum purus maecenas ac <a href="#" className="text-indigo-500 font-semibold">Learn more</a></p>
      </div>
    </div>
    <div className="w-full lg:w-1/2 py-16 px-12">
      <h2 className="text-3xl mb-4">Login in</h2>
      <form action="#">
        <div className="mt-5">
          <input type="text" placeholder="Email" className="border border-gray-400 py-1 px-2 w-full" onChange={e => setEmail(e.target.value)} />
        </div>
        <div className="mt-5">
          <input type="password" onChange={e => setPassword(e.target.value)} placeholder="Password" className="border border-gray-400 py-1 px-2 w-full" />
        </div>
        <div className="mt-5 rounded-lg">
          <span>
           Don't have an account? <Link to={'/register'} className="text-indigo-500 font-semibold">Register here :)</Link>
          </span>
        </div>
        <div className="mt-5">
          <button onClick={e => handleSubmit(e)} className="w-full rounded-xl bg-indigo-500 py-3 text-center text-white hover:bg-emerald-600">Login</button>
        </div>
      </form>
    </div>
  </div>
</div>
</div>
     );
}
 
export default Login;