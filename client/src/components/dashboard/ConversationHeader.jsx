import React from "react";
import {useSelector} from "react-redux";
import Badge from "@material-ui/core/Badge";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { selectActiveConversation } from "../../store/conversations";


const useStyles = makeStyles(theme => ({
  conversationHeader: {
    height: 80,
    borderRadius: 5,
    filter: "drop-shadow(0px 2px 6px rgba(74,106,149,0.2))",
    backgroundColor: "#ffffff",
    boxShadow: "none",
    paddingLeft: 20,
    paddingRight: 30,
  },
  conversationUserContainer: {
    display: "flex",
    alignSelf: "center",
    alignItems: "center",
  },
  userHeader: {
    fontSize: 20,
    color: "#000000",
    fontWeight: 700,
    fontFamily: "Open Sans",
    marginRight: 20
  },
  interlocutorStatusBadge: {
    '& .MuiBadge-anchorOriginBottomLeftRectangle': {
      bottom: 10,
      height: 7,
      minWidth: 7,
      borderRadius: 4,
    },
    '& p': {
      paddingLeft: 10,
      paddingTop: 3,
      fontSize: 12,
      color: '#adc0de'
    }
  },
  moreIcon: {
    opacity: 0.3,
    cursor: 'pointer'
  },
}));


export default function ConversationHeader(props) {
  const classes = useStyles();
  const conversation = useSelector(selectActiveConversation);

  return (
    <Grid
      container
      alignItems="center"
      justify="space-between"
      className={classes.conversationHeader}
    >
      <Box className={classes.conversationUserContainer}>
        <Hidden smUp>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={props.toggleDrawer(true)}
            onKeyDown={props.toggleDrawer(true)}
            edge="start"
          >
            <MenuIcon />
          </IconButton>
        </Hidden>
        {conversation.username &&
          <React.Fragment>
            <Typography
              className={classes.userHeader}
              component="h1"
              variant="h5"
            >
              {conversation.username}
            </Typography>
            <Badge
              className={classes.interlocutorStatusBadge}
              anchorOrigin={{vertical: "bottom", horizontal: "left"}}
              color={props.isOnline ? "secondary" : "primary"}
              variant="dot"
            >
              <p>
                {props.isOnline ? "Online" : "Offline"}
              </p>
            </Badge>
          </React.Fragment>
        }
      </Box>
      <MoreHorizIcon className={classes.moreIcon} />
    </Grid>
  )
}
