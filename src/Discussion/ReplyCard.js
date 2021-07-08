import React from 'react';
import { Avatar } from "@material-ui/core";

function ReplyCard(props) {
    const {username, description} = props;
    return (
        <div style={{width:"100%", display:"flex", flexDirection:"column"}}>
                        <div style={{display:"flex", flexDirection:"column", margin:"20px 30px", backgroundColor:"lightblue"}}>
                            <div style={{fontWeight:"bold", margin:"10px 10px", display:"flex"}}>
                                <Avatar>
                                    {username[0]}
                                </Avatar>
                                <div style={{margin:"auto 10px"}}>
                                    {username}
                                </div>
                            </div>
                            <div style={{margin:"10px 50px"}}>
                                {description}
                            </div>
                        </div>
                </div>
    )
}

export default ReplyCard
