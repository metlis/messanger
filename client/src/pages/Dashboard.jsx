import React from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from '../constants.js'


function useLogout() {
  return async () => {
    await axios({
      method: 'post',
      url: `${BACKEND_URL}/logout`,
      withCredentials: true,
    })
      .then(response => response)
      .catch(error => console.log(error));
  };
}

export default function Dashboard() {
  const history = useHistory();

  const logout = useLogout();

  React.useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) history.push("/signup");
  }, []);

  return (
    <>
      {/* For testing purposes right now, ignore styling */}
      <p>Dashboard</p>
      <p>User: {JSON.stringify(localStorage.getItem("user"))}</p>
      <button
        onClick={() => {
          logout().then(() => {
            localStorage.removeItem("user");
            history.push("/login");
          })
        }}
      >
        Logout
      </button>
    </>
  );
}
