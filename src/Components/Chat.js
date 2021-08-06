import React from 'react'
import { useState } from 'react'
import { useForm } from "react-hook-form";
import { useRef } from 'react';
import axios from 'axios';
import Message from './Message';

export default function Chat() {
    const {register, handleSubmit, errors} = useForm();
    const [state, setstate] = useState([{}]);
    const [refreshstate, setrefreshstate] = useState(false);
    const [theUsername , setTheUsername] = useState("");
    const usernameInput = useRef("");
    if(state.length === 1){
        axios.get("/messages").then((res) => setstate(res.data))
    }
    function onSubmit(data) {
        console.log(data)
        axios.post("/messages/post", {
            username: theUsername,
            message: data.message
        })
        .then((res) => {
            console.log(res.data)
            setstate(res.data);
            document.getElementById("text-area").value = "";
        })
    }
    function refresh(){
        axios.get("/messages").then((res) => setstate(res.data))
        setrefreshstate(true);
        setTimeout(() => {setrefreshstate(false)}, 1000)
    }
    function SetGlobalUsername(){
        console.log(usernameInput.current.value)
        setTheUsername(usernameInput.current.value)
    }
    if(theUsername===""){
        return (
            <div>    
                <input ref={usernameInput} type="text" placeholder="Username" />
                <button onClick={SetGlobalUsername}>Login</button>
            </div>
        )
    }
    else{
       return (
        <div className="whole-container">
            <button onClick={refresh}>{refreshstate ? "Refreshed" : "Refresh Chat"}</button>
            
            <div className="all-messages">
                {state.slice(0).reverse().map(item => <Message name={item.username} message={item.message} />)}
            </div>   
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-username">   
                    {/* <input type="text" {...register('username', { required: true })} placeholder="Username"></input> */}
                </div>
                <div className="form-message">
                    <textarea type="text" {...register('message', { required: true })} placeholder="Chat Message" rows="4" cols="50" id="text-area"></textarea>
                </div>
                <div className="form-button">
                    <input type="submit" />  
                </div>
            </form>
        </div>
        ) 
       }
}
