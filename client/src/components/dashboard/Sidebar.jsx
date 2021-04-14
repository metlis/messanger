import React from "react";
import Grid from "@material-ui/core/Grid";
import UserPanel from "./UserPanel";
import UserSearch from "./UserSearch";
import ConversationsContainer from "./ConversationsContainer";
import ConversationPanel from "./ConversationPanel";
import { useSelector } from "react-redux";
import { selectConversations } from "../../store/conversations";
import { selectQuery, selectSearchResults } from "../../store/search";
import {selectUser} from "../../store/user";


export default function Sidebar(props) {
  const searchQuery = useSelector(selectQuery);
  const foundUsers = useSelector(selectSearchResults);
  const conversations = useSelector(selectConversations);
  const currentUser = useSelector(selectUser);

  let panels = [];
  if (searchQuery) {
    panels = foundUsers.map(user => {
      let conversationId = null;
      const conversation = conversations.find(conv => conv.users.some(convUser => convUser.id === user.id));
      if (conversation) conversationId = conversation.id;
      return (
        <ConversationPanel
          key={user.id}
          conversationId={conversationId}
          interlocutorId={user.id}
          interlocutorUsername={user.username}
          setOpenDrawer={props.setOpenDrawer}
        />
      )
    });
  } else {
    panels = conversations.map(conv => {
      const interlocutor = (conv.users || []).find(user => user.id !== currentUser.id);
      return (
        <ConversationPanel
          key={conv.id}
          conversationId={conv.id}
          interlocutorId={interlocutor.id}
          interlocutorUsername={interlocutor.username}
          lastMessage={(conv.last_message || {}).text}
          unreadMessages={conv.unread_messages}
          setOpenDrawer={props.setOpenDrawer}
        />
      )
    });
  }

  return (
    <Grid
      item
      xs={false}
      sm={false}
      md={3}
    >
      <UserPanel username={currentUser.username} />
      <UserSearch />
      <ConversationsContainer>
        {panels}
      </ConversationsContainer>
    </Grid>
  )
}
