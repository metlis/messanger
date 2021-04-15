import React from "react";
import Box from "@material-ui/core/Box";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import MessagesContainer from "./MessagesContainer";
import IncomingMessage from "./IncomingMessage";
import OutgoingMessage from "./OutgoingMessage";
import ConversationInput from "./ConversationInput";
import { selectActiveConversation } from "../../store/conversations";
import {selectUser} from "../../store/user";


const useStyles = makeStyles(theme => ({
  container: {
    padding: 30
  },
}));


export default function ConversationContent() {
  const classes = useStyles();
  const currentUser = useSelector(selectUser);
  const conversation = useSelector(selectActiveConversation);
  const conversationMessages = conversation.messages || [];
  const bottomAnchor = React.useRef();
  const scrollDown = () => bottomAnchor.current.scrollIntoView();

  React.useEffect(() => {
    scrollDown();
  });

  const messages = conversationMessages.map(message => {
    const date = new Date(message.created);
    const hours = date.getHours() > 9 ? `${date.getHours()}`: `0${date.getHours()}`;
    const minutes = date.getMinutes() > 9 ? `${date.getMinutes()}`: `0${date.getMinutes()}`;
    if (currentUser.id === message.author_id) {
      return (
        <OutgoingMessage
          key={message.id}
          message={message.text}
          time={`${hours}:${minutes}`}
        />
      )
    } else {
      return (
        <IncomingMessage
          key={message.id}
          message={message.text}
          name={message.author_username}
          time={`${hours}:${minutes}`}
        />
      )
    }
  });

  return (
    <Box className={classes.container}>
      <MessagesContainer>
        {messages}
        <span ref={bottomAnchor} />
      </MessagesContainer>
      <ConversationInput scrollDown={scrollDown} />
    </Box>
  )
}
