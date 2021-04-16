import { createMuiTheme } from "@material-ui/core";

export const theme = createMuiTheme({
  typography: {
    fontFamily: '"Roboto"',
    fontSize: 12,
    h1: {
      // could customize the h1 variant as well
    }
  },
  palette: {
    secondary: { main: "#1CED84" },
    primary: { main: "#c7c5c5" },
    default: { main: "#3F92FF" },
    error: { main: "#DF1B1B" },
  }
});
