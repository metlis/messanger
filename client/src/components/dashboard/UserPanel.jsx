import React from "react";
import Box from "@material-ui/core/Box";
import Button from '@material-ui/core/Button';
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import StatusAvatar from "./StatusAvatar";
import {makeStyles} from "@material-ui/core/styles";
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { logoutUser } from "../../store/user";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";


const useStyles = makeStyles(() => ({
  userPanel: {
    display: "flex",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "space-between",
    width: 'auto',
    height: 80,
    '& .MuiButton-root:hover': {
      backgroundColor: 'white'
    },
  },
  avatarContainer: {
    display: "flex",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "flex-start",
    marginLeft: 25,
    maxWidth: 'calc(100% - 85px)',
    "& p": {
      fontFamily: "Open Sans",
      marginLeft: 10,
      fontWeight: 700,
      textOverflow: "ellipsis",
      overflow: "hidden",
      maxWidth: "100%",
      whiteSpace: "nowrap",
    }
  },
  icon: {
    opacity: 0.3,
    cursor: 'pointer'
  },
  button: {
    paddingRight: 14,
  },
}));


export default function UserPanel(props) {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const logout = logoutUser(history, dispatch, {success: "/login"});
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box className={classes.userPanel}>
      <Box className={classes.avatarContainer}>
        <StatusAvatar username={props.username} />
        <p>{props.username}</p>
      </Box>
      <Button
        className={classes.button}
        aria-controls="user-menu"
        aria-haspopup="true"
        onClick={handleClick}
        size="small"
      >
        <MoreHorizIcon className={classes.icon} />
      </Button>
      <Menu
        id="user-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        keepMounted
      >
        <MenuItem onClick={logout}>
          Logout
        </MenuItem>
      </Menu>
    </Box>
  )
};
