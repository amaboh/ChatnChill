import React, { useRef } from "react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { userChats } from "../../api/ChatRequests";
import ChatBox from "../../components/ChatBox/ChatBox";
import Conversation from "../../components/Conversation/Conversation";
import LogoSearch from "../../components/LogoSearch/LogoSearch";
import NavIcons from "../../components/NavIcons/NavIcons";
import { io } from "socket.io-client";

import "./Chat.css";
const Chat = () => {
  const [chats, setChats] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);

  const { details } = useSelector((state) => state.authReducer.authData);
  const user = details;
  const socket = useRef();

  useEffect(() => {
    socket.current = io("http://localhost:8800");
    socket.current.emit("new-user-add", user._id);
    socket.current.on("get-users", (user) => {
      setOnlineUsers(user);
    });
  }, [user]);

  useEffect(() => {
    const getChats = async () => {
      try {
        const { data } = await userChats(user._id);
        setChats(data);
      } catch (error) {
        console.log(error);
      }
    };
    getChats();
  }, [user]);
  return (
    <div className="Chat">
      {/* Left Side */}
      <div className="Left-side-chat">
        <LogoSearch />
        <div className="Chat-container">
          <h2>Chats</h2>
          <div className="Chat-list">
            {chats.map((chat) => (
              <div
                key={user._id}
                onClick={() => {
                  setCurrentChat(chat);
                }}
              >
                <Conversation data={chat} currentUserId={user._id} />
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Right side */}
      <div className="Right-side-chat">
        <div style={{ width: "20rem", alignSelf: "flex-end" }}>
          <NavIcons />
        </div>
        <ChatBox chat={currentChat} currentUserId={user._id} />
      </div>
    </div>
  );
};

export default Chat;
