import { useState, useEffect } from "react";
import InputEmoji from "react-input-emoji";
import { w3cwebsocket as Socket } from "websocket";
import { Container, Row, Col, Button } from "react-bootstrap";

const client = new Socket("ws://127.0.0.1:8000");

const Chat = ({ userName }) => {
  const [myMessage, setMyMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const onSend = () => {
    client.send(
      JSON.stringify({
        type: "message",
        message: myMessage,
        userName,
      })
    );
    setMyMessage("");
  };

  useEffect(() => {
    client.onopen = () => {
      console.log("WebSocket Client Connected");
    };
    client.onmessage = (message) => {
      const data = JSON.parse(message.data);
      setMessages((messages) => [
        ...messages,
        {
          message: data.message,
          userName: data.userName,
        },
      ]);
    };
  }, []);

  return (
    <Container>
      <Row>
        <Col xs>
          <div className="text-center fs-4 text-white fw-bold bg-warning p-3">
            Socket Chat: {userName}
          </div>
        </Col>
      </Row>
      <Row className="py-5">
        <Col className="text-white" md={12} lg={4}>
          <aside>
            <h2>Steps to complete setup:</h2>
            <ul>
              <li>1️⃣ Enter message and send it</li>
              <li>
                2️⃣ Go to the second browser's tab or window and enter the
                chatroom wiht another random username if you haven't done it
                yet.
              </li>
              <li>3️⃣ As second user reply with another message</li>
            </ul>
            <h3>Implement emoji feature according to the task ✅</h3>
          </aside>
        </Col>
        <Col md={12} lg={8}>
          <aside>
            <div className="messages">
              {messages.map((message, key) => (
                <div
                  key={key}
                  className={`message ${
                    userName === message.userName
                      ? "message--outgoing"
                      : "message--incoming"
                  }`}
                >
                  <div className="avatar">
                    {message.userName[0].toUpperCase()}
                  </div>
                  <div>
                    <h4>{message.userName + ":"}</h4>
                    <p>{message.message}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-3 d-flex justify-content-center align-self-center align-items-center">
              <div className="flex-fill">
                <InputEmoji
                  value={myMessage}
                  onChange={(value) => setMyMessage(value)}
                  onKeyDown={(e) => e.key === "Enter" && onSend()}
                  placeholder="Message"
                  disableRecent
                  center
                  mobile
                />
              </div>
              <div>
                <Button
                  size="md"
                  variant="warning"
                  className="text-white fw-bold"
                  onClick={onSend}
                >
                  Send
                </Button>
              </div>
            </div>
          </aside>
        </Col>
      </Row>
    </Container>
  );
};

export default Chat;
