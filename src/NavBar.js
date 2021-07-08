import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, Button } from "@material-ui/core";
import { useAuth } from './Context';
import AuthenticationModal from './Authentication/AuthenticationModal';
import { useUsername } from './UserContext';
import axios from 'axios';

const navBarStyles = makeStyles((theme)=> ({
    title:{
        flexGrow:1
    }
}))


export default function NavBar() {
    const [auth, handleAuth]= useAuth(useAuth);
    const [username, handleUsername] = useUsername(useUsername)
    const [authvisibility, setAuthVisibility] = useState(false)
    console.log(auth, username)
    const styles = navBarStyles();

    const onLogout = () =>{
        axios({
            method:"GET",
            url:"http://localhost:4000/logout",
        }).then((response)=>{
            if(response.status === 200)
            {
                handleUsername(null)
                handleAuth()
            }
        })
    }
    return (
        <>
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" className={styles.title} >
                    Discussion Forum
                </Typography>
                {
                    (auth === false || username == null)
                    ? <Button color="inherit" onClick={()=>setAuthVisibility(true)}> 
                        Login
                      </Button>
                    : <div onClick={onLogout}>
                        {username}
                    </div>
                }
            </Toolbar>
        </AppBar>
            <AuthenticationModal visibility={authvisibility} onVisibiltyUpdate={()=> setAuthVisibility(false)}/>
        </>
    )
}
