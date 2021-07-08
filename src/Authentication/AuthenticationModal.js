import React, { useState } from 'react';
import {  DialogContent, Dialog, Paper, Tabs,Tab } from '@material-ui/core';
import DialogTitle from '../Elements/DialogTitle';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';
import axios from "axios";
import { useAuth } from '../Context';
import { useUsername } from '../UserContext';
import { Alert } from "@material-ui/lab";

function AuthenticationModal(props) {
    const {visibility, onVisibiltyUpdate} = props
    const [tabvalue, setTabValue] = useState(0);
    const [auth, handleAuth] = useAuth(useAuth);
    const [username, handleUsername] = useUsername(useUsername)
    const [alertType, setAlertType] = useState("success");
    const [alertVisibility, setAlertVisibility] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");

    const onLogin = async(username, password) => {
       await axios({
            method:"POST",
            data: {
                username: username,
                password: password
            },
            url:`${window.URL_CONFIG.PROD_URL}/login`,
            withCredentials: true
        })
        .then((response)=> {
            console.log(response)
            if(response.data === "Successfully Authenticated")
            {
                handleAuth()
                setAlertType("success")
                setAlertVisibility(true)
                setAlertMessage(response.data)
            }else if (response.data === "User doesnt exists")
            {
                setAlertVisibility(true)
                setAlertType("error")
                setAlertMessage("Invalid Credentials")
            }    
            getUser()
        })
    }

    const onRegister = async(username, password) => {
       await axios({
            method:"POST",
            data: {
                username: username,
                password: password
            },
            withCredentials: true,
            url:`${window.URL_CONFIG.PROD_URL}/register`
        })
        .then((response)=> {
            console.log(response)
            setAlertVisibility(true)
            setAlertType("success")
            setAlertMessage("User successfully created.Please Login with the credentials")
        })
    }

    const getUser = async() => {
        await axios({
            method:"GET",
            url:`${window.URL_CONFIG.PROD_URL}/user`,
            withCredentials: true
        })
        .then((response)=> {
            console.log(response)
            if(response.data)
            {
                handleUsername(response.data.username)
            }
            console.log(username)
        })
    }

    const onModalClose =()=> {
        setAlertVisibility(false)
        setTabValue(0)
        setAlertMessage("")
        onVisibiltyUpdate(false)
    }

    const onTabChange =(newValue) => {
        setTabValue(newValue)
        setAlertVisibility(false)
        setAlertMessage("")
        setAlertType("success")
    }

    return (
        <Dialog
            open={visibility}
            fullWidth
            maxWidth='lg'
        >
            <DialogTitle id="authentication-modal" onClose={onModalClose}>
                Login/Register
            </DialogTitle>
            <DialogContent>
                <Paper square>
                    <Tabs
                        value={tabvalue}
                        onChange={(e, newValue)=> onTabChange(newValue)}
                        textColor="primary"
                        indicatorColor="primary"
                        aria-label="login_register_shift"
                        style={{justifyContent:"center !important"}}
                    >
                        <Tab label="Login"/>
                        <Tab label="Register"/>
                    </Tabs>
                </Paper>
                {
                    tabvalue === 0 
                    ? <LoginPage onLoginUpdate={(username, password)=> onLogin(username, password)}/>
                    : <RegisterPage onRegistrationUpdate={(username, password)=> onRegister(username, password)}/>

                }
            </DialogContent>
            {
                alertVisibility &&
                <Alert severity={alertType}>
                {alertMessage}
                </Alert>
            }
        </Dialog>
    )
}

export default AuthenticationModal
