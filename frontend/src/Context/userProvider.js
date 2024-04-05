import UserContext from './userContext';
import {useState} from 'react';

const UserProvider = ({children}) => {
    const [user, setUser] = useState(null);

    console.log("Working 1");
    if(!user){
        console.log("Working 2");
        // sessionStorage.removeItem('token');
    }
    console.log(user);

    return (
        //Was stuck on the context not being passed to the children because I used {} instead of [] to wrap the user and setUser in the UserContext.Provider
        <UserContext.Provider value={[user, setUser]}>
            {children}
        </UserContext.Provider>
    );
}

export default UserProvider;