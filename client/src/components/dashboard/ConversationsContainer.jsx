import React from "react";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";


const useStyles = makeStyles(() => ({
  conversationsContainer: {
    overflowY: 'auto',
    height: 'calc(100vh - 228px)',
    marginTop: 32,
    marginLeft: 25,
    paddingRight: 20,
  },
}));


export default function ConversationsContainer (props) {
  const classes = useStyles();
  return (
    <Box className={classes.conversationsContainer}>
      {props.children}
    </Box>
  )
}