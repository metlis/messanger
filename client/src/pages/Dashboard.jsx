import React from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import ErrorSnackbar from "../components/ErrorSnackbar";
import { noUserData, selectUser, logoutUser, getUserData } from "../store/user";
import { closeSnackbar } from "../utils";


export default function Dashboard() {
  const [open, setOpen] = React.useState(false);
  const history = useHistory();
  const dispatch = useDispatch();
  const noUser = useSelector(noUserData);
  const handleClose = closeSnackbar(setOpen);
  const logout = logoutUser(history, dispatch, {success: "/login"});
  const getUser = getUserData(history, dispatch, {error: "/login"});

  React.useEffect(() => {
    (async () => {
      if (noUser) await getUser();
    })();
  });

  return (
    <>
      {/* For testing purposes right now, ignore styling */}
      <p>Dashboard</p>
      <p>User: {JSON.stringify(useSelector(selectUser))}</p>
      <button
        onClick={
          async () => {
            const logout_error = await logout();
            if (logout_error) setOpen(true);
        }}
      >
        Logout
      </button>
      <ErrorSnackbar
        open={open}
        handleClose={handleClose}
        message="Logout failed"
      />
    </>
  );
}
