import React, { useState } from "react";
import { TextField, Button, IconButton } from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";

//Page for Login the user
export default function LoginPage(props) {
    const {onLoginUpdate} = props;
    const [passwordVisibility, setPasswordVisibility] = useState(false);
    const [passworderror, setPasswordError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    

    // Function to be performed when login clicked
    const onLogin = () => {
        const username = document.getElementById("auth_username").value
        const password = document.getElementById("auth_password").value

        //validation checks
        if(password === "")
        {
            setPasswordError(true)
            setErrorMessage("Password cannot be empty")
        }
        else
        {
            setPasswordError(false)
            setErrorMessage("")

            //Sending back to the parent function for registraion
            onLoginUpdate(username, password)

            //After successfull registration clearing the field values
            document.getElementById("auth_username").value = ""
            document.getElementById("auth_password").value = ""
        }
    }
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <TextField
        id="auth_username"
        variant="outlined"
        label="Username"
        style={{ margin: "30px 70px" }}
      />
      <TextField
        id="auth_password"
        variant="outlined"
        label="Password"
        type={passwordVisibility ? "text" : "password"}
        error={passworderror}
        helperText={errorMessage}
        style={{ margin: "30px 70px" }}
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
      <Button
        style={{ margin: "20px auto" }}
        variant="contained"
        color="primary"
        onClick={onLogin}
      >
        Login
      </Button>
    </div>
  );
}
