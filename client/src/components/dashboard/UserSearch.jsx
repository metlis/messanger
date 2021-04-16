import React from "react";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import FilledInput from "@material-ui/core/FilledInput";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import { makeStyles } from "@material-ui/core/styles";
import { searchUsers, clearSearch } from "../../store/search";
import { useDispatch } from "react-redux";


const useStyles = makeStyles(theme => ({
  container: {
    width: 'auto',
    marginLeft: 25,
    paddingTop: 20,
    paddingRight: 14,
  },
  header: {
    fontSize: 20,
    color: "#000000",
    fontWeight: 700,
    fontFamily: "Open Sans",
    marginRight: 20
  },
  searchInput: {
    marginTop: 10,
    fontFamily: "Open Sans",
    '& .MuiFilledInput-input': {
      padding: '17px 12px 17px 0px',
      fontFamily: "Open Sans",
    },
    '& .MuiInputBase-input': {
      background: '#e9eef9',
      borderRadius: 4,
      border: 'none',
      color: '#adc0de',
      fontWeight: 600,
    },
    '& .MuiInputAdornment-root': {
      color: '#adc0de'
    },
    '& .MuiFilledInput-root': {
      backgroundColor: '#e9eef9',
      borderBottomLeftRadius: 4,
      borderBottomRightRadius: 4,
    },
    '& .MuiSvgIcon-root': {
      fontSize: '1.1rem'
    },
  },
}));


export default function UserSearch() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const search = searchUsers(dispatch);
  const textInput = React.useRef();

  const processSearchQuery = async (event) => {
    if (event.target.value === '') {
      dispatch(clearSearch());
    } else {
      await search(event.target.value);
    }
  }

  return (
    <Box className={classes.container}>
      <Typography
        className={classes.header}
        component="h1"
        variant="h5"
      >
        Chats
      </Typography>
      <Box className={classes.searchInput}>
        <FilledInput
          id="user-search"
          placeholder="Search"
          inputRef={textInput}
          onKeyUp={processSearchQuery}
          className={classes.searchInput}
          disableUnderline
          autoComplete="off"
          fullWidth
          startAdornment={
            <InputAdornment position="start">
              <SearchIcon/>
            </InputAdornment>
          }
        />
      </Box>
    </Box>
  );
}
