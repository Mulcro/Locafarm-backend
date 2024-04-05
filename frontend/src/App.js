import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router,Route, Routes} from 'react-router-dom';
import Auth from './Auth';
import Main from './components/main';
import Login from './components/login';
import Register from './components/register';
import Navbar from './components/navbar';
import Farmer from './components/farmer';
import ProductView from './components/productView';
import UserProvider from './Context/userProvider';
import UserOrders from './components/userOrders';

function App() {
  return (
    <UserProvider>
      <Router>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Main/>}/>
          <Route path='/login'element={<Login/>}/>
          <Route path='/register'element={<Register/>}/>

          <Route element={<Auth/>}>
            <Route path='/user/orders' element={<UserOrders/>}/>
            <Route path='/farmersMarket'element={<Farmer/>}/>
            <Route path='/product/:id' element={<ProductView/>}/>
          </Route>

        </Routes>
      </Router>
    </UserProvider>

  );
}

export default App;
