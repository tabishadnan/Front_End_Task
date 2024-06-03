import React, { useState } from "react";
import ChatGates from "./components/ChatGates";
import Chat from "./components/Chat";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

const App = () => {
  const [userName, setUserName] = useState("");

  return (
    <div className="main-wrapper">
      {userName ? (
        <Chat userName={userName} />
      ) : (
        <ChatGates setUserName={setUserName} />
      )}
    </div>
  );
};

export default App;
