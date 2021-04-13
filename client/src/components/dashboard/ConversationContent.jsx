import React from "react";
import Box from "@material-ui/core/Box";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import MessagesContainer from "./MessagesContainer";
import IncomingMessage from "./IncomingMessage";
import OutgoingMessage from "./OutgoingMessage";
import ConversationInput from "./ConversationInput";
import { selectActiveConversation, markMessagesRead, getConversations } from "../../store/conversations";


const useStyles = makeStyles(() => ({
  container: {
    padding: 30
  },
}));


export default function ConversationContent(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const conversation = useSelector(selectActiveConversation);
  const conversationMessages = conversation.messages || [];
  const updateConversations = getConversations(dispatch);
  const bottomAnchor = React.useRef();
  const scrollDown = () => bottomAnchor.current.scrollIntoView();
  const currentUserId = props.user.id;

  const unreadMessages = [];
  conversationMessages.forEach(message => {
    if (message.is_read === false && message.author_id !== currentUserId) {
      unreadMessages.push(message.id);
    }
  });

  React.useEffect(() => {
    scrollDown();
    (async () => {
      if (unreadMessages.length > 0) {
        await markMessagesRead(conversation.id, unreadMessages);
        await updateConversations();
      }
    })();
  });

  const messages = conversationMessages.map(message => {
    const date = new Date(message.created);
    const hours = date.getHours() > 9 ? `${date.getHours()}`: `0${date.getHours()}`;
    const minutes = date.getMinutes() > 9 ? `${date.getMinutes()}`: `0${date.getMinutes()}`;
    if (currentUserId === message.author_id) {
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
