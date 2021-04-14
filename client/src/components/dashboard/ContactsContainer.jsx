import React from "react";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";


const useStyles = makeStyles(() => ({
  contactsContainer: {
    overflowY: 'auto',
    height: 'calc(100vh - 248px)',
    marginTop: 32,
    marginLeft: 25,
    paddingRight: 20,
    paddingBottom: 20,
  },
}));


export default function ContactsContainer (props) {
  const classes = useStyles();
  return (
    <Box className={classes.contactsContainer}>
      {props.children}
    </Box>
  )
}
