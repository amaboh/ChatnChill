import React, { useEffect, useState } from "react";
import { getMessages } from "../../api/MessageRequests";
import { getUser } from "../../api/UserRequests";
import { format } from "timeago.js";
import InputEmoji from "react-input-emoji"

import "./ChatBox.css";

const ChatBox = ({ chat, currentUserId }) => {
  const [userData, setUserData] = useState(null);
  const [messages, setMessages] = useState(null);
  const [newMessage, setNewMessage] = useState('');


  // fetching data for header
  useEffect(() => {
    const userId = chat?.members?.find((id) => id !== currentUserId);
    const getUserData = async () => {
      try {
        const { data } = await getUser(userId);
        setUserData(data);
        // console.log(data);
      } catch (error) {
        console.log(error);
      }
    };

    if (chat !== null) getUserData();
  }, [chat, currentUserId]);

  //   fetching messages data
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const { data } = await getMessages(chat._id);
        setMessages(data);
      } catch (error) {
        console.log(error);
      }
    };
    if (chat !== null) fetchMessages();
  }, [chat]);
 
  const handleChange = (newMessage) => {
    setNewMessage(newMessage)
  }
  return (
    <>
      <div className="ChatBox-container">
        {chat? (
                    <>
                    <div className="chat-header">
                      <div className="follower">
                        <div className="followCard">
                          <img
                            src={
                              userData?.profilePicture
                                ? process.env.REACT_APP_PUBLIC_FOLDER +
                                  userData.profilePicture
                                : process.env.REACT_APP_PUBLIC_FOLDER +
                                  "defaultProfile.png"
                            }
                            alt="Profile"
                            className="followerImage"
                            style={{ width: "50px", height: "50px" }}
                          />
                          <div
                            className="name"
                            style={{ fontSize: "0.8rem", fontWeight: "bold" }}
                          >
                            <span>
                              {userData?.firstName} {userData?.lastName}
                            </span>
                          </div>
                        </div>
                      </div>
                      <hr style={{ width: "85%", border: "1.0px solid #ececec" }} />
                    </div>
                    {/* chatBox messages */}
                    <div className="chat-body">
                      {messages?.map((message) => (
                        <>
                          <div
                            className={
                              message.senderId === currentUserId
                                ? "message own"
                                : "message"
                            }
                          >
                            <span>{message.text}</span>
                            <span>{format(message.createdAt)}</span>
                          </div>
                        </>
                      ))}
                    </div>
                    {/* chat-sender */}
                    <div className="chat-sender">
                      <div>+</div>
                      <InputEmoji
                      value={newMessage}
                      onChange={handleChange}
                      />
                      <div className="send-button button">Send</div>
                    </div>
                  </>
        ) : (
            <span className="chatbox-empty-message">
                👈🏼 Tap on a chat to start conversation...
            </span>
        ) }

      </div>
    </>
  );
};

export default ChatBox;
