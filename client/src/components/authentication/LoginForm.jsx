import React from "react";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { Formik } from "formik";
import * as Yup from "yup";
import ActionButton from "./ActionButton";
import WelcomeHeader from "./WelcomeHeader";


const useStyles = makeStyles(theme => ({
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: 8,
  },
  label: {
    fontSize: 19,
    color: "rgb(0,0,0,0.4)",
    paddingLeft: 5,
  },
  inputs: {
    marginTop: ".8rem",
    height: "2rem",
    padding: 5,
  },
  forgot: {
    paddingRight: 10,
    color: "#3a8dff"
  },
}));


export default function LoginForm(props) {
  const classes = useStyles();
  const login = props.login;
  const setOpen = props.setOpen;
  return (
    <Box
      width="100%"
      maxWidth={450}
      p={3}
      alignSelf="center"
    >
      <Grid container>
        <Grid item xs>
          <WelcomeHeader text="Welcome back!" />
        </Grid>
      </Grid>
      <Formik
        initialValues={{
          email: "",
          password: ""
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string()
            .required("Email is required")
            .email("Email is not valid"),
          password: Yup.string()
            .required("Password is required")
            .max(100, "Password is too long")
            .min(6, "Password too short")
        })}
        onSubmit={async ({ email, password }, { setStatus, setSubmitting }) => {
          setStatus();
          const login_error = await login(email, password);
          if (login_error) {
            setOpen(true);
            setSubmitting(false);
            setStatus(login_error);
          }
        }}
      >
        {({ handleSubmit, handleChange, values, touched, errors }) => (
          <form
            onSubmit={handleSubmit}
            className={classes.form}
            noValidate
          >
            <TextField
              id="email"
              label={
                <Typography className={classes.label}>
                  E-mail address
                </Typography>
              }
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true
              }}
              InputProps={{ classes: { input: classes.inputs } }}
              name="email"
              autoComplete="email"
              autoFocus
              helperText={touched.email ? errors.email : ""}
              error={touched.email && Boolean(errors.email)}
              value={values.email}
              onChange={handleChange}
            />
            <TextField
              id="password"
              label={
                <Typography className={classes.label}>
                  Password
                </Typography>
              }
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true
              }}
              InputProps={{
                classes: { input: classes.inputs },
                endAdornment: (
                  <Typography className={classes.forgot}>
                    Forgot?
                  </Typography>
                )
              }}
              type="password"
              autoComplete="current-password"
              helperText={touched.password ? errors.password : ""}
              error={touched.password && Boolean(errors.password)}
              value={values.password}
              onChange={handleChange}
            />

            <ActionButton text="Login" />
          </form>
        )}
      </Formik>
    </Box>
  )
}