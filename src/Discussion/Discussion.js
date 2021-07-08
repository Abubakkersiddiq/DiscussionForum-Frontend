import React, { useEffect, useState } from "react";
import { Divider, Button, Typography, TextField } from "@material-ui/core";
import { useParams } from "react-router-dom";
import ReplyCard from "./ReplyCard";
import { useAuth } from "../Context";
import axios from "axios";
import { useUsername } from "../UserContext";
import "./styles/Discussion.css";

//Individual Discussion Page
function Discussion() {
  const [auth] = useAuth(useAuth);
  const [username] = useUsername(useUsername);
  const { id } = useParams();
  const [topic, setTopic] = useState("");
  const [description, setDescription] = useState("");
  const [replies, setReplies] = useState(null);
  const [docRefresh, setDocRefresh] = useState(false);

  // Get the specified content
  useEffect(() => {
    async function getData() {
      await axios({
        method: "get",
        data: { id },
        url: `${window.URL_CONFIG.PROD_URL}/getRecord/${id}`,
        withCredentials: true,
      }).then((response) => {
        console.log(response);
        if (response.data !== "") {
          setTopic(response.data.topic);
          setDescription(response.data.description);
          setReplies(response.data.replies);
        }
      });
    }
    getData();
  }, [docRefresh]);

  //When a reply message is posted
  const onReply = async () => {
    const reply_content = document.getElementById("discussion_reply").value;
    const reply_data = {
      username: username,
      description: reply_content,
    };
    const newData = [...replies, reply_data];

    const finalRequestData = {
      topic: topic,
      description: description,
      replies: newData,
    };

    await axios({
      method: "put",
      url: `${window.URL_CONFIG.PROD_URL}/update/${id}`,
      data: finalRequestData,
      withCredentials: true,
    }).then((response) => {
      if (response.status === 200) {
        document.getElementById("discussion_reply").value = "";
        setDocRefresh(!docRefresh);
      }
    });
  };

  return (
    <div>
      <div>
        <div>
          <Typography variant="h4" className="discussion_title">
            {topic}
          </Typography>
          <Typography style={{ margin: "20px" }}>{description}</Typography>
        </div>
        <Divider />
        <div className="reply_area">
          {replies !== null ? (
            replies.length !== 0 ? (
              replies.map((element, index) => (
                <ReplyCard
                  username={element.username}
                  description={element.description}
                  key={`reply-${index}`}
                />
              ))
            ) : (
              <div className="no_replies">No replies present</div>
            )
          ) : (
            <div className="no_replies">No replies present</div>
          )}
        </div>
      </div>
      <Divider style={{ backgroundColor: "black" }} />
      <div className="reply_content_area">
        <div className="reply_contents">
          <TextField
            id="discussion_reply"
            placeholder="Post a reply"
            className="text_area"
            maxRows={4}
            disabled={!auth}
            multiline
            variant="outlined"
          />
          <Button
            color="secondary"
            variant="contained"
            className="reply_textbox"
            disabled={!auth}
            onClick={onReply}
          >
            Reply
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Discussion;
