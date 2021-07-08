import React from 'react';
import { Avatar, Typography } from "@material-ui/core";
import "./styles/ReplyCard.css";

function ReplyCard(props) {
    const {username, description} = props;
    return (
        <div className="reply_card">
                        <div className="reply_card_arrangement">
                            <div style={{fontWeight:"bold", margin:"10px 10px", display:"flex"}}>
                                <Avatar className="avatar">
                                    {username[0].toUpperCase()}
                                </Avatar>
                                <div className="username_title">
                                <Typography variant="h6">
                                    {username}
                                </Typography>
                                </div>
                            </div>
                            <div className="reply_description">
                            <Typography variant="subtitle1">
                                {description}
                            </Typography>
                            </div>
                        </div>
                </div>
    )
}

export default ReplyCard
