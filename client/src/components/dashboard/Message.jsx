import React from "react";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import {makeStyles} from "@material-ui/core/styles";
import ConversationAvatar from "./ConversationAvatar";


const useStyles = makeStyles(theme => ({
  container: {
    marginTop: 15,
    '&:first-of-type': {
      marginTop: 0
    }
  },
  messageBody: {
    margin: '0 5px 0 15px',
    fontSize: 15,
    maxWidth: '50%'
  },
  messageMeta: {
    color: '#adc0de',
    fontSize: 11,
  },
  outgoingMessageMeta: {
    float: 'right'
  },
  outgoingMessageText: {
    padding: '10px 15px',
    borderRadius: '10px 10px 0 10px',
    backgroundColor: "#f4f6fa",
    color: '#adc0de',
    display: 'inline-block'
  },
  incomingMessageText: {
    padding: '10px 15px',
    borderRadius: '0 10px 10px 10px',
    backgroundImage: "linear-gradient(to right, #3b8eff, #75c5ff)",
    color: 'white',
    display: 'inline-block'
  },
}));


export default function Message(props) {
  const classes = useStyles();
  return (
    <React.Fragment>
      {props.outgoing &&
        <Grid
          container
          justify="flex-end"
          className={classes.container}
        >
          <Box className={classes.messageBody}>
            <span className={`${classes.messageMeta} ${classes.outgoingMessageMeta}`}>
              {props.time}
            </span>
            <br />
            <Box className={classes.outgoingMessageText}>
              {props.message}
            </Box>
          </Box>
        </Grid>
      }
      {!props.outgoing &&
        <Grid container className={classes.container}>
          <ConversationAvatar username={props.name} />
          <Box className={classes.messageBody}>
            <span className={classes.messageMeta}>
              {props.name} {props.time}
            </span>
            <br />
            <Box className={classes.incomingMessageText}>
              {props.message}
            </Box>
          </Box>
        </Grid>
      }
    </React.Fragment>
  )
}
