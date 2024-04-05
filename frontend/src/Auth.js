import { useContext, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import UserContext from './Context/userContext';   

const Auth = () => {
    const [user] = useContext(UserContext);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(()=>{
        if(!user){
            alert('Please login first to access this page');
            navigate('/login');
        }
    },[])

    return(
        <Outlet/>
    )
}

export default Auth;