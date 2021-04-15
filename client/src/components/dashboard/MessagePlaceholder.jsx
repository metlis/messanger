import React from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";


const useStyles = makeStyles(theme => ({
  container: {
    height: 'calc(100vh - 228px)',
  },
}));


export default function MessagePlaceholder() {
  const classes = useStyles();
  return (
    <Grid
      container
      alignContent="center"
      justify="center"
      className={classes.container}
    >
      Choose a conversation
    </Grid>
  )
}
