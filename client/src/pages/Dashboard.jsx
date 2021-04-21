import React from "react";
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";
import Drawer from '@material-ui/core/Drawer';
import ErrorSnackbar from "../components/ErrorSnackbar";
import RootContainer from "../components/RootContainer";
import Sidebar from "../components/dashboard/Sidebar";
import ConversationHeader from "../components/dashboard/ConversationHeader";
import ConversationContent from "../components/dashboard/ConversationContent";
import MessagePlaceholder from "../components/dashboard/MessagePlaceholder";
import { noUserData, getUserData, selectUser } from "../store/user";
import { getConversations, selectActiveConversation } from '../store/conversations';
import { closeSnackbar } from "../utils";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';


export default function Dashboard() {
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [openDrawer, setOpenDrawer] = React.useState(false);
  const history = useHistory();
  const dispatch = useDispatch();
  const noUser = useSelector(noUserData);
  const currentUser = useSelector(selectUser);
  const handleClose = closeSnackbar(setOpenSnackbar);
  const getUser = getUserData(history, dispatch, {error: "/login"});
  const fetchConversations = getConversations(dispatch);
  const activeConversation = useSelector(selectActiveConversation);

  React.useEffect(() => {
    (async () => {
      if (noUser) {
        await getUser();
        await fetchConversations();
      }
    })();
  });

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setOpenDrawer(open);
  };

  const interlocutor = (activeConversation.users || []).find(i => i.id !== currentUser.id) || {};

  return (
    <RootContainer>
      <Hidden xsDown>
        <Sidebar setOpenDrawer={setOpenDrawer}/>
      </Hidden>
      <Grid
        item
        xs={12}
        sm={12}
        md={9}
      >
        <ConversationHeader active={interlocutor.active} toggleDrawer={toggleDrawer} />
        {Boolean(activeConversation.id) &&
          <ConversationContent />
        }
        {!Boolean(activeConversation.id) &&
          <MessagePlaceholder />
        }
      </Grid>
      <ErrorSnackbar
        open={openSnackbar}
        handleClose={handleClose}
        message="Logout failed"
      />
      <Drawer
        anchor="left"
        open={openDrawer}
        onClose={toggleDrawer(false)}
      >
        <Sidebar setOpenDrawer={setOpenDrawer} />
      </Drawer>
    </RootContainer>
  );
}
