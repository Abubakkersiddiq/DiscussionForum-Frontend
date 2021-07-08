import React, { useState, useEffect } from "react";
import { Grid, Typography, Fab, makeStyles } from "@material-ui/core";
import DiscussionPaperCard from "./DiscussionPaperCard";
import { useAuth } from "../Context";
import { Add } from "@material-ui/icons";
import CreateDiscussion from "./CreateDiscussion";
import axios from "axios";
import "./styles/DiscussionLanding.css";

const useStyles = makeStyles((theme) => ({
  fab: {
    margin: theme.spacing(1),
    backgroundColor: "#0075da",
    "&:hover": {
      backgroundColor: "#004a8d",
      color: "#ffffff",
    },
    float: "right",
    position: "fixed",
    bottom: "1%",
    right: "1%",
    zIndex: 1,
  },
}));

export default function DiscussionLanding() {
  const discussionStyles = useStyles();
  const [auth] = useAuth(useAuth);
  const [newDiscussionVisibility, setNewDiscussionVisibility] = useState(false);
  const [discussionData, setDiscussionData] = useState({});
  const [discussionRefresh, setDiscussionRefresh] = useState(false);

  useEffect(() => {
    async function getData() {
      await axios({
        method: "get",
        url: `${window.URL_CONFIG.PROD_URL}/getdiscussions`,
        withCredentials: true,
      }).then((response) => {
        setDiscussionData(response.data);
      });
    }

    getData();
  }, [discussionRefresh]);

  return (
    <Grid container>
      <Grid item xs={12} sm={12}>
        <Typography variant="h5" className="landing_title">
          Discussion List
        </Typography>
      </Grid>
      <Grid container xs={12} sm={12} style={{ zIndex: 0 }}>
        {Object.keys(discussionData).length !== 0 ? (
          discussionData.map((element, index) => (
            <DiscussionPaperCard
              topic={element.topic}
              description={element.description}
              id={element["_id"]}
              key={`discusselement-${index}`}
            />
          ))
        ) : (
          <div className="no_discussions">No discussions present</div>
        )}
      </Grid>
      {auth && (
        <Fab
          color="primary"
          aria-label="add topic"
          className={discussionStyles.fab}
          onClick={() => setNewDiscussionVisibility(true)}
        >
          <Add />
        </Fab>
      )}
      <CreateDiscussion
        visibility={newDiscussionVisibility}
        onVisibilityUpdate={(value) => setNewDiscussionVisibility(value)}
        onDiscussionRefresh={() => setDiscussionRefresh(!discussionRefresh)}
      />
    </Grid>
  );
}
