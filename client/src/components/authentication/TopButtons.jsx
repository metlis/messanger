import React from "react";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Hidden from "@material-ui/core/Hidden";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";


const useStyles = makeStyles(theme => ({
  accBtn: {
    width: 170,
    height: 54,
    borderRadius: 5,
    filter: "drop-shadow(0px 2px 6px rgba(74,106,149,0.2))",
    backgroundColor: "#ffffff",
    color: "#3a8dff",
    boxShadow: "none",
    marginRight: 35,
    [theme.breakpoints.down('sm')]: {
      marginRight: 0,
    }
  },
  noAccBtn: {
    fontSize: 14,
    color: "#b0b0b0",
    fontWeight: 400,
    textAlign: "center",
    marginRight: 21,
    whiteSpace: "nowrap"
  },
  link: { textDecoration: "none", display: "flex", flexWrap: "nowrap" },
  container: {
    alignSelf: "flex-end",
    [theme.breakpoints.down('sm')]: {
      alignSelf: "center",
    },
    alignItems: "center",
  }
}));


export default function TopButtons(props) {
  const classes = useStyles();
  const isLogin = props.page === 'login';
  return (
    <Box p={1} className={classes.container}>
      <Link to={isLogin ? '/signup' : '/login'} className={classes.link}>
        <Hidden xsDown>
          <Button className={classes.noAccBtn}>
            {isLogin ? 'Don\'t have an account?' : 'Already have an account?'}
          </Button>
        </Hidden>
        <Button
          color="background"
          className={classes.accBtn}
          variant="contained"
        >
          {isLogin ? 'Create account' : 'Login'}
        </Button>
      </Link>
    </Box>
  )
}
