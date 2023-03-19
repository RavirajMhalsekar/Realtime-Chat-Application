import React, { useEffect, useState } from "react";
import { IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/SearchOutlined";
import AttachFileIcon from "@mui/icons-material/AttachFileOutlined";
import MoreIcon from "@mui/icons-material/MoreVertOutlined";
import VideocamIcon from "@mui/icons-material/VideocamOutlined";
import CallIcon from "@mui/icons-material/CallOutlined";
import EmojiEmotionIcon from '@mui/icons-material/EmojiEmotionsOutlined';
import MicIcon from '@mui/icons-material/MicOutlined';
import "./Chat.css";
import { useParams } from "react-router-dom";
import db from "./firebase";
function Chat() {
  const [seed, setSeed] = useState("");
  const [input, setInput] = useState("");
  const {roomId} = useParams();
  const [roomName,setRoomName] = useState('');

  useEffect(()=>{
    if(roomId){
      db.collection('rooms').doc(roomId).onSnapshot(snapshot=>(
        setRoomName(snapshot.data().name)
      ))
    }
  },[roomId]);

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, [roomId]);

  const sendMessage = (e) =>{
    e.preventDefault();
    // console.log("you typed: ",input);
    setInput('');
  }
  return (
    <div className="chat">
      <div className="chat__header">
        <img
          src={`https://api.dicebear.com/5.x/pixel-art/svg?seed=${seed}`}
          alt="avatar"
        />
        <div className="chat__headerInfo">
          <h3>{roomName}</h3>
          <p>last seen at ...</p>
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
        <div className="msg">
          <div className={`bubble ${false && `receive`}`}>
            <div className="txt">
              <span className={`name ${false && `receive`}`}>My Name</span>
              <span className="timestamp">10:22 pm</span>
              <p className="message">Hey boro mare?</p>
            </div>
            <div className={`bubble-arrow ${false && `receive`}`}></div>
          </div>
        </div>
        <div className="msg">
          <div className={`bubble ${true && `receive`}`}>
            <div className="txt">
              <span className={`name ${true && `receive`}`}>My Name</span>
              <span className="timestamp">10:22 pm</span>
              <p className="message">Arre bro gatt!!!</p>
            </div>
            <div className={`bubble-arrow ${true && `receive`}`}></div>
          </div>
        </div>
      </div>

      <div className="chat__footer">
        <IconButton><EmojiEmotionIcon/></IconButton>
        <IconButton><AttachFileIcon /></IconButton>
        <form>
          <input value={input} onChange={e => setInput(e.target.value)} type="text" placeholder="Type a message"/>
          <button type="submit" onClick={sendMessage}>send</button>
        </form>
        <IconButton><MicIcon/></IconButton>
        
      </div>
    </div>
  );
}

export default Chat;
