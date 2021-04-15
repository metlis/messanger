import React from "react";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import {makeStyles} from "@material-ui/core/styles";


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
    float: 'right'
  },
  messageText: {
    padding: '10px 15px',
    borderRadius: '10px 10px 0 10px',
    backgroundColor: "#f4f6fa",
    color: '#adc0de',
    display: 'inline-block'
  },
}));


export default function OutgoingMessage(props) {
  const classes = useStyles();
  return (
    <Grid
      container
      justify="flex-end"
      className={classes.container}
    >
      <Box className={classes.messageBody}>
        <span className={classes.messageMeta}>
          {props.time}
        </span>
        <br />
        <Box className={classes.messageText}>
          {props.message}
        </Box>
      </Box>
    </Grid>
  )
}
