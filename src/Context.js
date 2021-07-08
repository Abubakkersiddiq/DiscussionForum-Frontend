import React, { useState, useContext } from "react";

//creating the context for the authentication state
const AuthContext = React.createContext(undefined);

    const getValue=(input)=> {
        if(input === "false" || input === null)
        {
            return false;
        }
        return true;
    }
//creating a provider to consume the context 
const AuthProvider = ({children})=> {
    const [auth, setAuth] = useState(getValue(localStorage.getItem("auth_state")));
    

    //Function to handle the authentication state
    const handleAuth = () => {
        setAuth(!auth)
        localStorage.setItem("auth_state",!auth)
    }

    const data = [auth,handleAuth];

    return  <AuthContext.Provider value={data}>{children}</AuthContext.Provider>
}

// custom hook component  to consume the context 
const useAuth = () => {
    const context = useContext(AuthContext);

    if(context === undefined)
    {
        throw new Error("useAuth can only be used inside the Authentication Provider")
    }

    return context;
}


export {AuthProvider, useAuth};