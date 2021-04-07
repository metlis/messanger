import React from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import { useHistory } from "react-router-dom";
import axios from "axios";
import {useDispatch, useSelector} from 'react-redux';
import { clear, noUserData, selectUser } from "../store/user";


function useLogout() {
  return async () => {
    await axios({
      method: 'post',
      url: '/logout',
      withCredentials: true,
    })
  };
}

export default function Dashboard() {
  const history = useHistory();

  const dispatch = useDispatch();

  const noData = useSelector(noUserData);

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
        onClick={() => {
          logout().then(() => {
            dispatch(clear());
            history.push("/login");
          })
        }}
      >
        Logout
      </button>
    </>
  );
}
