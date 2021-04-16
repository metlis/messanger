import React from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Box from "@material-ui/core/Box";
import CssBaseline from "@material-ui/core/CssBaseline";
import Sidebar from "../components/authentication/Sidebar";
import TopButtons from "../components/authentication/TopButtons";
import ErrorSnackbar from "../components/ErrorSnackbar";
import LoginForm from "../components/authentication/LoginForm";
import RootContainer from "../components/RootContainer";
import ContentContainer from "../components/authentication/ContentContainer";
import { noUserData, loginUser } from "../store/user";
import { closeSnackbar } from "../utils";


export default function Login() {
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const history = useHistory();
  const dispatch = useDispatch();
  const noUser = useSelector(noUserData);
  const login = loginUser(history, dispatch, {success: "/dashboard"});
  const handleSnackbarClose = closeSnackbar(setOpenSnackbar);

  React.useEffect(() => {
    if (!noUser) history.push("/dashboard");
  });

  return (
    <RootContainer>
      <CssBaseline />
      <Sidebar />
      <ContentContainer>
        <TopButtons page="login" />
        <LoginForm login={login} setOpen={setOpenSnackbar} />
        <Box p={1} alignSelf="center" />
      </ContentContainer>
      <ErrorSnackbar
        open={openSnackbar}
        handleClose={handleSnackbarClose}
        message="Login failed"
      />
    </RootContainer>
  );
}
