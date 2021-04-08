import React from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Box from "@material-ui/core/Box";
import CssBaseline from "@material-ui/core/CssBaseline";
import Sidebar from "../components/authentication/Sidebar";
import TopButtons from "../components/authentication/TopButtons";
import ErrorSnackbar from "../components/ErrorSnackbar";
import LoginForm from "../components/authentication/LoginForm";
import RootContainer from "../components/authentication/RootContainer";
import ContentContainer from "../components/authentication/ContentContainer";
import { noUserData, loginUser } from "../store/user";
import { closeSnackbar } from "../utils";


export default function Login() {
  const [open, setOpen] = React.useState(false);
  const history = useHistory();
  const dispatch = useDispatch();
  const noData = useSelector(noUserData);
  const login = loginUser(history, dispatch);
  const handleClose = closeSnackbar(setOpen);

  React.useEffect(() => {
    if (!noData) history.push("/dashboard");
  });

  return (
    <RootContainer>
      <CssBaseline />
      <Sidebar />
      <ContentContainer>
        <TopButtons page="login" />
        <LoginForm login={login} setOpen={setOpen} />
        <Box p={1} alignSelf="center" />
      </ContentContainer>
      <ErrorSnackbar
        open={open}
        handleClose={handleClose}
        message="Login failed"
      />
    </RootContainer>
  );
}
