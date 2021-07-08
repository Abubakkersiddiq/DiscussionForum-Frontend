import React , { useState }from 'react';
import { TextField, Button, IconButton } from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";

export default function RegisterPage(props) {
    const {onRegistrationUpdate}= props
    const [passwordVisibility, setPasswordVisibility] = useState(false);
    const [confirmPasswordVisibility, setConfirmPasswordVisibility] = useState(false);
    const [passworderror, setPasswordError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");


    //User Registration Function
    const onRegisterClick = ()=> {
        const username = document.getElementById("auth_username").value
        const password = document.getElementById("auth_password").value
        const confirmPassword = document.getElementById("auth_confirm_password").value

        if(password !== confirmPassword)
        {
            setPasswordError(true)
            setErrorMessage("Passwords don't Match")
        }
        else if(password === "" || confirmPassword === "")
        {
            setPasswordError(true)
            setErrorMessage("Password cannot be empty")
        }
        else 
        {
            setPasswordError(false)
            setErrorMessage("")

            //Sending back to the parent function for registraion
            onRegistrationUpdate(username, password)

            //After successfull registration clearing the field values
            document.getElementById("auth_username").value = ""
            document.getElementById("auth_password").value = ""
            document.getElementById("auth_confirm_password").value = ""

        }
    }

    return (
        <div style={{ display: "flex", flexDirection: "column" }}>
      <TextField
        id="auth_username"
        variant="outlined"
        label="Username"
        style={{ margin: "20px 70px" }}
      />
      <TextField
        id="auth_password"
        variant="outlined"
        label="Password"
        type={passwordVisibility ? "text" : "password"}
        style={{ margin: "20px 70px" }}
        InputProps={{
          endAdornment: (
            <IconButton
              onClick={() => setPasswordVisibility(!passwordVisibility)}
            >
              {passwordVisibility ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          ),
        }}
      />
      <TextField
        id="auth_confirm_password"
        variant="outlined"
        label="Confirm Password"
        type={confirmPasswordVisibility ? "text" : "password"}
        error={passworderror}
        helperText={passworderror && errorMessage}
        style={{ margin: "20px 70px" }}
        InputProps={{
          endAdornment: (
            <IconButton
              onClick={() => setConfirmPasswordVisibility(!confirmPasswordVisibility)}
            >
              {confirmPasswordVisibility ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          ),
        }}
      />
      <Button
        style={{ margin: "20px auto" }}
        variant="contained"
        color="primary"
        onClick={onRegisterClick}
      >
        Register
      </Button>
    </div>
    )
}
