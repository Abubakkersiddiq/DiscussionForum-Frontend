import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, Button, IconButton } from "@material-ui/core";
import { ExitToApp } from '@material-ui/icons';
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
            url:`${window.URL_CONFIG.PROD_URL}/logout`,
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
                    : <div style={{display:"flex"}}>
                        <div style={{margin:"auto"}}>
                            {username}
                        </div>
                        <IconButton onClick={onLogout}>
                            <ExitToApp style={{color:"white"}}/>
                        </IconButton>
                    </div>
                }
            </Toolbar>
        </AppBar>
            <AuthenticationModal visibility={authvisibility} onVisibiltyUpdate={()=> setAuthVisibility(false)}/>
        </>
    )
}
