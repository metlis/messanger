import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";


const useStyles = makeStyles(theme => ({
  welcome: {
    fontSize: 26,
    paddingBottom: 20,
    color: "#000000",
    fontWeight: 700,
    fontFamily: "Open Sans"
  },
}));


export default function WelcomeHeader(props) {
  const classes = useStyles();
  return (
    <Typography
      className={classes.welcome}
      component="h1"
      variant="h5"
    >
      {props.text}
    </Typography>
  )
}
