import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Badge from "@material-ui/core/Badge";
import { makeStyles } from "@material-ui/core/styles";


const useStyles = makeStyles(() => ({
  avatar: {
    width: 40,
    height: 40,
  },
  badge: {
    '& .MuiBadge-anchorOriginBottomRightRectangle': {
      right: 10,
      bottom: 5
    },
    '& .MuiBadge-dot': {
      height: 12,
      minWidth: 12,
      borderRadius: 6,
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
