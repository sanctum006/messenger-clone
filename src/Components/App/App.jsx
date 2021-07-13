import React, { useState, useEffect } from "react";
import { Button, FormControl, InputLabel, Input } from "@material-ui/core";
import "./App.css";
import Message from "./Message/Message";
import db from "../../firebase";
import firebase from "firebase";
import FlipMove from "react-flip-move";
import { IconButton } from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";

function App() {
  const [inputText, setInputText] = useState("");
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState(["Hi", "Hello!!"]);

  useEffect(() => {
    db.collection("messages")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setMessages(
          snapshot.docs.map((doc) => ({ id: doc.id, message: doc.data() }))
        );
      });
  }, []);

  useEffect(() => {
    setUsername(prompt("Enter your name..."));
  }, []);

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleClick = (e) => {
    e.preventDefault();
    db.collection("messages").add({
      message: inputText,
      username: username,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setInputText("");
  };

  const chat = messages.map(({ message, id }) => (
    <Message key={id} message={message} username={username} />
  ));

  return (
    <div className="app">
      <h1>Hello World!! 🚀🚀</h1>
      <h2>Welcome {username}!!</h2>
      <form action="post" className="app__form">
        <FormControl className="app__formControl">
          <Input
            value={inputText}
            placeholder="Enter a message..."
            onChange={handleInputChange}
            className="app__input"
          />
          <IconButton
            disabled={!inputText}
            type="submit"
            color="primary"
            onClick={handleClick}
            className="app__iconButton"
          >
            <SendIcon />
          </IconButton>
        </FormControl>
      </form>
      <FlipMove>{chat}</FlipMove>
    </div>
  );
}

export default App;
