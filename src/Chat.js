import React, { useEffect, useState } from "react";
import { IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/SearchOutlined";
import AttachFileIcon from "@mui/icons-material/AttachFileOutlined";
import MoreIcon from "@mui/icons-material/MoreVertOutlined";
import VideocamIcon from "@mui/icons-material/VideocamOutlined";
import CallIcon from "@mui/icons-material/CallOutlined";
import EmojiEmotionIcon from "@mui/icons-material/EmojiEmotionsOutlined";
import MicIcon from "@mui/icons-material/MicOutlined";
import "./Chat.css";
import { useParams } from "react-router-dom";
import db from "./firebase";
import { useStateValue } from "./StateProvider";
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
function Chat() {
  const [seed, setSeed] = useState("");
  const [input, setInput] = useState("");
  const { roomId } = useParams();
  const [roomName, setRoomName] = useState("");
  const [messages, setMessages] = useState([]);
  const [{ user }] = useStateValue();
  useEffect(() => {
    if (roomId) {
      db.collection("rooms")
        .doc(roomId)
        .onSnapshot((snapshot) => setRoomName(snapshot.data().name));

      db.collection("rooms")
        .doc(roomId)
        .collection("messages")
        .orderBy("timestamp", "asc")
        .onSnapshot((snapshot) =>
          setMessages(snapshot.docs.map((doc) => doc.data()))
        );
    }
  }, [roomId]);

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, [roomId]);

  const sendMessage = (e) => {
    e.preventDefault();
    db.collection("rooms").doc(roomId).collection("messages").add({
      message: input,
      name: user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setInput("");
  };
  return (
    <div className="chat">
      <div className="chat__header">
        <img
          src={`https://api.dicebear.com/5.x/pixel-art/svg?seed=${seed}`}
          alt="avatar"
        />
        <div className="chat__headerInfo">
          <h3>{roomName}</h3>
          <p>last seen at {messages[messages.length-1]?.timestamp?.toDate().toLocaleTimeString()}</p>
        </div>
        <div className="chat__headerRight">
          <IconButton>
            <VideocamIcon />
          </IconButton>
          <IconButton>
            <CallIcon />
          </IconButton>
          <IconButton>
            <SearchIcon />
          </IconButton>
          <IconButton>
            <MoreIcon />
          </IconButton>
        </div>
      </div>
      <div className="chat__body">
        {messages.map((message) => (
          <div className="msg">
            <div className={`bubble ${message.name === user.displayName && `receive`}`}>
              <div className="txt">
                <span className={`name ${message.name === user.displayName && `receive`}`}>
                  {message?.name}
                </span>
                <span className="timestamp">
                  {new Date(message.timestamp?.toDate()).toLocaleTimeString()}
                </span>
                <p className="message">{message.message}</p>
              </div>
              <div className={`bubble-arrow ${message.name === user.displayName && `receive`}`}></div>
            </div>
          </div>
        ))}

      </div>

      <div className="chat__footer">
        <IconButton>
          <EmojiEmotionIcon />
        </IconButton>
        <IconButton>
          <AttachFileIcon />
        </IconButton>
        <form>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type="text"
            placeholder="Type a message"
          />
          <button type="submit" onClick={sendMessage}>
            send
          </button>
        </form>
        <IconButton>
          <MicIcon />
        </IconButton>
      </div>
    </div>
  );
}

export default Chat;
