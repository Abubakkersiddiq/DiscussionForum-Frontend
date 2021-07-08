import React, {useEffect, useState} from 'react';
import { Divider, TextareaAutosize, Button, Typography } from "@material-ui/core";
import { useParams } from 'react-router-dom';
import ReplyCard from './ReplyCard';
import { useAuth } from '../Context';
import axios from 'axios';
import { useUsername } from '../UserContext';


//Individual Discussion Page
function Discussion() {
    const [auth] = useAuth(useAuth);
    const [username] = useUsername(useUsername); 
    const {id} = useParams();
    const [topic, setTopic] = useState("")
    const [description, setDescription] = useState("");
    const [replies, setReplies] = useState(null);
    const [docRefresh, setDocRefresh] = useState(false);

    useEffect(()=> {
        async function getData(){
            await axios({
                method:"get",
                data:{id},
                url:`${window.URL_CONFIG.PROD_URL}/getRecord/${id}`,
                withCredentials:true
            }).then((response)=> {
                console.log(response)
                if(response.data !== ""){
                    setTopic(response.data.topic)
                    setDescription(response.data.description)
                    setReplies(response.data.replies)
                }
            })
        }
        getData()
    },[docRefresh])

    const onReply =  async()=> {
            const reply_content = document.getElementById("discussion_reply").value
            const reply_data = {
                username: username,
                description:reply_content
            }
            const newData =[...replies, reply_data]

            const finalRequestData = {
                    topic: topic,
                    description: description,
                    replies: newData
            }

            console.log(finalRequestData)
            
            await axios({
                method:"put",
                url:`${window.URL_CONFIG.PROD_URL}/update/${id}`,
                data: finalRequestData,
                withCredentials: true

            }).then((response)=> {
                if(response.status === 200)
                {
                    document.getElementById("discussion_reply").value = ""
                    setDocRefresh(!docRefresh)

                }
            })

    }

    return (
        <div>
            <div style={{height:"100vh"}}>
                <Typography variant="h4" style={{margin:"10px 20px"}}>
                    {topic}
                </Typography> 
                <Typography style={{margin:"20px"}}>
                    {description}
                </Typography>
                <Divider/>
                <Typography>
                    Replies
                </Typography>
                {
                    replies !== null ?( replies.length !== 0 ?
                    replies.map((element, index)=>(
                        <ReplyCard
                            username={element.username}
                            description={element.description}
                            key={`reply-${index}`}
                        />
                    ))
                    : <div>No replies present</div>
                    )
                    : <div>No replies present</div>
                }
            </div>
            <div style={{position:"sticky", bottom:0, backgroundColor:"white"}}>
                <Divider style={{backgroundColor:"black"}}/>
                <div style={{width:"100%", display:"flex", alignItems:"center"}}>
                <div style={{margin:"10px auto",display:"flex"}}>
                    <TextareaAutosize id="discussion_reply" placeholder="Post a reply" style={{width:"600px", height:"90px", fontFamily:"monospace"}} maxRows={4} disabled={!auth}/>
                    <Button color="secondary" variant="contained" style={{margin:"auto 10px"}} disabled={!auth} onClick={onReply}>
                        Reply
                    </Button>
                </div>
                </div>
            </div>
                
                
        </div>
    )
}

export default Discussion
