import { useState } from "react";
import { Container, Row, Col, Form, InputGroup, Button } from "react-bootstrap";

const ChatGates = ({ setUserName }) => {
  const [login, setLogin] = useState("");

  return (
    <Container>
      <Row className="justify-content-center align-items-center min-vh-100">
        <Col xs="auto">
          <div className="chat-gates">
            <InputGroup className="mb-3">
              <Form.Control
                value={login}
                onChange={(e) => setLogin(e.target.value)}
                onKeyUp={(e) => e.key === "Enter" && setUserName(login)}
                placeholder="Enter Username"
                size="lg"
              />
              <Button
                size="lg "
                variant="warning"
                className="text-white fw-bold"
                onClick={() => setUserName(login)}
              >
                Enter Chatroom
              </Button>
            </InputGroup>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ChatGates;
