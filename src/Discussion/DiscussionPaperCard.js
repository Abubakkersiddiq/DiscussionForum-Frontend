import React, { useState } from 'react';
import { Grid, Paper, Typography, Button } from "@material-ui/core";
import { NavigateNext } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from 'react-router-dom';
import "./styles/DiscussionPaperCard.css";

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

//Design for the overview of the discussion card
export default function DiscussionPaperCard(props) {
    const {topic, description, id} = props
    const history = useHistory();
    const disStyles = discussionStyles()
    
    return (
            <Grid item xs={6} sm={3} className="grid">
                <Paper className={disStyles.paper} elevation={3}>
                    <Typography variant="h6" className="title"  >
                        {topic}
                    </Typography>
                    <div className="card_description">
                        {description}
                    </div>
                    <div  className="card_viewBtn">
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
