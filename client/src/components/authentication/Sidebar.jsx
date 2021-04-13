import React from "react";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";


const useStyles = makeStyles(() => ({
  heroText: {
    fontSize: 26,
    fontFamily: "Open Sans",
    textAlign: "center",
    color: "white",
    marginTop: 30,
    maxWidth: 300
  },
  overlay: {
    backgroundImage:
      "linear-gradient(180deg, rgb(66, 135, 245, 0.85) 0%, rgb(134, 185, 255, 0.85) 100%)",
    backgroundSize: "cover",
    backgroundPosition: "center",
    flexDirection: "column",
    minHeight: "100vh",
    paddingBottom: 145,
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  image: {
    backgroundImage: "url(./images/bg-img.png)",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center"
  },
}));


export default function Sidebar() {
  const classes = useStyles();
  return (
    <Grid
      item
      xs={false}
      sm={4}
      md={5}
    >
      <Box className={classes.image}>
        <Box className={classes.overlay}>
          <Hidden xsDown>
            <img
              width={67}
              src="/images/bubble.svg"
              alt="Chat bubble"
            />
            <Hidden smDown>
              <Typography className={classes.heroText}>
                Converse with anyone with any language
              </Typography>
            </Hidden>
          </Hidden>
        </Box>
      </Box>
    </Grid>
  )
}
