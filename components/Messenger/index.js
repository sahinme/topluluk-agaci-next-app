import React, { useState } from 'react';
import ConversationList from '../ConversationList';
import MessageList from '../MessageList';
import { Row, Col, Container } from "react-bootstrap";
import SendIcon from '@material-ui/icons/Send';
import PrimarySearchAppBar from "../Header"
import { connect } from 'react-redux';
import { TextField, IconButton } from '@material-ui/core';
import { sendMessageRequest } from '../../lib/conversation/actions';
import { readLocalStorage } from '../../lib/helpers';

function Messenger(props) {
  const { conversation } = props;
  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    const text = e.target.value
    setMessage(text);
  }

  const onSubmit = () => {
    const data = { ...conversation };
    const receiverId = data.receiver.id == auth.user.id ? data.sender.id : data.receiver.id;
    const payload = { receiverId, conversationId: data.id, content: message };
    props.sendMessage(payload);
    document.getElementById("message_iput").value = "";
  }

  const auth = { user: readLocalStorage('user'), token: readLocalStorage('token') }

  return (
    <div>
      <PrimarySearchAppBar />
      <Container style={{ marginTop: "6rem" }}>

        <Row style={{ marginTop: "1rem", flexWrap: "wrap-reverse" }}>
          <Col
            style={{ paddingBottom: "10px" }}
            xs={12}
            md={8}
          >
            <div className="scrollable content">
              <MessageList
                conversation={conversation}
                user={auth && auth.user}
                messages={conversation && conversation.messages || []}
              />
            </div>
            <div style={{ marginTop: "1rem" }} >
              <TextField
                onChange={handleChange}
                className="chat_input"
                id="message_iput"
                label="yaz bisiler..."
                multiline
                variant="outlined"
              />
              <IconButton onClick={onSubmit} disabled={!message || message == "" || !conversation} className="send_icon" color="inherit">
                <SendIcon style={{ color: !message || message == "" || !conversation ? "gray" : "blue", fontSize: "2.5rem" }} />
              </IconButton>
            </div>
          </Col>
          <Col style={{ paddingBottom: "10px" }} xs={12} md={4}>
            <div
              style={{ position: "-webkit-sticky", position: "sticky", top: 0 }}
            >
              <div className="scrollable sidebar">
                <ConversationList conversation={conversation} />
              </div>

            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  sendMessage: (payload) => dispatch(
    sendMessageRequest(payload)
  )
});

const mapStateToProps = (state) => ({
  conversation: state.selectedConversation.data,
});

export default
  connect(mapStateToProps, mapDispatchToProps)(Messenger);