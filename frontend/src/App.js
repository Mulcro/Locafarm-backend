import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router,Route, Routes} from 'react-router-dom';
import Main from './components/main';
import Login from './components/login';
import Register from './components/register';
import Navbar from './components/navbar';
import Farmer from './components/farmer';
import ProductView from './components/productView';

function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Main/>}/>
        <Route path='/login'element={<Login/>}/>
        <Route path='/register'element={<Register/>}/>
        <Route path='/farmersMarket'element={<Farmer/>}/>
        <Route path='/product/:id' element={<ProductView/>}/>
      </Routes>
    </Router>

  );
}

export default App;
