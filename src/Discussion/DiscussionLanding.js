import React, { useState, useEffect } from 'react';
import { Grid, Typography, Fab, makeStyles } from '@material-ui/core';
import DiscussionPaperCard from './DiscussionPaperCard';
import { useAuth } from '../Context';
import { Add } from '@material-ui/icons';
import CreateDiscussion from './CreateDiscussion';
import axios from 'axios';


const useStyles = makeStyles((theme)=>({
    fab:{
        margin: theme.spacing(1),
        backgroundColor: "#0075da",
        '&:hover' :{
            backgroundColor:"#004a8d",
            color:"#ffffff"
        },
        float:'right',
        position: 'fixed',
        bottom: "1%",
        right: "1%",
        zIndex: 1,
        
      }
}))

export default function DiscussionLanding() {
    const [auth, handleAuth] = useAuth(useAuth);
    const discussionStyles = useStyles();
    const [newDiscussionVisibility, setNewDiscussionVisibility] = useState(false)
    const [discussionData, setDiscussionData] = useState({});
    const [discussionRefresh, setDiscussionRefresh] = useState(false);

    useEffect(()=> {
            async function getData(){
                await axios({
                    method:"get",
                    url:"https://discussion-forum-101.herokuapp.com/getdiscussions"
                }).then((response)=> {
                    setDiscussionData(response.data)
                })
            }

            getData();
    },[discussionRefresh])
    
    return (
        <Grid container>
            <Grid item xs={12} sm={12}>
                <Typography variant="h5" style={{textAlign:"center", margin:"10px 0px"}}>
                    Discussion List
                </Typography>
            </Grid>
            <Grid item xs={12} sm={12} style={{zIndex:0}}>
            {
                Object.keys(discussionData).length !== 0 
                ? 
                    discussionData.map((element, index)=> (
                            <DiscussionPaperCard
                                topic={element.topic}
                                description={element.description}
                                id={element["_id"]}
                                key={`discusselement-${index}`}
                            />
                        ))
                :
               <div>No discussions present</div>
            }
                </Grid>
                {
                    auth &&
                        <Fab color="primary" aria-label="add topic" className={discussionStyles.fab} onClick={()=> setNewDiscussionVisibility(true)}>
                            <Add/>
                        </Fab>
                }
                <CreateDiscussion
                    visibility={newDiscussionVisibility}
                    onVisibilityUpdate={(value)=> setNewDiscussionVisibility(value)}
                    onDiscussionRefresh={()=> setDiscussionRefresh(!discussionRefresh)}

                />
        </Grid>
    )
}
