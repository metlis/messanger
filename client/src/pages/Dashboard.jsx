import React from "react";
import axios from "axios";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { clear, noUserData, selectUser } from "../store/user";


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
  const history = useHistory();
  const noData = useSelector(noUserData);
  const [open, setOpen] = React.useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") return;
    setOpen(false);
  };

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
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center"
        }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message="Logout failed"
        action={
          <React.Fragment>
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={handleClose}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      />
    </>
  );
}
