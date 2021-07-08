import React, { useState, useContext } from "react";

//creating the context for the authentication state
const UserContext = React.createContext(undefined);

//creating a provider to consume the context 
const UserProvider = ({children})=> {
    const [username, setUsername] = useState(localStorage.getItem("disforum_username"));
    
    //Function to handle the authentication state
    const handleUsername = (username) => {
        setUsername(username)
        localStorage.setItem("disforum_username", username)
    }

    const data = [username, handleUsername];

    return  <UserContext.Provider value={data}>{children}</UserContext.Provider>
}

// custom hook component  to consume the context 
const useUsername = () => {
    const context = useContext(UserContext);

    if(context === undefined)
    {
        throw new Error("useAuth can only be used inside the Authentication Provider")
    }

    return context;
}


export {UserProvider, useUsername};