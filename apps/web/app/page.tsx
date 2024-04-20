"use client";
import { useState, useEffect } from 'react';
import { useSocket } from '../context/SocketProvider';
import classes from './page.module.css'
export default function Page(){
  const {sendMessage, messages}=useSocket();
  const [message, setMessage]=useState('');
 

  return (

  <div>
        <div className={classes["heading"]}>
      <h1 >Welcome to the FreeChat!!</h1>
      </div>
      <div className={classes["container"]}>
      {messages.map((message, index) => (
          <div key={index} className={classes["message"]}>
            {message}
          </div>
        ))}
      </div>
      <input value={message} onChange={e=>setMessage(e.target.value)} className={classes["chat-input"]} placeholder="Type your message here.." />
        <button onClick={e=>{sendMessage(message); setMessage('');}}className={classes["button"]}>Send</button>
        
      </div>
      
    
  );
}