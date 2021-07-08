import React,{useState} from 'react';
import { Dialog, DialogContent, DialogActions, Button, TextField } from "@material-ui/core";
import DialogTitle from '../Elements/DialogTitle';
import axios from 'axios';
import { Alert } from '@material-ui/lab';

export default function CreateDiscussion(props) {
    const {visibility, onVisibilityUpdate, onDiscussionRefresh} = props;
    const [alertVisibility, setAlertVisibility] = useState(false);
    const [alertType, setAlertType] = useState("success");
    const [alertMessge, setAlertMessage] = useState("");
    
    const onCloseModal =() => {
        onVisibilityUpdate(false)
    }

    const onCreateRecord = async() => {
        const topic = document.getElementById("discussion_topic").value
        const description = document.getElementById("discussion_description").value
        if(topic !== "" && description !== "")
        {
            const data = {
                    topic: topic,
                    description: description,
                    replies:[]
            }
    
            await axios({
                method:"post",
                url:"http://localhost:4000/create",
                data: data,
                withCredentials:true
            }).then((response)=> {
                console.log(response)
                if(response.status === 200)
                {
                    setAlertVisibility(true)
                    setAlertType("success")
                    setAlertMessage("Topic Successfully created")
                    onDiscussionRefresh()
                }
            })
        }
    }
    
    return (
        <Dialog
            open={visibility}
            fullWidth
            maxWidth="lg"
        >
            <DialogTitle onClose={onCloseModal}>
                Create new Topic 
            </DialogTitle> 
            <DialogContent style={{display:"flex", flexDirection:"column"}}>  
                <TextField
                    id="discussion_topic"
                    label="Topic"
                    variant="outlined"
                    style={{margin:"20px 70px"}}
                />
                <TextField
                    id="discussion_description"
                    label="Description"
                    variant="outlined"
                    style={{margin:"20px 70px"}}
                    multiline
                    rows={4}
                />
            </DialogContent>
            <DialogActions>
                <Button color="primary" onClick={onCreateRecord} >
                    Create
                </Button>
            </DialogActions>
            {
                alertVisibility &&
                <Alert severity={alertType}>
                {alertMessge}
                </Alert>
            }

        </Dialog>
    )
}
