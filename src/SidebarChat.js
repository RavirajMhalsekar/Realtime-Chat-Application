import React, { useEffect, useState } from "react";
import "./SidebarChat.css";
import AddIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import db from "./firebase";
import { Link } from "react-router-dom";
function SidebarChat({ id, name, addNewChat }) {
  const [seed, setSeed] = useState("");
  const [messages, setMessages] = useState("");
  useEffect(()=>{
    if(db){
      db.collection("rooms").doc(id).collection('messages').orderBy('timestamp','desc').onSnapshot(snapshot=>{
        setMessages(snapshot.docs.map((doc) => doc.data()))
      })
    }
  },[id]);
  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, []);

  const createChat = () => {
    const roomName = prompt("Please enter name for chat room");

    if (roomName) {
      db.collection("rooms").add({
        name: roomName,
      });
    }
  };
  return !addNewChat ? (
    <Link to={`/rooms/${id}`}>
      <div className="sidebarChat">
        <img
          src={`https://api.dicebear.com/5.x/pixel-art/svg?seed=${seed}`}
          alt="avatar"
        />
        <div className="sidebarChat__info">
          <h2>{name}</h2>
          <p>{messages[0]?.message}</p>
        </div>
      </div>
    </Link>
  ) : (
    <div onClick={createChat} className="sidebarChat">
      <div className="sidebar__addButton">
        <AddIcon />
        <h3> Add new Chat</h3>
      </div>
    </div>
  );
}

export default SidebarChat;
