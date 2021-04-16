import React from "react";
import Box from "@material-ui/core/Box";
import {makeStyles} from "@material-ui/core/styles";


const useStyles = makeStyles(theme => ({
  container: {
    height: 'calc(100vh - 240px)',
    overflowY: 'auto',
  },
}));


export default function MessagesContainer(props) {
  const classes = useStyles();
  return (
    <Box className={classes.container}>
      {props.children}
    </Box>
  )
}
