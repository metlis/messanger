import React from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import ErrorSnackbar from "../components/ErrorSnackbar";
import { clear, noUserData, selectUser } from "../store/user";
import { closeSnackbar } from "../utils";


function useLogout() {
  const history = useHistory();
  const dispatch = useDispatch();

  return async () => {
    try {
      await axios({
        method: 'post',
        url: '/logout',
        withCredentials: true,
      });
      dispatch(clear());
      history.push("/login");
    } catch (err) {
      return err.response.data;
    }
    return null;
  }
}

export default function Dashboard() {
  const [open, setOpen] = React.useState(false);
  const history = useHistory();
  const noData = useSelector(noUserData);
  const handleClose = closeSnackbar(setOpen);
  const logout = useLogout();

  React.useEffect(() => {
    if (noData) history.push("/login");
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
