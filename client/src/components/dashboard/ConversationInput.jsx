import React from "react";
import Box from "@material-ui/core/Box";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import FileCopyOutlinedIcon from "@material-ui/icons/FileCopyOutlined";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { createMessage, selectActiveConversation, getConversation } from "../../store/conversations";


const useStyles = makeStyles(() => ({
  container: {
    minHeight: 100
  },
  messageInput: {
    width: '100%',
    marginTop: 30,
    '& .MuiFilledInput-root': {
      backgroundColor: '#e9eef9',
    },
    '& .MuiFilledInput-underline:before': {
      borderBottom: 0
    },
    '& .MuiFilledInput-multiline': {
      padding: '24px 24px 12px 24px',
      fontFamily: "Open Sans",
      color: '#adc0de',
      fontWeight: 600,
      border: 'none',
      borderRadius: 5,
    },
    '& .MuiFilledInput-underline:after': {
      borderBottom: 'none'
    }
  },
  inputAdornment: {
    '& .MuiInputAdornment-root': {
      marginTop: -10
    },
    '& .MuiSvgIcon-root': {
      marginTop: -10,
      cursor: 'pointer'
    },
    '& .MuiSvgIcon-root:first-of-type': {
      marginRight: 15
    }
  }
}));


export default function ConversationInput(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const conversation = useSelector(selectActiveConversation);
  const createNewMessage = createMessage();
  const updateConversation = getConversation(dispatch);
  const textInput = React.useRef();

  const addMessage = async (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      await createNewMessage(conversation.id, event.target.value);
      await updateConversation(conversation.id, conversation.username);
      textInput.current.value = "";
      props.scrollDown();
    }
  }

  return (
    <Box className={classes.container}>
      <TextField
        id="message-input"
        placeholder="Type something..."
        variant="filled"
        className={classes.messageInput}
        rows={2}
        onKeyDown={addMessage}
        inputRef={textInput}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end" className={classes.inputAdornment}>
              <InsertEmoticonIcon />
              <FileCopyOutlinedIcon />
            </InputAdornment>
          ),
        }}
        multiline
      />
    </Box>
  )
}
