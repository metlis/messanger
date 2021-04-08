import React from "react";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import ActionButton from "./ActionButton";
import WelcomeHeader from "./WelcomeHeader";
import { Formik } from "formik";
import * as Yup from "yup";
import { generateErrorStr } from "../../utils";


const useStyles = makeStyles(theme => ({
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  label: { fontSize: 19, color: "rgb(0,0,0,0.4)", paddingLeft: "5px" },
  inputs: {
    marginTop: ".8rem",
    height: "2rem",
    padding: "5px"
  },
}));


export default function SignUpForm(props) {
  const classes = useStyles();
  const setErrorMessage = props.setErrorMessage;
  const register = props.register;
  const setOpen = props.setOpen;

  return (
    <Box width="100%" maxWidth={450} p={3} alignSelf="center">
      <Grid container>
        <Grid item xs>
          <WelcomeHeader text="Create an account" />
        </Grid>
      </Grid>
      <Formik
        initialValues={{
          username: "",
          email: "",
          password: ""
        }}
        validationSchema={Yup.object().shape({
          username: Yup.string()
            .required("Username is required")
            .max(40, "Username is too long"),
          email: Yup.string()
            .required("Email is required")
            .email("Email is not valid"),
          password: Yup.string()
            .required("Password is required")
            .max(100, "Password is too long")
            .min(6, "Password too short")
        })}
        onSubmit={async (
          { username, email, password },
          { setStatus, setSubmitting }
        ) => {
          setStatus();
          const registration_error = await register(username, email, password);
          if (registration_error) {
            setErrorMessage(generateErrorStr(registration_error));
            setOpen(true);
            setSubmitting(false);
            setStatus(registration_error);
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
              id="username"
              label={
                <Typography className={classes.label}>
                  Username
                </Typography>
              }
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true
              }}
              InputProps={{ classes: { input: classes.inputs } }}
              name="username"
              autoComplete="username"
              autoFocus
              helperText={touched.username ? errors.username : ""}
              error={touched.username && Boolean(errors.username)}
              value={values.username}
              onChange={handleChange}
            />
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
                classes: { input: classes.inputs }
              }}
              type="password"
              autoComplete="current-password"
              helperText={touched.password ? errors.password : ""}
              error={touched.password && Boolean(errors.password)}
              value={values.password}
              onChange={handleChange}
            />

            <ActionButton text="Create" />
          </form>
        )}
      </Formik>
    </Box>
  )
}