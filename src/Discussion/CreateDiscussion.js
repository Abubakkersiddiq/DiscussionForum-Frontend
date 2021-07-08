import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@material-ui/core";
import DialogTitle from "../Elements/DialogTitle";
import axios from "axios";
import { Alert } from "@material-ui/lab";
import "./styles/CreateDiscussion.css";

export default function CreateDiscussion(props) {
  const { visibility, onVisibilityUpdate, onDiscussionRefresh } = props;
  const [alertVisibility, setAlertVisibility] = useState(false);
  const [alertType, setAlertType] = useState("success");
  const [alertMessge, setAlertMessage] = useState("");

  const onCloseModal = () => {
    onVisibilityUpdate(false);
  };

  // Function to be called when a logged in user creates a new topic
  const onCreateRecord = async () => {
    const topic = document.getElementById("discussion_topic").value;
    const description = document.getElementById("discussion_description").value;
    if (topic !== "" && description !== "") {
      const data = {
        topic: topic,
        description: description,
        replies: [],
      };

      await axios({
        method: "post",
        url: `${window.URL_CONFIG.PROD_URL}/create`,
        data: data,
        withCredentials: true,
      }).then((response) => {
        console.log(response);
        if (response.status === 200) {
          setAlertVisibility(true);
          setAlertType("success");
          setAlertMessage("Topic Successfully created");
          onDiscussionRefresh();
        }
      });
    }
  };

  return (
    <Dialog open={visibility} fullWidth maxWidth="lg">
      <DialogTitle onClose={onCloseModal}>Create new Topic</DialogTitle>
      <DialogContent className="dialog_content">
        <TextField
          id="discussion_topic"
          className="margin_20_70"
          label="Topic"
          variant="outlined"
        />
        <TextField
          id="discussion_description"
          className="margin_20_70"
          label="Description"
          variant="outlined"
          multiline
          rows={4}
        />
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={onCreateRecord}>
          Create
        </Button>
      </DialogActions>
      {alertVisibility && <Alert severity={alertType}>{alertMessge}</Alert>}
    </Dialog>
  );
}
