import React from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";


const useStyles = makeStyles(theme => ({
  contentContainer: {
    bgcolor: "background.paper",
    minHeight: "100vh",
    paddingTop: 23
  },
}));


export default function ContentContainer(props) {
  const classes = useStyles();
  return (
    <Grid
      item
      xs={12}
      sm={8}
      md={7}
      elevation={6}
      component={Paper}
      square
    >
      <Grid
        container
        justify="space-between"
        direction="column"
        className={classes.contentContainer}
      >
        {props.children}
      </Grid>
    </Grid>
  )
}