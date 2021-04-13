import React from "react";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";


const useStyles = makeStyles(() => ({
  submit: {
    margin: '24px 16px 16px',
    padding: 10,
    width: 160,
    height: 56,
    borderRadius: 3,
    marginTop: 49,
    fontSize: 16,
    backgroundColor: "#3a8dff",
    fontWeight: "bold"
  },
}));


export default function ActionButton(props) {
  const classes = useStyles();
  return (
    <Box textAlign="center">
      <Button
        type="submit"
        size="large"
        variant="contained"
        color="primary"
        className={classes.submit}
      >
        {props.text}
      </Button>
    </Box>
  )
}