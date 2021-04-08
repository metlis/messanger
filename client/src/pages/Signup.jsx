import React from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Box from "@material-ui/core/Box";
import CssBaseline from "@material-ui/core/CssBaseline";
import Sidebar from "../components/authentication/Sidebar";
import TopButtons from "../components/authentication/TopButtons";
import ErrorSnackbar from "../components/ErrorSnackbar";
import SignUpForm from "../components/authentication/SignUpForm";
import ContentContainer from "../components/authentication/ContentContainer";
import RootContainer from "../components/authentication/RootContainer";
import { update, noUserData } from "../store/user";


function useRegister() {
  const history = useHistory();
  const dispatch = useDispatch();

  return async (username, email, password) => {
    try {
      const res = await axios({
        method: 'post',
        url: '/register',
        data: {username, email, password},
        withCredentials: true,
      });
      dispatch(update(res.data));
      history.push("/dashboard");
    } catch (err) {
      return err.response.data;
    }
    return null;
  };
}


export default function Register() {
  const [open, setOpen] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('Registration error');

  const register = useRegister();

  const handleClose = (event, reason) => {
    if (reason === "clickaway") return;
    setOpen(false);
  };

  const history = useHistory();

  const noData = useSelector(noUserData);

  React.useEffect(() => {
    if (!noData) history.push("/dashboard");
  });

  return (
    <RootContainer>
      <CssBaseline />
      <Sidebar />
      <ContentContainer>
        <TopButtons page="signup" />
        <SignUpForm
          register={register}
          setErrorMessage={setErrorMessage}
          setOpen={setOpen}
        />
        <Box p={1} alignSelf="center" />
      </ContentContainer>
      <ErrorSnackbar
        open={open}
        handleClose={handleClose}
        message={errorMessage}
      />
    </RootContainer>
  );
}
