import React from "react";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
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
    marginLeft: 21,
    [theme.breakpoints.down('sm')]: {
      width: 150,
      fontSize: 12,
    },
  },
  noAccBtn: {
    fontSize: 12,
    color: "#b0b0b0",
    fontWeight: 400,
    textAlign: "center",
    whiteSpace: "nowrap",
    margin: 'auto',
    textTransform: 'uppercase'
  },
  link: {
    textDecoration: "none",
    display: "flex",
    flexWrap: "nowrap"
  },
  container: {
    alignSelf: "flex-end",
    alignItems: "center",
    marginRight: 30,
    [theme.breakpoints.down('sm')]: {
      alignSelf: "center",
      marginRight: 0,
    },
  }
}));


export default function TopButtons(props) {
  const classes = useStyles();
  const isLogin = props.page === 'login';
  return (
    <Box p={1} className={classes.container}>
      <Link to={isLogin ? '/signup' : '/login'} className={classes.link}>
        <Typography className={classes.noAccBtn}>
          {isLogin ? 'Don\'t have an account?' : 'Already have an account?'}
        </Typography>
        <Button
          color="default"
          className={classes.accBtn}
          variant="contained"
        >
          {isLogin ? 'Create account' : 'Login'}
        </Button>
      </Link>
    </Box>
  )
}
