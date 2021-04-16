import React from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Box from "@material-ui/core/Box";
import CssBaseline from "@material-ui/core/CssBaseline";
import Sidebar from "../components/authentication/Sidebar";
import TopButtons from "../components/authentication/TopButtons";
import ErrorSnackbar from "../components/ErrorSnackbar";
import SignUpForm from "../components/authentication/SignUpForm";
import ContentContainer from "../components/authentication/ContentContainer";
import RootContainer from "../components/RootContainer";
import { noUserData, registerUser } from "../store/user";
import { closeSnackbar } from "../utils";


export default function Register() {
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('Registration error');
  const history = useHistory();
  const dispatch = useDispatch();
  const noUser = useSelector(noUserData);
  const register = registerUser(history, dispatch,{success: "/dashboard"});
  const handleClose = closeSnackbar(setOpenSnackbar);

  React.useEffect(() => {
    if (!noUser) history.push("/dashboard");
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
          setOpen={setOpenSnackbar}
        />
        <Box p={1} alignSelf="center" />
      </ContentContainer>
      <ErrorSnackbar
        open={openSnackbar}
        handleClose={handleClose}
        message={errorMessage}
      />
    </RootContainer>
  );
}
