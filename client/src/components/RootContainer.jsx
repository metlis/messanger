import React from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";


const useStyles = makeStyles(theme => ({
  root: {
    minHeight: "100vh",
    "& .MuiInput-underline:before": {
      borderBottom: "1.2px solid rgba(0, 0, 0, 0.2)"
    }
  },
}));

export default function RootContainer(props) {
  const classes = useStyles();
  return (
    <Grid
      container
      component="main"
      className={classes.root}
    >
      {props.children}
    </Grid>
  )
}
