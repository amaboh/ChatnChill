import React from "react";
import { useState, useEffect } from "react";
import {useSelector} from "react-redux"
import { userChats } from "../../api/ChatRequests";
import Conversation from "../../components/Conversation/Conversation";
import LogoSearch from "../../components/LogoSearch/LogoSearch";

import "./Chat.css";
const Chat = () => {
    const [chats, setChats] = useState([])
    const{details} = useSelector((state)=> state.authReducer.authData);

  useEffect(()=> {
    const getChats = async()=> {
      try {
        const {data} = await userChats(details._id)
        setChats(data)
        console.log(data)
      } catch (error) {
        console.log(error)
      }
    }
    getChats()
  }, [details])
  return (
    <div className="Chat">
        {/* Left Side */}
      <div className="Left-side-chat">
        <LogoSearch />
        <div className="Chat-container">
            <h2>Chats</h2>
            <div className="Chat-list">
              {chats.map((chat)=>(
                <div key={details._id}>
                  <Conversation  data={chat} currentUserId={details._id}/>
                </div>
              ))}
            </div>
        </div>
      </div>
      {/* Right side */}
      <div className="Right-side-chat">Right Side</div>
    </div>
  );
};

export default Chat;
