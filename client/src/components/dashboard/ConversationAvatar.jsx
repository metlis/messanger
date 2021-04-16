import React from "react";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/core/styles";


const useStyles = makeStyles(theme => ({
  avatar: {
    width: 32,
    height: 32,
    marginTop: 5
  },
}));


export default function ConversationAvatar(props) {
  const classes = useStyles();
  return (
    <Avatar
      className={classes.avatar}
      src={props.src}
      alt={props.username}
    />
  )
};
