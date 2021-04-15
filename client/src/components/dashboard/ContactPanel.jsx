import React from "react";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Chip from "@material-ui/core/Chip";
import StatusAvatar from "./StatusAvatar";
import { makeStyles } from "@material-ui/core/styles";
import {
  markMessagesRead,
  setConversation,
  getConversations,
  getNewConversationId
} from "../../store/conversations";
import { useDispatch } from "react-redux";


const useStyles = makeStyles(theme => ({
  contactContainer: {
    cursor: 'pointer',
    maxWidth: "100%",
    marginTop: 28,
    '&:first-child': {
      marginTop: 0,
    }
  },
  contactAvatarContainer: {
    display: "flex",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "flex-start",
    marginLeft: 10,
    maxWidth: "calc(100% - 20px)",
    '& p': {
      margin: '5px 0px 0px'
    }
  },
  username: {
    display: 'inline-block',
    fontFamily: "Open Sans",
    marginLeft: 10,
    fontWeight: 700,
    textOverflow: "ellipsis",
    overflow: "hidden",
    maxWidth: "100%",
    whiteSpace: "nowrap",
    position: 'relative',
    fontSize: 15
  },
  lastMessage: {
    position: 'relative',
    display: 'inline-block',
    top: -6,
    left: 10,
    fontWeight: 400,
    fontSize: 12,
    textOverflow: "ellipsis",
    overflow: "hidden",
    maxWidth: 180,
    whiteSpace: "nowrap",
  },
  lastMessageRead: {
    color: '#adc0de',
  },
  unreadMessages: {
    backgroundColor: '#3f92ff',
    color: 'white',
    float: 'right'
  },
}));


export default function ContactPanel(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const setActiveConversation = setConversation(dispatch);
  const getConversationsList = getConversations(dispatch);

  const handleConversationChoice = async () => {
    let conversationId = props.conversationId;
    if (!conversationId) {
      conversationId = await dispatch(getNewConversationId(props.interlocutorId));
    }

    await setActiveConversation(conversationId, props.interlocutorUsername);

    if (props.unreadMessages > 0) {
      await markMessagesRead(conversationId);
      await getConversationsList();
    }

    props.setOpenDrawer(false);
  }

  return (
    <Grid
      container
      alignItems="center"
      alignContent="center"
      justify="space-between"
      className={classes.contactContainer}
      onClick={handleConversationChoice}
    >
      <Box className={classes.contactAvatarContainer}>
      <StatusAvatar username={props.interlocutorUsername} />
        <Typography>
          <span className={classes.username}>
            {props.interlocutorUsername}
          </span><br />
          <span className={`${classes.lastMessage} ${!Boolean(props.unreadMessages) ? classes.lastMessageRead: ''}`}>
            {props.lastMessage}
          </span>
        </Typography>
      </Box>
      {Boolean(props.unreadMessages) &&
        <Chip
          className={classes.unreadMessages}
          label={props.unreadMessages}
          size="small"
          color="default"
        />
      }
    </Grid>
  )
}
