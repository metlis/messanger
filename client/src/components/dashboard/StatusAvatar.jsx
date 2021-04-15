import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Badge from "@material-ui/core/Badge";
import { makeStyles } from "@material-ui/core/styles";


const useStyles = makeStyles(theme => ({
  avatar: {
    width: 40,
    height: 40,
  },
  badge: {
    '& .MuiBadge-anchorOriginBottomRightRectangle': {
      right: 6,
      bottom: 9
    },
    '& .MuiBadge-dot': {
      height: 14,
      minWidth: 14,
      borderRadius: 7,
      border: '2px solid white'
    }
  },
}));


export default function StatusAvatar(props) {
  const classes = useStyles();
  return (
    <Badge
      className={classes.badge}
      color={props.active ? 'secondary' : 'primary'}
      variant="dot"
      anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}>
      <Avatar
        className={classes.avatar}
        src={props.src}
        alt={props.username}
      />
    </Badge>
  )
}
