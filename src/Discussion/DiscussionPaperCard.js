import React, { useState } from 'react';
import { Grid, Paper, Typography, Button } from "@material-ui/core";
import { NavigateNext } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from 'react-router-dom';

const discussionStyles = makeStyles((theme)=> ({
    root:{
        flexGrow: 1
    },
    paper: {
        padding: theme.spacing(2),
        display: "flex",
        flexDirection:"column"
    }
}))

export default function DiscussionPaperCard(props) {
    const {topic, description, id} = props
    const history = useHistory();
    const disStyles = discussionStyles()
    
    return (
            <Grid item xs={6} sm={6} style={{margin:"20px auto"}}>
                <Paper className={disStyles.paper} elevation={3}>
                    <Typography variant="h6" style={{margin:"10px 0px"}}  >
                        {topic}
                    </Typography>
                    <div style={{margin:"10px 20px"}}>
                        {description}
                    </div>
                    <div  style={{margin:"10px 20px", alignSelf:"flex-end"}}>
                        <Button 
                            color="primary"
                            endIcon={<NavigateNext/>}
                            variant="contained"       
                            onClick={()=> history.push(`/card/${encodeURIComponent(id)}`)}
                        >

                            View
                        </Button>
                    </div>
                </Paper>
            </Grid>
    )
}
