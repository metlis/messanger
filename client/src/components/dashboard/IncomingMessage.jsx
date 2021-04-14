import React from "react";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import ConversationAvatar from "./ConversationAvatar";
import { makeStyles } from "@material-ui/core/styles";


const useStyles = makeStyles(() => ({
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
  messageText: {
    padding: '10px 15px',
    borderRadius: '0 10px 10px 10px',
    backgroundImage: "linear-gradient(to right, #3b8eff, #75c5ff)",
    color: 'white',
    display: 'inline-block'
  },
}));


export default function IncomingMessage(props) {
  const classes = useStyles();
  return (
    <Grid container className={classes.container}>
      <ConversationAvatar username={props.name} />
      <Box className={classes.messageBody}>
        <span className={classes.messageMeta}>
          {props.name} {props.time}
        </span>
        <br />
        <Box className={classes.messageText}>
          {props.message}
        </Box>
      </Box>
    </Grid>
  )
}
